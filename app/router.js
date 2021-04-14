'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // userAccess
  router.post('/iAccounts/login', controller.userAccess.login);

  //bill
  router.get('/iAccounts/bills/list', app.jwt, controller.bill.getBillList);

  //tags
  router.get('/iAccounts/tags/list', app.jwt, controller.tag.getTagsByType);
};
