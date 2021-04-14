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
}

module.exports = BillController;
