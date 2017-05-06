'use strict';

const Validator = require('validate.js');

class CommentValidator {

  validate(comment) {
    const constraints = {
      body: {
        presence: true
      },
      user_id: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThan: 0
        }
      },
      post_id: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThan: 0
        }
      }
    };

    return new Promise((resolve, reject) => {
      const errors = Validator.validate(comment, constraints);

      if(!errors) {
        resolve(comment);
      } else {
        reject(errors);
      }
    });
  }
}

module.exports = new CommentValidator();
