'use strict';

const Validator = require('validate.js');

class UserValidator {

  validate(user) {
    const constraints = {
      username: {
        presence: true,
        format: {
          pattern: '[A-Za-z]+',
          message: 'Can only contain letters'
        }
      },
      firstName: {
        presence: true,
        format: {
          pattern: '[A-Za-z]+',
          message: 'Can only contain letters'
        }
      },
      lastName: {
        presence: true,
        format: {
          pattern: '[A-Za-z]+',
          message: 'Can only contain letters'
        }
      },
      password: {
        presence: true,
        length: {
          minimum: 6
        }
      },
      emailAddress: {
        presence: true,
        email: true
      }
    };

    return new Promise((resolve, reject) => {
      const errors = Validator.validate(user, constraints);
      if(errors) {
        reject(errors);
      } else {
        resolve(user);
      }
    });
  }
}

module.exports = new UserValidator();
