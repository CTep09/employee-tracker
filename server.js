// Importing connection to MySql2
const connection = require("./config/connection");

// Importing inquirer and console.table
const inquirer = require("inquirer");

// Establishing connection with connection.js/Mysql2
connection.connect((error) => {
  if (error) throw error;

  initialPrompt();
});

// Initial prompt to User
const questions = [
  {
    type: "list",
    name: "introChoices",
    message: "Please select an option from the lists",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Exit",
    ],
  },
];

const initialPrompt = function () {
  inquirer.prompt(questions).then((answer) => {
    console.log(answer);
    // If user answer is equal to all departments, then viewAllDepartments()function will be triggered
    if (answer.introChoices === "View all Departments") {
      viewAllDepartments();
    } else if (answer.introChoices === "View all Roles") {
      viewAllRoles();
    } else if (answer.introChoices === "View all Employees") {
      viewAllEmployees();
    } else if (answer.introChoices === "Add a Department") {
      addDepartment();
    } else if (answer.introChoices === "Add a Role") {
      addRole();
    } else if (answer.introChoices === "Add an Employee") {
      addEmployee();
    } else if (answer.introChoices === "Update an Employee Role") {
      updateEmployee();
      // If none of the above are met/user selects 'Exit' connection will end
    } else {
      connection.end();
    }
  });
};

// View all departments - table with department names and department ids
function viewAllDepartments() {
  // variable created for sql query
  const sql = "SELECT * FROM department";

  // Execute the query to view all departments
  connection.query(sql, (err, response) => {
    if (err) throw err;

    // Creating a table for the response
    console.table(response);

    // Calling initial prompt so user can continue using CMS or Exit
    initialPrompt();
  });
}

// View all roles - table with the job title, role id, department,salary
function viewAllRoles() {
  // variable created for sql query
  const sql = "SELECT * FROM role";

  // Execute the query to view all roles
  connection.query(sql, (err, response) => {
    if (err) throw err;

    console.table(response);

    // Calling initial prompt so user can continue using CMS or Exit
    initialPrompt();
  });
}

// View all employees - table with employee ids, first names, last names, job titles, departments, salaries, and managers
function viewAllEmployees() {
  // Create a variable for sql query to view all from Employees table
  const sql = "SELECT * FROM employee";
  connection.query(sql, (err, response) => {
    if (err) throw err;

    console.table(response);

    initialPrompt();
  });
}

// Add a department - User prompted to enter the name of the department to be added
function addDepartment() {
  inquirer
    // Prompt for user to enter new department name
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What would you like to name the new department?",
      },
    ])
    .then((answer) => {
      const sql = "INSERT INTO department (department_name) VALUES (?)";
      connection.query(sql, answer.newDepartment, (err, response) => {
        if (err) throw err;

        viewAllDepartments();
      });
    });
}

// Add a role - User prompted to enter the name, salary, and department for the role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "What would you like to name the new role?",
      },
      {
        type: "input",
        name: "newSalary",
        message: "What is the role salary?",
      },
      {
        type: "list",
        name: "departmentName",
        message: "Which department is this role in?",
        choices: [
          "Behavior Analysis Unit",
          "Forensic Psychology",
          "Information Technology",
          "Investigative Support",
          "Operational Support",
        ],
      },
    ])
    .then((answer) => {
      // Get the department ID based on the department name provided by the user
      const getDeptId = "SELECT id FROM department WHERE department_name = ?";

      connection.query(getDeptId, answer.departmentName, (err, results) => {
        // If there's an error, throw an error
        if (err) throw err;

        // Insert new role with corresponding department Id
        const insertRoleQuery =
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";

        // Get the department Id from the results of previous query
        const departmentID = results[0].id;

        // Define values to be inserted into new role
        const roleValues = [answer.newRole, answer.newSalary, departmentID];

        // Execute the query to insert the new role
        connection.query(insertRoleQuery, roleValues, (err) => {
          if (err) throw err;

          // If successful, console log success message with new role title
          console.log(`New role ${answer.newRole} added to the database`);

          // Call viewAllRoles function so the user can see the addition
          viewAllRoles();
        });
      });
    });
}

