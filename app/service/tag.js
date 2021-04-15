'use strict';
const Service = require('egg').Service;

class TagService extends Service {
  async findTag(id) {
    const userId = this.ctx.state.user.data.id;
    return this.ctx.model.Tag.findOne({
      where: {
        id: id,
        user_id: userId,
      },
    });
  }
  async addTag({ name, icon, type }) {
    const userId = this.ctx.state.user.data.id;
    return this.ctx.model.Tag.create({
      name,
      icon,
      user_id: userId,
      type: type,
    });
  }
  async findAllTags() {
    const userId = this.ctx.state.user.data.id;
    return this.ctx.model.Tag.findAll({
      where: {
        user_id: userId,
      },
    });
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

  async deleteTag(id) {
    const { ctx } = this;
    const userId = ctx.state.user.data.id;
    const tag = await ctx.model.Tag.findOne({
      where: {
        id: id,
        user_id: userId,
      },
    });
    tag.destroy();
  }

  async updateTag({ id, name, icon }) {
    const { ctx } = this;
    const userId = ctx.state.user.data.id;
    const tag = await ctx.model.Tag.findOne({
      where: {
        id: id,
        user_id: userId,
      },
    });
    tag.name = name;
    tag.icon = icon;
    tag.save();
  }
}

module.exports = TagService;
