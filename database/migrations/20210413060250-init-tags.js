'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('tags', {
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
      type: STRING(10),
      name: STRING(30),
      icon: STRING(30),
      created_at: BIGINT(13),
      updated_at: BIGINT(13),
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('tags');
  },
};
