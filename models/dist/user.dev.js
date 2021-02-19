"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email Can't be tha blank"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password Can't be tha blank"]
  },
  displayName: {
    type: String,
    required: [true, "displayName Can't be the blank"]
  },
  avatar: String,
  status: {
    type: Boolean
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('user', userSchema);