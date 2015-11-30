var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var BookmarkSchema = new mongoose.Schema({
  taskId: { type: ObjectId, index: true },
  title: String,
  url: String,
  description: String,
  thumbnail: String,
  content: String,
  relevance: { type: Number, default: 2},
  created: { type: Date, default: Date.now },
  modified: { type: Date },
  completed: { type: Date },
  deleted: { type: Date }
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);