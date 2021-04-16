'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');
const dayjs = require('dayjs');

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
        createdAt: created_at,
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
  async findBill(billId) {
    const userId = this.ctx.state.user.data.id;
    const bill = await this.ctx.model.Bill.findOne({
      where: { id: billId, user_id: userId },
    });
    const { id, type, value, desc, tag_id, created_at } = bill;
    const tag = await this.ctx.service.tag.findTag(tag_id);
    return {
      id: id,
      type: type,
      value: value,
      desc: desc,
      tag: {
        id: tag.id,
        name: tag.name,
        icon: tag.icon,
      },
      createdAt: created_at,
    };
  }
  async updateBill({ id, type, value, desc, tagId }) {
    const userId = this.ctx.state.user.data.id;
    const bill = await this.ctx.model.Bill.findOne({
      where: { id: id, user_id: userId },
    });
    bill.type = type;
    bill.value = value;
    bill.desc = desc;
    bill.tag_id = tagId;
    bill.save();
    return bill;
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
    const { ctx } = this;
    const userId = ctx.state.user.data.id;
    const yearStart = dayjs(year).startOf('year').valueOf();
    const yearEnd = dayjs(year).endOf('year').valueOf();
    const result = [];
    const wholeData = await ctx.model.Bill.findAll({
      where: {
        user_id: userId,
        created_at: {
          [Op.gte]: yearStart,
          [Op.lte]: yearEnd,
        },
      },
    });
    for (let i = 0; i < 12; i++) {
      let income = 0;
      let expend = 0;
      const monthStart = dayjs(yearStart).month(i).startOf('month').valueOf();
      const monthEnd = dayjs(yearStart).month(i).endOf('month').valueOf();
      wholeData.forEach(item => {
        if (
          toInt(item.created_at) > monthStart &&
          toInt(item.created_at) < monthEnd
        ) {
          if (item.type === 'expend') expend += item.value;
          else income += item.value;
        }
      });
      result.push({
        month: dayjs(yearStart).month(i).month() + 1,
        expend,
        income,
      });
    }
    return result;
  }
  async getUserTimeSlot() {
    const { ctx } = this;
    const userId = ctx.state.user.data.id;
    const maxDate = await ctx.model.Bill.max('created_at', {
      where: {
        user_id: userId,
        created_at: { [Op.gt]: 0 },
      },
    });
    const minDate = await ctx.model.Bill.min('created_at', {
      where: {
        user_id: userId,
        created_at: { [Op.gt]: 0 },
      },
    });
    return { maxDate, minDate };
  }
}

module.exports = BillService;
