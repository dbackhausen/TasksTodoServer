var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var LogEntry = require('../models/LogEntry.js');

/* GET /log listing. */
router.get('/user/:userId', function(req, res, next) {
  LogEntry.find({ 'userId': req.params.userId, options: { sort: { created: 1 }}}, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({created: -1});
});

/* GET /log/:id */
router.get('/:id', function(req, res, next) {
  LogEntry.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /log */
router.post('/', function(req, res, next) {
  LogEntry.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /log/:id */
router.put('/:id', function(req, res, next) {
  LogEntry.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /log/:id */
router.delete('/:id', function(req, res, next) {
  LogEntry.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// ---

/* POST /log/queries */
router.post('/query', function(req, res, next) {
  LogEntry.find({ 'taskId': req.body.taskId, 'key': req.body.key }, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({created: -1}).limit(req.body.limit);
});

/* GET /log/history/:taskId */
router.get('/history/:taskId', function(req, res, next) {
  LogEntry.find( { action: "location_change", parameters: { $elemMatch: { value: "taskId", value: req.params.taskId }}}, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({created: -1}).limit(30);
});

/* GET /log/latest/:key */
router.get('/user/:userId/latest/:key', function(req, res, next) {
  LogEntry.find({ 'userId': req.params.userId, 'key': req.params.key }, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({created: -1}).limit(1);
});

module.exports = router;
