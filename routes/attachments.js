var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Busboy = require('busboy');

var Grid = require('gridfs-stream');
var gridSchema = new mongoose.Schema({},{ strict: false });
var GridFS = mongoose.model("Grid", gridSchema, "fs.files" );

Grid.mongo = mongoose.mongo;
var conn = mongoose.connection;
var gfs = Grid(conn.db);

var Attachment = require('../models/Attachment.js');

var attachments = {
  getAll: function(req, res) {
    var pUserId = req.query.userId;
    var pTaskId = req.query.taskId;
  
    var query = new mongoose.Query;

    if (pUserId && pUserId !== "" ) {
      query.where('metadata.userId', pUserId);
    }

    if (pTaskId && pTaskId !== "" ) {
      query.where('metadata.taskId', pTaskId);
    }

    GridFS.find(query, function (err, entries) {
      if (err) {
        res.status(500);
        res.json({
          "message": err
        });
      } else {
        res.json(entries);
      }
    }).sort({'uploadDate': -1});
  },
  
  getOne: function(req, res) {
    gfs.findOne({ _id: req.params.id }, function (err, file) {
      if (err) return res.status(400).send(err);
      if (!file) return res.status(404).send('');

      res.set('Content-Type', file.contentType);
      res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

      var readstream = gfs.createReadStream({
        _id: file._id
      });

      readstream.on("error", function(err) {
        console.log("Got error while processing stream " + err.message);
        res.end();
      });

      readstream.pipe(res);
    });
  },
 
  create: function(req, res) {
    var taskId = req.params.id;
   
    if (taskId && taskId !== undefined) {
      var fileId = new mongoose.Types.ObjectId();
      var busboy = new Busboy({ headers: req.headers });
      
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var writeStream = gfs.createWriteStream({
          _id: fileId,
          filename: filename,
          mode: 'w',
          content_type: mimetype,
          metadata: {
            taskId: req.params.id,
            encoding: encoding,
          }
        });

        file.pipe(writeStream);
      });

      busboy.on('finish', function() {
        return res.status(200).send({
          message: fileId.toString()
        });
      });

      return req.pipe(busboy);
    } else {
      res.status(403);
      res.json({
        "message": "Unkown task"
      });
    }
  },
  
  link: function(req, res) {
    var taskId = req.params.id;
   
    if (taskId && taskId !== undefined) {
      var request = require('request');
      var reqx = request.get(req.body.url).on('response', function(resx) {
        // extract filename
        var filename = regexp.exec(resx.headers['content-disposition'])[1];

        // create file write stream
        var fileId = new mongoose.Types.ObjectId();
        var writeStream = gfs.createWriteStream({
          _id: fileId,
          filename: filename,
          mode: 'w',
          content_type: resx.headers['content-type'],
          metadata: {
            taskId: req.params.id,
            encoding: resx.headers['encoding']
          }
        });

        // setup piping
        resx.pipe(writeStream);

        resx.on('end', function() {
          // go on with processing
        });
      });
    } else {
      res.status(403);
      res.json({
        "message": "Unkown task"
      });
    }
  },
  
  delete: function(req, res) {
    gfs.remove({_id: req.params.id}, function(err){
      if (err) {
        res.status(500);
        res.json({
          "message": err
        });
      } else {
        res.status(204);
        res.json(true);
      }
    });
  }
};
  
/* GET /attachments/task/:id 
router.get('/task/:id', function(req, res, next) {
  GridFS.find({ 'metadata.taskId': req.params.id }, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({'uploadDate': -1});
});*/

module.exports = attachments;