// Add an employee - Prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  // Prompt user for employee details
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: [
          "Supervisory Special Agent",
          "Special Agent",
          "Forensic Psychologist",
          "IT Specialist",
          "Investigative Analyst",
          "Administrative Assistant",
        ],
      },
      {
        name: "manager",
        type: "list",
        message: "Who will be the employee's manager?",
        choices: [
          "Aaron Hotchner",
          "Emily Prentiss",
          "Derek Morgan",
          "Spencer Reid",
          "Jennifer Jareau",
          "Penelope Garcia",
          "David Rossi",
          "Ashley Seaver",
          "Alex Blake",
          "Kate Callahan",
          "Tara Lewis",
          "Luke Alvez",
          "Matt Simmons",
        ],
      },
    ])
    .then(function (answer) {
      // Get the department ID based on the department name provided by the user
      const getRoleId = "SELECT id FROM role WHERE title = ?";
      connection.query(getRoleId, [answer.role], function (err, res) {
        if (err) throw err;

        const role_id = res[0].id;

        // Get manager ID based on which manager the user selects
        const managerName = answer.manager.split(" ");
        // Split into two different variables to identify id
        const manager_first = managerName[0];
        const manager_last = managerName[1];

        // sql query to identify id for selected manager
        const mgrInfo =
          "SELECT id FROM employee WHERE first_name = ? AND last_name = ?";
        connection.query(
          mgrInfo,
          [manager_first, manager_last],
          function (err, res) {
            if (err) throw err;
            const manager_id = res[0].id;

            // Insert the new employee data into employee table
            const newEmp = "INSERT INTO employee SET ?";
            connection.query(
              newEmp,
              {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: role_id,
                manager_id: manager_id,
              },
              function (err, res) {
                if (err) throw err;
                console.log("Employee added successfully!");

                // Call function to view all employees table with new addition
                viewAllEmployees();
              }
            );
          }
        );
      });
    });
}

// Update an employee role - Prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployee() {
  inquirer
    .prompt([
      {
        name: "updateEmployee",
        type: "list",
        message: "Select an employee to update",
        choices: [
          "Aaron Hotchner",
          "Emily Prentiss",
          "Derek Morgan",
          "Spencer Reid",
          "Jennifer Jareau",
          "Penelope Garcia",
          "David Rossi",
          "Ashley Seaver",
          "Alex Blake",
          "Kate Callahan",
          "Tara Lewis",
          "Luke Alvez",
          "Matt Simmons",
        ],
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's new role?",
        choices: [
          "Supervisory Special Agent",
          "Special Agent",
          "Forensic Psychologist",
          "IT Specialist",
          "Investigative Analyst",
          "Administrative Assistant",
        ],
      },
    ])
    .then(function (answer) {
      const getRoleId = "SELECT id FROM role WHERE title = ?";
      connection.query(getRoleId, [answer.role], function (err, res) {
        if (err) throw err;
        const role_id = res[0].id;

        const empName = answer.updateEmployee.split(" ");
        const employee_first = empName[0];
        const employee_last = empName[1];

        const employeeInfo =
          "SELECT id FROM employee WHERE first_name = ? AND last_name = ?";
        
          connection.query(
          employeeInfo,
          [employee_first, employee_last],
          function (err, res) {
            if (err) throw err;
            const employee_id = res[0].id;

            const updateRole = "UPDATE employee SET role_id = ? WHERE id = ?";
            connection.query(
              updateRole,
              [role_id, employee_id],
              function (err, res) {
                if (err) throw err;
                console.log("Employee Role successfully updated");
                viewAllEmployees();
              }
            );
          }
        );
      });
    });
}
