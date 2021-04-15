'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Tag = app.model.define(
    'tag',
    {
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
      type: STRING(10),
      name: STRING(30),
      icon: STRING(30),
      created_at: BIGINT(13),
      updated_at: BIGINT(13),
    },
    {
      timestamps: false, //去除createAt updateAt
    }
  );

  return Tag;
};
