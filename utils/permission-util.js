const permissionDAO = require('./../database/permission.js');

module.exports = { canInvoke }

async function canInvoke(message, commandName) {
    return permissionDAO.checkPermission(message.channel.guild.id, 'invoke-command', commandName, message).then(val => {
        if (val && val.length > 0) {
            let canInvoke = false;
            val.forEach(permission => {
                if (message.member.roles.cache.find(r => "<@&" + r.id + ">" == permission.role)) {
                    canInvoke = true;
                }
            });

            return canInvoke;
        }
        return true;
    });
}