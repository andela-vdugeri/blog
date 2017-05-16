'use strict';
const models = require('../models');
const signer = require('../utils/signers/tokengenerator');

module.exports = {
    login,
    logout
};

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
                return res.status(200).json({signer.createToken(user)});
            })
            .catch(err => {
                return res.status(401).json({ message: 'Invalid user credentials'});
            });
    }).catch(err => {
        return res.status(404).json({ message: 'Invalid user credentials'});
    });
}
