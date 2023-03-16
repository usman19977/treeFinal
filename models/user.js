const Sequelize = require('sequelize');

const sequelize = require('../helpers/sequalize');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: Sequelize.STRING,
});

module.exports = User;
