'use strict';

module.exports = app => {
  const { STRING, INTEGER, FLOAT, BIGINT } = app.Sequelize;

  const Bill = app.model.define(
    'bill',
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
      tag_id: {
        type: INTEGER,
        references: {
          model: {
            tableName: 'tags',
          },
          key: 'id',
        },
      },
      type: STRING(10),
      value: FLOAT(2),
      desc: STRING(60),
      created_at: BIGINT(13),
      updated_at: BIGINT(13),
    },
    {
      timestamps: false, //去除createAt updateAt
    }
  );

  return Bill;
};
