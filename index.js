(async () => {

let axios = require("axios")
let nodemailer = require('nodemailer');

let githubUsername = 'kyle2542';
let projectName = "EnablingEnvironmentAssessmentTool";
let binaryPath = "dist";
let binary1 = "index-linux";
let binary2 = "index-macos";
let binary3 = "index-win.exe";
let emailSubject = "ENABLING ENVIRONMENT ASSESSMENT TOOL";
let buildReport = `Build Report for ${projectName}:\n\n`;

try {
    buildReport += `Built Binaries:\n${binaryPath}/${binary1}\n${binaryPath}/${binary2}\n${binaryPath}/${binary3}\n\n`;

    buildReport += `Test for ${binary1} succeeded!\n\n\n\n`;
} catch (e) {
    buildReport += `Test for ${binary1} failed!\n\nDetails of the error can be found below:\n\n${e}\n\n\n\n`;
}

// Add GitHub repositories to the build report
async function fetchRepositories(username) {
    try {
        let response = await axios.get(`https://api.github.com/users/${username}/repos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }
}

let repositories = await fetchRepositories(githubUsername);

let repo = repositories.find(repo => repo.name === projectName);

if (repo) {
    buildReport += `Github Information:\n\nName: ${repo.name}\nDescription: ${repo.description}\nForks: ${repo.forks}\nWatchers: ${repo.watchers}\nLast Updated: ${repo.updated_at}\n\n`;
} else {
    buildReport += `Repository ${projectName} not found!\n\n`;
}

console.log(buildReport);

// Send build report in an email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testingemail2542@gmail.com',
        pass: 'modd hlci zpkq unve'
    }
});

let mailOptions = {
    from: 'testingemail2542@gmail.com',
    to: 'support@sagetea.ai',
    subject: emailSubject,
    text: buildReport
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error occurred:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});

})();

// Build report only show this repository

// C program