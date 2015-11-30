var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var GoalSchema = new mongoose.Schema({
  userId: { type: ObjectId, index: true },
  title: String,
  description: String,
  dueDate: { type: Date },
  reminderDate: { type: Date },
  urgency: { type: Number, default: 2},
  level: { type: Number, default: 0},
  position: { type: Number, default: 1},
  created: { type: Date, default: Date.now },
  modified: { type: Date },
  completed: { type: Date },
  deleted: { type: Date }
});

module.exports = mongoose.model('Goal', GoalSchema);