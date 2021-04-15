'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('users', {
      name: STRING(30),
      user_id: { type: STRING(30), primaryKey: true },
      user_pass: STRING(30),
      created_at: BIGINT(13),
      updated_at: BIGINT(13),
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
