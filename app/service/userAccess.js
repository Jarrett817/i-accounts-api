'use strict';

const Service = require('egg').Service;

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;
    const user = await ctx.model.User.findOne({
      where: { user_id: payload.id },
    });
    if (!user) {
      ctx.throw(404, '用户不存在，请先注册');
    }
    if (!payload.password === user.user_pass) {
      ctx.throw(404, '密码错误');
    }
    // 生成Token令牌
    return { token: await service.actionToken.apply(user.user_id) };
  }

  async register(payload) {
    const { ctx } = this;
    const { id, password } = payload;
    const user = await ctx.model.User.findOne({
      where: { user_id: id },
    });
    if (user) {
      ctx.throw('账号已存在');
    }
    const newUser = await this.ctx.model.User.create({
      user_id: id,
      user_pass: password,
    });
    // 生成Token令牌
    return newUser;
  }
}

module.exports = UserAccessService;
