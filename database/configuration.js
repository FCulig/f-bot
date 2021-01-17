const database = require('./database.js');

module.exports = { insertConfiguration };

async function insertConfiguration(guildID, action, value, message) {
    return database.executeQuery("INSERT INTO configurations (guildID, action, value) VALUES( ?, ?, ?)", [guildID, action, value], message);
}