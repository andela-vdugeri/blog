'use strict';

const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET;

module.exports = {
  createToken(user) {
    return jwt.sign({
      data: user.toJson(),
    }, secret, { expiresIn: '12h' });
  }
}
