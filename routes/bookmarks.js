var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Bookmark = require('../models/Bookmark.js');

/* GET /bookmarks listing. */
router.get('/', function(req, res, next) {
  Bookmark.find(function (err, bookmarks) {
    if (err) return next(err);
    res.json(bookmarks);
  });
});

/* GET /bookmarks/id */
router.get('/:id', function(req, res, next) {
  Bookmark.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /bookmarks */
router.post('/', function(req, res, next) {
  Bookmark.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /bookmarks/:id */
router.put('/:id', function(req, res, next) {
  Bookmark.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /bookmarks/:id */
router.delete('/:id', function(req, res, next) {
  Bookmark.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// --

/* GET /bookmarks/task/:id */
router.get('/task/:id', function(req, res, next) {
  Bookmark.find({ 'taskId': req.params.id, 'deleted': { $exists: false }}, function (err, entries) {
    if (err) return next(err);
    res.json(entries);
  }).sort({'created': -1});
});

module.exports = router;
