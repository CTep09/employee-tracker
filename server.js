// Importing connection to MySql2
const connection = require('./config/connection');

// Importing inquirer and console.table
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Establishing connection with connection.js/Mysql2
connection.connect((error) => {
  if (error) throw error;

  initialPrompt();
})

// Initial User question 
const questions = [
  {
      type: 'list',
      name: 'introChoices',
      message: 'Please select an option from the lists',
      choices: [
          'View all Departments', 
          'View all Roles', 
          'View all Employees', 
          'Add a Department', 
          'Add a Role', 
          'Add an Employee', 
          'Update an Employee Role',
          'Exit'
      ]
  },   
];

const initialPrompt = function () {

  inquirer
    .prompt(questions)
    .then((answer) => {
      console.log(answer);
      // If user answer is equal to all departments, then viewAllDepartments()function will be triggered
        if (answer.introChoices === 'View all Departments') {
          viewAllDepartments();
        } else if (answer.introChoices === 'View all Roles') {
          viewAllRoles();
        } else if (answer.introChoices === 'View all Employees') {
          viewAllEmployees();
        } else if (answer.introChoices === 'Add a Department') {
          addDepartment();
        } else if (answer.introChoices === 'Add a Role') {
          addRole();
        } else if (answer.introChoices === 'Add an Employee') {
          addEmployee();
        } else if (answer.introChoices === 'Update an Employee Role') {
          updateEmployee();
          // If none of the above are met/user selects 'Exit' connection will end
        } else {
          connection.end();
        }
    })

}

// View all departments - table with department names and department ids
  // SELECT * FROM employee_tracker_db.department;
function viewAllDepartments() {
  const sql = 'SELECT * FROM department';

  connection.query(sql, (err, response) => {
    if (err) throw err;

    console.table(response);
    initialPrompt();
  })
} 
  
  // View all roles - table with the job title, role id, department,salary
  // SELECT * FROM employee_tracker_db.role;
function viewAllRoles() {
  console.log("view all roles function")

  initialPrompt();
}


  // View all employees - table with employee ids, first names, last names, job titles, departments, salaries, and managers 
  // SELECT * FROM employee_tracker_db.employee;
function viewAllEmployees() {
  console.log("view all employees function")

  initialPrompt();
}


// Add a department - Prompted to enter the name of the department and that department is added to the database
function addDepartment() {
  console.log("add department function")
// user input 
// connection.query
  inquirer
    .prompt([ 
      {
        type: 'input',
        name: 'newDepartment',
        message: 'What would you like to name the new department?'
      }
    ]) 
    .then((answer) => {
      const sql = 'INSERT INTO department (department_name) VALUES (?)';
      connection.query(sql, answer.newDepartment, (err, response) => {
        if (err) throw err;

        viewAllDepartments();
      })
    })
}

// Add a role - Prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
  console.log("add role function")

  initialPrompt();
}


// Add an employee - Prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  console.log("add employee function")

  initialPrompt();
}


// Update an employee role - Prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployee() {
  console.log("update employee function")

  initialPrompt();
}
