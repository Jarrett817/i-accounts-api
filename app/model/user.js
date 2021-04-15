'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      name: STRING(30),
      user_id: { type: STRING(30), primaryKey: true },
      user_pass: STRING(30),
      created_at: BIGINT(13),
      updated_at: BIGINT(13),
    },
    {
      timestamps: false, //去除createAt updateAt
    }
  );

  return User;
};
