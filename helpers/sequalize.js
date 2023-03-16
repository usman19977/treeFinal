const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//   'products',
//   'usman',
//   'AVNS_XzSaP9RGAhrigCUouOy',
//   {
//     dialect: 'mysql',
//     // host: process.env.HOST,ss
//     host: 'db-mysql-blr1-26074-do-user-12735065-0.b.db.ondigitalocean.com',
//     port : '25060'
//   }
// );

const sequelize = new Sequelize(
  'products',
  'root',
  'root',
  {
    dialect: 'mysql',
    // host: process.env.HOST,ss
    host: 'localhost',
    port : '8889'
  }
);

module.exports = sequelize;