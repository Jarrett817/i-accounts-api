'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // userAccess
  router.post('/iAccounts/user/login', controller.userAccess.login);
  router.post('/iAccounts/user/register', controller.userAccess.register);

  //bill
  router.get('/iAccounts/bills/list', app.jwt, controller.bill.getBillList);
  router.get(
    '/iAccounts/bills/balance',
    app.jwt,
    controller.bill.getBillBalance
  );
  router.post('/iAccounts/bills', app.jwt, controller.bill.addBill);
  router.get('/iAccounts/bills/detail', app.jwt, controller.bill.findBill);
  router.delete('/iAccounts/bills', app.jwt, controller.bill.deleteBill);
  router.put('/iAccounts/bills', app.jwt, controller.bill.updateBill);
  router.get(
    '/iAccounts/bills/monthList',
    app.jwt,
    controller.bill.getMonthList
  );
  router.get('/iAccounts/bills/timeSlot', app.jwt, controller.bill.getTimeSlot);

  //tags
  router.get('/iAccounts/tags/list', app.jwt, controller.tag.getTagsByType);
  router.get('/iAccounts/tags/detail', app.jwt, controller.tag.findTag);
  router.post('/iAccounts/tags', app.jwt, controller.tag.addTag);
  router.delete('/iAccounts/tags', app.jwt, controller.tag.deleteTag);
  router.put('/iAccounts/tags', app.jwt, controller.tag.updateTag);
};
