// Import packages 
const inquirer = require('inquirer');
const fs = require('fs');


// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter the description for your project'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter the the installation instructions for your project'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter the usage information for your project'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select a license from the list',
        choices: ['MIT', 'ISC', 'Apache', 'Eclipse', 'Mozilla', 'None']
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Enter the usage contribution guidelines for your project'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Enter the usage test instructions for your project'
    },
    {
        type: 'input',
        name: 'questionsEmail',
        message: 'Enter the email address for additional questions'
    },
    {
        type: 'input',
        name: 'questionsGitHub',
        message: 'Enter your GitHub address for additional questions'
    },
];



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


