var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var LogEntrySchema = new mongoose.Schema({
  userId: { type: ObjectId, index: true },
  action: { type: String, index: true },
  parameters: [{
    key: String,
    value: String
  }],
  created: { type: Date, default: Date.now }
}, { collection: 'log' });

module.exports = mongoose.model('LogEntry', LogEntrySchema);