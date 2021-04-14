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
    const data = await ctx.model.Bill.findAll({
      where: {
        created_at: {
          [Op.gte]: toInt(startTime),
          [Op.lte]: toInt(endTime),
        },
        type: types[listType],
        user_id: id,
      },
    });
    const billList = data.map(async item => {
      const { id, type, value, desc, created_at, tag_id } = item;
      const tag = await service.tag.findTag(tag_id);
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
  async updateBill(
    params = { id: null, type: '', value: null, desc: '', tagId: null }
  ) {
    const user = await this.ctx.model.User('select * from user where uid = ?');
    return user;
  }
  async addBill(params = { type: '', value: null, desc: '', tagId: null }) {
    const user = await this.ctx.model.User('select * from user where uid = ?');
    return user;
  }
  async deleteBill(billId) {
    const user = await this.ctx.model.User('select * from user where uid = ?');
    return user;
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
