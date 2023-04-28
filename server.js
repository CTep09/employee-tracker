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

  // View all departments - table with department names and department ids

  // View all roles - table with the job title, role id, department,salary

  // View all employees - table with employee ids, first names, last names, job titles, departments, salaries, and managers 


// Add a department - Prompted to enter the name of the department and that department is added to the database

// Add a role - Prompted to enter the name, salary, and department for the role and that role is added to the database

// Add an employee - Prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database


// Update an employee role - Prompted to select an employee to update and their new role and this information is updated in the database 


  // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
