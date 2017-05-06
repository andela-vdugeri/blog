const controllers = require('../controllers');

module.exports = function(app) {
  /**
   * User routes
   */
  app.post('/users', controllers.userController.store);
  app.get('/users', controllers.userController.index);
  app.get('/users/:id', controllers.userController.find);
  app.put('/users/:id', controllers.userController.update);
  app.delete('/users/:id', controllers.userController.destroy);

  /**
   * Post routes
   */
  app.post('/posts', controllers.postController.store);
  app.get('/posts', controllers.postController.index);
  app.get('/posts/:id', controllers.postController.find);
  app.put('/posts/:id', controllers.postController.update);
  app.delete('/posts/:id', controllers.postController.destroy);


  /**
   * Comment routes
   */
  app.post('/comments', controllers.commentController.store);
  app.get('/comments', controllers.commentController.index);
  app.get('/comments/:id', controllers.commentController.find);
  app.put('/comments/:id', controllers.commentController.update);
  app.delete('/comments/:id', controllers.commentController.destroy);

}
