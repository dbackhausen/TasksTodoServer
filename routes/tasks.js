var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../models/Task.js');

var tasks = {
  getAll: function(req, res) {
    var pUserId = req.query.userId;
    var pGoalId = req.query.goalId;
  
    var query = new mongoose.Query;

    if (pUserId && pUserId !== "" ) {
      query.where('userId', pUserId);
    }

    if (pGoalId && pGoalId !== "" ) {
      query.where('goalId', pGoalId);
    }
    
    query.sort({ 'goalId': 1, 'position': 1 });
    
    Task.find(query, function (err, entries) {
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
    Task.findById(req.params.id, function (err, entry) {
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
    Task.create(req.body, function (err, post) {
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
      Task.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
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
    Task.findByIdAndRemove(req.params.id, req.body, function (err, data) {
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

module.exports = tasks;
