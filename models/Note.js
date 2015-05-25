var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var NoteSchema = new mongoose.Schema({
  taskId: { type: ObjectId, index: true },
  body: String,
  created: { type: Date, default: Date.now },
  modified: { type: Date },
  deleted: { type: Date }
});

module.exports = mongoose.model('Note', NoteSchema);