var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Goal = require('../models/Goal.js');

/* GET /goals listing. */
router.get('/', function(req, res, next) {
  Goal.find(function (err, goals) {
    if (err) return next(err);
    res.json(goals);
  });
});

/* GET /goals/:id */
router.get('/:id', function(req, res, next) {
  Goal.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /goals */
router.post('/', function(req, res, next) {
  Goal.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /goals/:id */
router.put('/:id', function(req, res, next) {
  Goal.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /goals/:id */
router.delete('/:id', function(req, res, next) {
  Goal.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// ---

/* GET /goals/user/:id */
router.get('/user/:id', function(req, res, next) {
  Goal.find({ 'userId': req.params.id, 'deleted': { $exists: false }}, function (err, goals) {
    if (err) return next(err);
    res.json(goals);
  }).sort({'position': 1});
});

module.exports = router;
