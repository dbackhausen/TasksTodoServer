var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/User.js');

var users = {
  getAll: function(req, res) {
    User.find(function (err, entries) {
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
    User.findById(req.params.id, function (err, entry) {
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
    User.create(req.body, function (err, post) {
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
      User.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
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
    User.findByIdAndRemove(req.params.id, req.body, function (err, data) {
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
  
  login: function(req, res) {
    User.find({ 'username': req.body.username, 'password': req.body.password }, function (err, user) {
      if (err) {
        res.status(500);
        res.json({
          "message": err
        });
      } else {
        if (user[0] !== null && user[0] !== undefined) {
          res.json(user[0]);
        } else {
          res.status(401);
          res.json({
            "message": "Unknown user."
          });
        }
      }
    });
  }
};

module.exports = users;
