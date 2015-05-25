var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var HistoryEntry = require('../models/HistoryEntry.js');

/* GET /history listing. */
router.get('/', function(req, res, next) {
  HistoryEntry.find(function (err, history) {
    if (err) return next(err);
    res.json(history);
  });
});

/* GET /history/id */
router.get('/:id', function(req, res, next) {
  HistoryEntry.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /history */
router.post('/', function(req, res, next) {
  HistoryEntry.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /history/:id */
router.put('/:id', function(req, res, next) {
  HistoryEntry.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /history/:id */
router.delete('/:id', function(req, res, next) {
  HistoryEntry.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// ---

/* GET /history/task/:id */
router.get('/task/:id', function(req, res, next) {
  HistoryEntry.find({ 'taskId': req.params.id, 'deleted': { $exists: false }}, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({'created': -1});
});

module.exports = router;
