var express = require('express');
var router = express.Router();

var users = require('./users');
router.get('/api/v1/user', users.getAll);
router.get('/api/v1/user/:id', users.getOne);
router.post('/api/v1/user', users.create);
router.put('/api/v1/user', users.update);
router.delete('/api/v1/user/:id', users.delete);

router.post('/api/v1/login', users.login);

var goals = require('./goals');
router.get('/api/v1/goal', goals.getAll);
router.get('/api/v1/goal/:id', goals.getOne);
router.post('/api/v1/goal', goals.create);
router.put('/api/v1/goal', goals.update);
router.delete('/api/v1/goal/:id', goals.delete);

var tasks = require('./tasks');
router.get('/api/v1/task', tasks.getAll);
router.get('/api/v1/task/:id', tasks.getOne);
router.post('/api/v1/task', tasks.create);
router.put('/api/v1/task', tasks.update);
router.delete('/api/v1/task/:id', tasks.delete);

var notes = require('./notes');
router.get('/api/v1/note', notes.getAll);
router.get('/api/v1/note/:id', notes.getOne);
router.post('/api/v1/note', notes.create);
router.put('/api/v1/note', notes.update);
router.delete('/api/v1/note/:id', notes.delete);

var bookmarks = require('./bookmarks');
router.get('/api/v1/bookmark', bookmarks.getAll);
router.get('/api/v1/bookmark/:id', bookmarks.getOne);
router.post('/api/v1/bookmark', bookmarks.create);
router.put('/api/v1/bookmark', bookmarks.update);
router.delete('/api/v1/bookmark/:id', bookmarks.delete);

var log = require('./log');
router.get('/api/v1/log', log.getAll);
router.get('/api/v1/log/:id', log.getOne);
router.post('/api/v1/log', log.create);
router.put('/api/v1/log', log.update);
router.delete('/api/v1/log/:id', log.delete);
router.delete('/api/v1/clear/log', log.clear);

var attachments = require('./attachments');
router.get('/api/v1/attachment', attachments.getAll);
router.get('/api/v1/attachment/:id', attachments.getOne);
router.post('/api/v1/attachment/:id', attachments.create);
router.post('/api/v1/attachment/link', attachments.link);
router.delete('/api/v1/attachment/:id', attachments.delete);

module.exports = router;