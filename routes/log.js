var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var LogEntry = require('../models/LogEntry.js');

var log = {
  getAll: function(req, res) {
    var query = new mongoose.Query;
  
    // Optional parameters
    var pUserId = req.query.userId;
    var pTaskId = req.query.taskId;
    var pAction = req.query.action;
    var pKey = req.query.key;
    var pValue = req.query.value;

    var pSkip = req.query.skip;
    var pLimit = req.query.limit;
    var pSort = req.query.sort;
    var pDirection = req.query.direction;

    if (pUserId && pUserId !== "" ) {
      query.where('userId', pUserId);
    }

    if (pAction && pAction !== "" && pAction !== undefined) {
      query.where('action', pAction);
    }

    if (pKey && pValue && pKey !== "" && pValue !== "") {
      query.elemMatch('parameters', { key: pKey, value: pValue });
    } 

    if (pTaskId && pTaskId !== "" && pTaskId !== undefined) {
      query.elemMatch('parameters', { key: 'taskId', value: pTaskId });
    }

    if (pLimit && !isNaN(parseInt(pLimit)) && isFinite(pLimit)) {
      query.limit(pLimit)
    }

    if (pSkip && !isNaN(parseInt(pSkip)) && isFinite(pSkip)) {
      query.skip(pSkip);
    }

    if (!pSort || !pDirection || !pSort === undefined || !pDirection === undefined ) {
      query.sort({'created': -1});
    } else {
      var direction = pDirection == "DESC" ? -1 : 1;
      query.sort({pSort: direction});
    }

    LogEntry.find(query, function (err, entries) {
      if (err) {
        res.status(500);
        res.json({
          "message": err
        });
      } else {
        res.json(entries);
      }
    });
  },
 
  getOne: function(req, res) {
    LogEntry.findById(req.params.id, function (err, entry) {
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
    LogEntry.create(req.body, function (err, post) {
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
      LogEntry.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
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
    LogEntry.findByIdAndRemove(req.params.id, req.body, function (err, data) {
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
  },
  
  clear: function(req, res) {
    var query = new mongoose.Query;
  
    // Optional parameters
    var pUserId = req.query.userId;
    var pTaskId = req.query.taskId;
    var pAction = req.query.action;
    
    if (pUserId && pUserId !== "" ) {
      query.where('userId', pUserId);
    }
    
    if (pTaskId && pTaskId !== "") {
      query.elemMatch('parameters', { key: 'taskId', value: pTaskId });
    }

    if (pAction && pAction !== "" ) {
      query.where('action', pAction);
    }
    
    LogEntry.remove(query, function (err, data) {
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

module.exports = log;
