var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  created: { type: Date, default: Date.now },
  modified: { type: Date },
  deleted: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);