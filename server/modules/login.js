const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const loginModel = mongoose.model('logins', loginSchema);
module.exports = loginModel;
