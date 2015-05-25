var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var AttachmentSchema = new mongoose.Schema({
  taskId: { type: ObjectId, index: true },
  filename: String,
  size: Number,
  url: String,
  contentType: String,
  created: { type: Date, default: Date.now },
  modified: { type: Date },
  deleted: { type: Date }
});

module.exports = mongoose.model('Attachment', AttachmentSchema);