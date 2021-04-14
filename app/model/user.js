'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    user_id: STRING(30),
    user_pass: STRING(30),
    created_at: BIGINT(13),
    updated_at: BIGINT(13),
  });

  return User;
};
