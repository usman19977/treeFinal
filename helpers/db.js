const mysql = require('mysql');

console.log('process.env.DB_USER', process.env.DB_USER);


// const connection = mysql.createConnection({
//   host: process.env.HOSTDB,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   port : process.env.PORTDB,
//   // database: 'tree_db',
//   multipleStatements: true,
// });



// connection.connect(function (err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

const connection = mysql.createPool({
  connectionLimit: 10,
  // host: 'db-mysql-blr1-26074-do-user-12735065-0.b.db.ondigitalocean.com',
  // user: 'usman',
  // password: 'AVNS_XzSaP9RGAhrigCUouOy',
  // port : '25060',

  host : "localhost",
  user : "root" , 
  password : "root",
  port : "8889",
  //  database: 'products',s
  multipleStatements :true,
  debug: false
});


connection.getConnection((err, connection) => {
  if (err) {
  
    console.error('error connecting: ' + err);
    return;
  }


  console.log('connected as id ' + connection);
});

module.exports = connection;