'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/kq', controller.home.kq);
  router.get('/up', controller.home.up);
  router.get('/down', controller.home.down);
  router.get('/login', controller.home.login);
};
