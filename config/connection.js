const mysql = require('mysql2');

require('dotenv').config();

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username and password stored separately 
      port: 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      // database that will be accessed     
      database: process.env.MYSQL_DATABASE
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

module.exports = connection;