const Sequelize = require('sequelize');

const sequelize = require('../helpers/sequalize');

const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isRead: Sequelize.BOOLEAN,
  message: Sequelize.STRING,
  date: Sequelize.DATE,
});

module.exports = Message;
