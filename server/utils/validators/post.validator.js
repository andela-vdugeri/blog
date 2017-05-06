'use strict';

const Validator = require('validate.js');


class PostValidator {

  validate(post) {
    const constraints = {
      title: {
        presence: true
      },
      body: {
        presence: true,
        length: {
          min: 100
        }
      },
      user_id: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThan: 0
        }
      }
    }

    return new Promise((resolve, reject) => {
      const errors = Validator.validate(post, constraints);

      if(!errors) {
        resolve(post);
      } else {
        reject(errors);
      }
    });
  }
}

module.exports = new PostValidator();
