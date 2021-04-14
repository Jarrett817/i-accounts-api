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
        type: INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        allowNull: false,
      },
      tag_id: {
        type: INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
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
