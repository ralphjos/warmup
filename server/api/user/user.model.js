'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  password: String,
  user: String,
  count: Number
});

var MAX_PASSWORD_LENGTH = 128;
var MAX_USERNAME_LENGTH = 128;

UserSchema.statics.isValidPassword = function (password, callback) {
	if (password.length > MAX_PASSWORD_LENGTH) {
		return false;
	}
	return true;
}

UserSchema.statics.isValidUserName = function (user, callback) {
	if (user.length > MAX_USERNAME_LENGTH || user.length == 0) {
		return false;
	}
	return true;
}

module.exports = mongoose.model('User', UserSchema);