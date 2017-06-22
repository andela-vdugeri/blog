'use strict';

const models = require('../models');
const Validator = require('./../utils/validators/user.validator');

class UserController {
  /**
   * Returns all the users in the database
   *
   * @param Request req
   * @param Response res
   *
   * @return array
   */
  index(req, res) {
    models.User.findAll().then(users => {
      let allUsers = [];

      users.forEach((user) => {
        allUsers.push(user.toJson());
      });

      return res.status(200).json(allUsers);
    }).catch(err => {
      return res.status(500).json(err);
    });
  }

  /**
   * Returns a user matching the specified identifier
   *
   * @param Request req
   * @param Response res
   *
   * @return Object
   */
  find(req, res) {
    const id = req.params.id;
    models.User.findById(id).then(user =>  {
      if (user) {
        return res.status(200).json(user.toJson());
      }
      return res.status(404).json({message: `User with id ${id} not found`});
    }).catch(err => {
      return res.status(500).json(err)
    });
  }

  /**
   * Inserts a user into the database
   *
   * @param Request req
   * @param Response res
   *
   * @return Object
   */
  store(req, res) {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      emailAddress: req.body.emailAddress
    };

    Validator.validate(user).then((user) => {
      models.User.create(user).then(user => {
        return res.status(201).json(user.toJson());
      }).catch(err => {
        return res.status(500).json(err);
      });
    }).catch(err => {
      return res.status(400).json(err);
    });
  }

  /**
   * Finds a user my username or email address
   *
   * @param Request req
   * @param Response res
   *
   * @return Response Object
   */
  findBy(req, res) {
    let username;
    let emailAddress;
    if (req.query.username) {
      username = req.query.username;
      models.User.findOne({
        where: {
          username
        }
      }).then(user => {
        if (user) {
          return res.status(200).json(user.toJson());
        }
        return res.status(200).json(null);
      }).catch(err => {
        return res.status(500).json(err);
      })
    }

    if (req.query.emailAddress) {
      emailAddress = req.query.emailAddress;

      models.User.findOne({
        where: {
          emailAddress
        }
      }).then(user => {
        if (user) {
          return res.status(200).json(user.toJson());
        }
        return res.status(200).json(null);
      }).catch(err => {
        return res.status(500).json(err);
      });
    }
  }

  /**
   *Updates a user instance matching the specified id
   *
   * @param Request req
   * @param Response res
   *
   * @return Object user
   */
  update(req, res) {
    const id = req.params.id;
    const user = req.body;
    Validator.validate(user).then(() => {
      models.User.upsert(user, {
        fields: [
          'firstName',
          'lastName',
          'username'
        ]
      }).then(created => {
        const userPromise = models.User.findById(id);
        userPromise.then(user => {
          return res.status(200).json(user.toJson());
        });
      }).catch(err => {
        return res.status(500).json(err);
      })
    }).catch(err => {
      return res.status(400).json(err);
    });
  }


  /**
   * Deletes a specified user matching the id
   *
   * @param Request req
   * @param Response res
   *
   * @return Object message
   */
  destroy(req, res) {
    const id = req.params.id;
    models.User.findById(id).then((user) => {
      if(user) {
        user.destroy();
        return res.status(200).json({ message: 'User deleted' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    }).catch(err => {
      return res.status(500).json(err);
    });
  }
}

module.exports = new UserController();
