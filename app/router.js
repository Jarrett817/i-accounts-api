'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // userAccess
  router.post('/iAccounts/api/v1/user/login', controller.userAccess.login);
  router.post(
    '/iAccounts/api/v1/user/register',
    controller.userAccess.register
  );

  //bill
  router.get(
    '/iAccounts/api/v1/bills/list',
    app.jwt,
    controller.bill.getBillList
  );
  router.get(
    '/iAccounts/api/v1/bills/balance',
    app.jwt,
    controller.bill.getBillBalance
  );
  router.post('/iAccounts/api/v1/bills', app.jwt, controller.bill.addBill);
  router.get(
    '/iAccounts/api/v1/bills/detail',
    app.jwt,
    controller.bill.findBill
  );
  router.delete('/iAccounts/api/v1/bills', app.jwt, controller.bill.deleteBill);
  router.put('/iAccounts/api/v1/bills', app.jwt, controller.bill.updateBill);
  router.get(
    '/iAccounts/api/v1/bills/monthList',
    app.jwt,
    controller.bill.getMonthList
  );
  router.get(
    '/iAccounts/api/v1/bills/timeSlot',
    app.jwt,
    controller.bill.getTimeSlot
  );

  //tags
  router.get(
    '/iAccounts/api/v1/tags/list',
    app.jwt,
    controller.tag.getTagsByType
  );
  router.get('/iAccounts/api/v1/tags/detail', app.jwt, controller.tag.findTag);
  router.post('/iAccounts/api/v1/tags', app.jwt, controller.tag.addTag);
  router.delete('/iAccounts/api/v1/tags', app.jwt, controller.tag.deleteTag);
  router.put('/iAccounts/api/v1/tags', app.jwt, controller.tag.updateTag);
};
