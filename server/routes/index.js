'use strict';

const controllers = require('../controllers');
const acl = require('../middleware/authenticate');

module.exports = function(app) {
  /**
   * User routes
   */
  app.post('/api/v1/users', controllers.userController.store);
  app.get('/api/v1/users', controllers.userController.index);
  app.get('/api/v1/users/match', controllers.userController.findBy);
  app.get('/api/v1/users/:id', controllers.userController.find);
  app.put('/api/v1/users/:id', acl.isAuthenticated, controllers.userController.update);
  app.delete('/api/v1/users/:id', acl.isAuthenticated, controllers.userController.destroy);


  /**
   * Auth routes
   */
  app.post('/api/v1/auth/login', controllers.authController.login);

  /**
   * Post routes
   */
  app.post('/api/v1/posts', acl.isAuthenticated, controllers.postController.store);
  app.get('/api/v1/posts', controllers.postController.index);
  app.get('/api/v1/posts/:id', controllers.postController.find);
  app.put('/api/v1/posts/:id', controllers.postController.update);
  app.delete('/api/v1/posts/:id', acl.isAuthenticated, controllers.postController.destroy);


  /**
   * Comment routes
   */
  app.post('/api/v1/comments', acl.isAuthenticated, controllers.commentController.store);
  app.get('/api/v1/comments', controllers.commentController.index);
  app.get('/api/v1/comments/:id', controllers.commentController.find);
  app.put('/api/v1/comments/:id', acl.isAuthenticated, controllers.commentController.update);
  app.delete('/api/v1/comments/:id', acl.isAuthenticated, controllers.commentController.destroy);

}
