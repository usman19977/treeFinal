const Sequelize = require('sequelize');

const sequelize = require('../helpers/sequalize');

const Chat = sequelize.define('chat', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Chat;

/*
chat table
userId 1 is for admin
id  | userId  | createdAt | updatedAt
1   | 2       | 2019-01-01 | 2019-01-01
2   | 3       | 2019-01-01 | 2019-01-01
3   | 4       | 2019-01-01 | 2019-01-01

messages table
id  | chatId | userId | message | createdAt | updatedAt
1   | 1      | 2      | hello   | 2019-01-01 | 2019-01-01
2   | 1      | 3      | world   | 2019-01-01 | 2019-01-01
3   | 2      | 4      | hi      | 2019-01-01 | 2019-01-01
4   | 2      | 2      | hi      | 2019-01-01 | 2019-01-01
5   | 2      | 3      | hi      | 2019-01-01 | 2019-01-01

*/
