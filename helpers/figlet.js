// Figlet creates logo for the application
const figlet = require("figlet");

function generateLogo(cb) {
    
    figlet("Modes", function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        cb(data);
    });
}

module.exports = generateLogo;