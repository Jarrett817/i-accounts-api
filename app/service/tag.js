'use strict';
const Service = require('egg').Service;

class TagService extends Service {
  async findTag(id) {
    return this.ctx.model.Tag.findOne({ id: id });
  }
  async findTagsByType(type) {
    const { ctx } = this;
    const userId = ctx.state.user.data.id;
    const tags = ctx.model.Tag.findAll({
      where: {
        type: type,
        user_id: userId,
      },
    });
    return tags || [];
  }
}

module.exports = TagService;
