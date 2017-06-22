const authController = require('./auth.controller');
const commentController = require('./comment.controller');
const postController = require('./post.controller');
const userController = require('./user.controller');

const controllers = {
  authController,
  commentController,
  postController,
  userController,
};

module.exports = controllers;
