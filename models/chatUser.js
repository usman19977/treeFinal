const Sequelize = require('sequelize');

const sequelize = require('../helpers/sequalize');

const ChatUser = sequelize.define('chatUser', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = ChatUser;
