var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);