'use strict';

const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET;

module.exports = {
  isAuthenticated(req, res, next) {
    let authHeader = req.get('Authorization');

    let token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(400).json(err.message);
      } else {
        req.user = decoded.data;
        return next();
      }
    });
  }
}
