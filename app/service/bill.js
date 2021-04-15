'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class BillService extends Service {
  async getBillListByTimeSlot({ startTime, endTime, listType }) {
    const { ctx, service } = this;
    const types = ['', 'expend', 'income'];
    const id = ctx.state.user.data.id;

    let data = [];
    if (!toInt(listType)) {
      data = await ctx.model.Bill.findAll({
        where: {
          created_at: {
            [Op.gte]: toInt(startTime),
            [Op.lte]: toInt(endTime),
          },
          user_id: id,
        },
      });
    } else {
      data = await ctx.model.Bill.findAll({
        where: {
          created_at: {
            [Op.gte]: toInt(startTime),
            [Op.lte]: toInt(endTime),
          },
          type: types[listType],
          user_id: id,
        },
      });
    }
    const tags = await service.tag.findAllTags();
    const billList = data.map(item => {
      const { id, type, value, desc, created_at, tag_id } = item;
      const tag = tags.find(item => item.id === tag_id);
      return {
        type: type,
        value: value,
        id: id,
        tag: {
          name: tag.name,
          id: tag.id,
          icon: tag.icon,
        },
        desc: desc,
        createTime: created_at,
      };
    });
    return billList || [];
  }
  async getBillBalanceByTimeSlot({ startTime, endTime }) {
    const { ctx } = this;
    const id = ctx.state.user.data.id;
    const expend = await ctx.model.Bill.sum('value', {
      where: {
        type: 'expend',
        user_id: id,
        created_at: {
          [Op.gte]: toInt(startTime),
          [Op.lte]: toInt(endTime),
        },
      },
    });
    const income = await ctx.model.Bill.sum('value', {
      where: {
        type: 'income',
        user_id: id,
        created_at: {
          [Op.gte]: toInt(startTime),
          [Op.lte]: toInt(endTime),
        },
      },
    });
    return { expend: expend || 0, income: income || 0 };
  }
  async findBill(id) {
    const userId = this.ctx.state.user.data.id;
    const bill = await this.ctx.model.Bill.findOne({
      where: { id: id, user_id: userId },
    });
    const { billId, type, value, desc, tag_id, create_at } = bill;
    const tag = await this.ctx.service.tag.findTag(tag_id);
    return {
      id: billId,
      type: type,
      value: value,
      desc: desc,
      tag: {
        id: tag.id,
        name: tag.name,
        icon: tag.icon,
      },
      createAt: create_at,
    };
  }
  async updateBill(
    params = { id: null, type: '', value: null, desc: '', tagId: null }
  ) {
    const user = await this.ctx.model.User('select * from user where uid = ?');
    return user;
  }
  async addBill({ type, value, desc, tagId, date }) {
    const id = this.ctx.state.user.data.id;
    this.ctx.model.Bill.create({
      type,
      value,
      desc,
      tag_id: tagId,
      user_id: id,
      created_at: date,
    });
  }
  async deleteBill(billId) {
    const { ctx } = this;
    const userId = ctx.state.user.data.id;
    const bill = await ctx.model.Bill.findOne({
      where: {
        id: billId,
        user_id: userId,
      },
    });
    if (!bill) {
      ctx.throw(404, '用户不存在');
    }
    bill.destroy();
  }
  async getMonthListByYear(year) {
    const user = await this.ctx.model.User('select * from user where uid = ?');
    return user;
  }
  async getUserTimeSlot() {
    const user = await this.ctx.model.User('select * from user where uid = ?');
    return user;
  }
}

module.exports = BillService;
