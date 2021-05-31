'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class BillController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.billTransfer = {
      createdAt: { type: 'number', required: true, allowEmpty: false },
      desc: { type: 'string', required: false, allowEmpty: true },
      tagName: { type: 'string', required: true, allowEmpty: false },
      type: { type: 'string', required: true, allowEmpty: false },
      value: { type: 'number', required: true, allowEmpty: false },
    };
  }
  async getBillList() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query || {};
    // 调用 Service 进行业务处理
    const res = await service.bill.getBillListByTimeSlot(payload);

    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  async getBillBalance() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query || {};
    // 调用 Service 进行业务处理
    const res = await service.bill.getBillBalanceByTimeSlot(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
  async addBill() {
    const { ctx, service } = this;
    ctx.validate(this.billTransfer);
    const payload = ctx.request.body || {};
    const res = await service.bill.addBill(payload);
    ctx.helper.success({ ctx, res });
  }
  async findBill() {
    const { ctx, service } = this;
    const payload = ctx.query || {};
    const res = await service.bill.findBill(payload.id);
    ctx.helper.success({ ctx, res });
  }
  async deleteBill() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.bill.deleteBill(payload.id);
    ctx.helper.success({ ctx, res });
  }
  async updateBill() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.bill.updateBill(payload);
    ctx.helper.success({ ctx, res });
  }

  async getMonthList() {
    const { ctx, service } = this;
    const payload = ctx.query || {};
    const res = await service.bill.getMonthListByYear(payload.year);
    ctx.helper.success({ ctx, res });
  }
  async getTimeSlot() {
    const { ctx, service } = this;
    const res = await service.bill.getUserTimeSlot();
    ctx.helper.success({ ctx, res });
  }
}

module.exports = BillController;
