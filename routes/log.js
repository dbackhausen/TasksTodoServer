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

/* POST /log/latest/ */
router.post('/latest/', function(req, res, next) {
  var limit = req.body.limit;

  //console.log(req.body);
  LogEntry.find({ 'userId': req.body.userId, 'action': req.body.action }, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({created: -1}).limit((limit != null || limit != undefined) ? limit : 50);
});

/* POST /log/latest/queries */
router.post('/latest/queries', function(req, res, next) {
  LogEntry.find({ 
    'action': "search",
    '$and': [{
      'parameters': { 
        '$elemMatch': { key: "taskId", value: req.body.taskId }
      }
    },{
      'parameters': { 
        '$elemMatch': { key: "provider", value: req.body.provider }
      }
    }]
  }, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({created: -1});
});

/* GET /log/history/:taskId */
router.get('/history/:taskId', function(req, res, next) {
  LogEntry.find( { action: "location_change", parameters: { $elemMatch: { value: "taskId", value: req.params.taskId }}}, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({created: -1}).limit(30);
});

/* GET /log/tabs/:taskId */
router.get('/tabs/:taskId', function(req, res, next) {
  LogEntry.find( { action: "save_tab", parameters: { $elemMatch: { value: "taskId", value: req.params.taskId }}}, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({created: -1});
});

module.exports = router;
