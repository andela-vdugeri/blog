'use strict';
const models = require('../models');
const signer = require('../utils/signer/tokengenerator');


module.exports = {
  login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userPromise = models.User.findOne({
      where: {
        username
      }
    });

    userPromise.then(user => {
      user.matchPasswords(password)
        .then(matched => {
          if (matched) {
            const token = signer.createToken(user);
            return res.status(200).json({ token });
          } else {
            return res.status(404).json({ message: 'Invalid username or password' });
          }
        })
        .catch(err => {
          return res.status(401).json({ message: 'Invalid user credentials'});
        });
    }).catch(err => {
      return res.status(404).json({ message: 'Invalid user credentials'});
    });
  }
};
