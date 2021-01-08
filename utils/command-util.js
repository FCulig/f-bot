const fs = require('fs');

module.exports = { getCommandFileNames, getCommandNames }

function getCommandFileNames() {
    return fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
}

function getCommandNames() {
    let commands = [];
    getCommandFileNames().forEach(fileName => { commands.push(fileName.slice(0, -3))  });

    return commands;
}
