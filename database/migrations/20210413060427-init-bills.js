'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, FLOAT, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('bills', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: STRING(30),
        references: {
          model: {
            tableName: 'users',
          },
          key: 'user_id',
        },
        allowNull: false,
      },
      tag_name: STRING(10),
      tag_icon: STRING(10),
      type: STRING(10),
      value: FLOAT(2),
      desc: STRING(60),
      created_at: BIGINT(13),
      updated_at: BIGINT(13),
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('bills');
  },
};
