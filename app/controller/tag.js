'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class TagController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async getTagsByType() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query || {};
    // 调用 Service 进行业务处理
    const res = await service.tag.findTagsByType(payload.type);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}

module.exports = TagController;
