// Import packages 
const inquirer = require('inquirer');

// presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

// Create an array of questions for user input
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
            'Update an Employee Role'
        ]
    },   
];

const initialPrompt = function () {

    return inquirer.prompt(questions)
        .then((answer) => {
            if (answer.choices === 'View all Departments') {
                viewAllDepartments();
            } else if (answer.choices === 'View all Roles') {
                viewAllRoles();
            }
        })

}


// // function to write README file
// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, data, function (error) {
//         if (error) {
//             console.error("Error writing to file: ", error);
//         } else {
//             console.log('Success!');
//         }
//     });
// }

// // function to initialize app
// function init() {
//     inquirer.prompt(questions)
//         .then((response) => {
//             // console.log(response);
//             const markdownContent = generateMarkdown(response);
//             writeToFile('README1.md', markdownContent)
//         })

// }

// Function call to initialize app
init();


