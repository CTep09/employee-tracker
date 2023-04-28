// Import and require express & mysql2
const express = require('express');
const mysql = require('mysql2');

// Local host port 
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username and password
      user: 'root',
      password: 'password',
      // database that will be accessed     
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );