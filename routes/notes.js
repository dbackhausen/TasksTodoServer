var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = require('../models/Note.js');

/* GET /users listing. */
router.get('/', function(req, res, next) {
  Note.find(function (err, notes) {
    if (err) return next(err);
    res.json(notes);
  });
});

/* GET /notes/:id */
router.get('/:id', function(req, res, next) {
  Note.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /notes */
router.post('/', function(req, res, next) {
  Note.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /notes/:id */
router.put('/:id', function(req, res, next) {
  Note.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /notes/:id */
router.delete('/:id', function(req, res, next) {
  Note.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// ---

/* GET /goals/task/:id */
router.get('/task/:id', function(req, res, next) {
  Note.find({ 'taskId': req.params.id, 'deleted': { $exists: false }}, function (err, notes) {
    if (err) return next(err);
    res.json(notes);
  }).sort({'created': -1});;
});

module.exports = router;
