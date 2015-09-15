var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Goal = require('../models/Goal.js');

var goals = {
  getAll: function(req, res) {
    var pUserId = req.query.userId;
  
    var query = new mongoose.Query;

    if (pUserId && pUserId !== "" ) {
      query.where('userId', pUserId);
    }
    
    query.sort({ 'userId': 1, 'position': 1, 'urgency': 1 });
    
    Goal.find(query, function (err, entries) {
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
    Goal.findById(req.params.id, function (err, entry) {
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
    Goal.create(req.body, function (err, post) {
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
      Goal.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
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
    Goal.findByIdAndRemove(req.params.id, req.body, function (err, data) {
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

module.exports = goals;
