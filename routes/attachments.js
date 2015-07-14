var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Busboy = require('busboy');

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var conn = mongoose.connection;
var gfs = Grid(conn.db);

var Attachment = require('../models/Attachment.js');

/* GET /attachments listing. */
// router.get('/', function(req, res, next) {
//   Attachment.find(function (err, attachments) {
//     if (err) return next(err);
//     res.json(attachments);
//   });
// });

/* GET /attachments/:id */
router.get('/:id', function(req, res) {
  console.log("Requesting file with ID: " + req.params.id);

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
});

/* POST /attachments/:id */
router.post('/:id', function(req, res) {
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
    // res.writeHead(200, { 'Connection': 'close' });
    return res.status(200).send({
      message: fileId.toString()
    });
  });

  return req.pipe(busboy);
});

/* POST /attachments/link/:id */
router.post('/link/:id/', function(req, res) {
  console.log(" >> " + req.params.id + " " + req.body.url);

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
});

/* DELETE /attachments/:id */
router.delete('/:id', function(req, res, next) {
  gfs.remove({_id: req.params.id}, function(err){
    if(err) return next(err);
    res.status(200).send({
      message: "Document " + req.params.id + " deleted!"
    });
  });
});

// --

var gridSchema = new mongoose.Schema({},{ strict: false });
var GridFS = mongoose.model("Grid", gridSchema, "fs.files" );
  
/* GET /attachments/task/:id */
router.get('/task/:id', function(req, res, next) {
  GridFS.find({ 'metadata.taskId': req.params.id }, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({'uploadDate': -1});
});

module.exports = router;
