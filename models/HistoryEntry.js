var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var HistoryEntrySchema = new mongoose.Schema({
  taskId: { type: ObjectId, index: true },
  title: String,
  url: String,
  description: String,
  thumbnail: String,
  content: String,
  relevance: { type: Number, default: 2},
  created: { type: Date, default: Date.now },
  deleted: { type: Date }
}, { collection: 'history' });

module.exports = mongoose.model('HistoryEntry', HistoryEntrySchema);