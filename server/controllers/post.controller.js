'use strict';

const models = require('../models');
const Validator = require('../utils/validators/post.validator');

class PostController {
  index (req, res) {
    models.Post.findAll().then(posts => {
      const parsedPosts = posts.map(post => {
        post.body = JSON.parse(post.body);
        return post;
      });
      return res.status(200).json(parsedPosts);
    }).catch(err => {
      return res.status(500).json(err);
    });
  }

  store (req, res) {
    const post = {
      user_id: req.user.id,
      title: req.body.title,
      body: JSON.stringify(req.body.body)
    };

    Validator.validate(post).then(post => {
      models.Post.create(post).then(post => {
        return res.status(201).json(post);
      }).catch(err => {
        return res.status(500).json(err);
      });
    }).catch(err => {
      return res.status(400).json(err);
    });
  }

  find (req, res) {
    const id = req.params.id;
    models.Post.findById(id).then(post => {
      if(post) {
        post.body = JSON.parse(post.body);

        return res.status(200).json(post);
      } else {
        return res.status(404).json({ message: `Post with id ${id} not found` });
      }
    }).catch(err => {
      return res.status(500).json(err);
    });
  }

  update (req, res) {
    const post = req.body;
    const id = req.params.id;

    Validator.validate(post).then(post => {
      models.Post.findById(id).then(_post => {
        if (_post) {
          _post.title = post.title;
          _post.body = JSON.stringify(post.body);
          _post.save();

          _post.body = JSON.parse(_post.body);

          return res.status(200).json(_post);
        } else {
          res.status(404).json({ message: `Post with id ${id} not found `});
        }
      }).catch(err => {
        res.status(500).json(err);
      });
    }).catch(err => {
      return res.status(400).json(err);
    });
  }

  destroy(req, res) {
    const id = req.params.id;

    models.Post.findById(id).then(post => {
      if (post) {
        post.destroy();
        return res.status(200).json({ message: `Post with id ${id} deleted` });
      } else {
        return res.status(404).json({ message: `Post with id ${id} not found` });
      }
    }).catch(err => {
      res.status(500).json(err);
    });
  }
}


module.exports = new PostController();
