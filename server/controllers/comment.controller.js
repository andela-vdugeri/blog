'use strict';

const models = require('../models');


class CommentController {

  /**
   * Returns all the comments in the databse
   *
   * @param req
   * @param res
   *
   * @return array comments
   */
  index(req, res) {
    models.Comment.findAll()
      .then(comments => {
        return res.status(200).json(comments);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  }

  /**
   * Creates a comment instance in the database
   *
   * @param req
   * @param res
   *
   * @return Object comment
   */
  store(req, res) {
    const comment = {
      body: req.body.body,
      user_id: req.body.user_id,
      post_id: req.body.post_id
    };

    Validator.validate(comment)
      .then(comment => {
        models.Comment.create(comment)
          .then(comment => {
            return res.status(200).json(comment);
          }).catch(err => {
            return res.status(500).json(err);
          });
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  }

  /**
   * Returns a comment matching the specified id
   *
   * @param req
   * @param res
   *
   * @return Object comment
   */
  find(req, res) {
    const id = req.params.id;

    models.Comment.findById(id)
      .then(comment => {
        if (comment) {
          return res.status(200).json(comment);
        } else {
          return res.status(404).json({ message: `Comment with id ${id} not found` });
        }
      }).catch(err => {
        return res.status(500).json(err);
      });
  }

  /**
   * Updates a comment matching the specified id
   *
   * @param req
   * @param res
   *
   * @return Object Comment|message|err
   */
  update(req, res) {
    const id = req.params.id;
    const comment = req.body;

    Validator.validate(comment)
      .then(validComment => {
        models.Comment.findById(id)
          .then(comment => {
            if (comment) {
              comment.body = validComment.body
              comment.save();
              return res.status(200).json(comment);
            } else {
              return res.status(404).json({ message : `Comment with id ${id} does not exist `});
            }
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }).catch(err => {
        return res.status(400).json(err);
      });
  }

  /**
   * Deletes a comment matching an identifier
   *
   * @param req
   * @param res
   *
   * @return Object message|err
   */
  destroy(req, res) {
    const id = req.params.id;
    models.Comment.findById(id)
      .then(comment => {
        if (comment) {
          comment.destroy();
          return res.status(200).json({ message: `Comment with id ${id} deleted` });
        } else {
          return res.status(404).json({ message: 'Comment not found' });
        }
      }).catch(err => {
        return res.status(500).json(err);
      });
  }
}

module.exports = new CommentController();
