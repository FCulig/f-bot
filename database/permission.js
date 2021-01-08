const database = require('./database.js');

module.exports = { insertPermission, deletePermission, checkPermission };

async function insertPermission(guildID, action, command, role, message) {
    return database.executeQuery("INSERT INTO permissions (guildID, action, command, role) VALUES( ?, ?, ?, ? )", [guildID, action, command, role], message);
}

async function deletePermission(guildID, action, command, role, message) {
    return database.executeQuery("DELETE FROM permissions WHERE guildID = ? and action = ? and command = ? and role = ?", [guildID, action, command, role], message);
}

async function checkPermission(guildID, action, command, message) {
    return database.executeQuery("SELECT * FROM permissions WHERE guildID = ? and action = ? and command = ?", [guildID, action, command], message);
}
