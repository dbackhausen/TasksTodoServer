var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = require('../models/Note.js');

var notes = {
  getAll: function(req, res) {
    var pUserId = req.query.userId;
    var pTaskId = req.query.taskId;
  
    var query = new mongoose.Query;

    if (pUserId && pUserId !== "" ) {
      query.where('userId', pUserId);
    }

    if (pTaskId && pTaskId !== "" ) {
      query.where('taskId', pTaskId);
    }

    Note.find(query, function (err, entries) {
      if (err) {
        res.status(500);
        res.json({
          "message": err
        });
      } else {
        res.json(entries);
      }
    }).sort({'created': -1});
  },
 
  getOne: function(req, res) {
    Note.findById(req.params.id, function (err, entry) {
      if (err) {
        res.status(500);
        res.json({
          "message": err
        });
      } else {
        res.json(entry);
      }
    });
  },
 
  create: function(req, res) {
    Note.create(req.body, function (err, post) {
      if (err) {
        res.status(500);
        res.json({
          "message": err
        });
      } else {
        res.json(post);
      }
    });
  },
 
  update: function(req, res) {
    if (req.body._id) {
      Note.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
        if (err) {
          res.status(500);
          res.json({
            "message": err
          });
        } else {
          res.json(post);
        }
      });
    } else {
      res.status(400);
    }
  },
 
  delete: function(req, res) {
    Note.findByIdAndRemove(req.params.id, req.body, function (err, post) {
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

module.exports = notes;
