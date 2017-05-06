const userController = require('./user.controller');
const postController = require('./post.controller');
const commentController = require('./comment.controller');

const controllers = {
  userController,
  postController,
  commentController,
};

module.exports = controllers;
