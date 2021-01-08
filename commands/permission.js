const actions = require('../constants/actions.js').actions;
const commandUtil = require('../utils/command-util.js');
const permissionDAO = require('../database/permission.js');

module.exports = {
    name: 'permission',
    description: 'Setup which members can use which commands.',
    guildOnly: true,
    args: true,
    usage: '<add/remove> <action> <command-name> <role-that-can-execute>',
    execute: execute,
};

function execute(message, args) {
    if (args.length === 4) {
        // !permission invoke-command permission @Admin
        if (validArguments(args)) {
            if (args[0] == 'add') {
                permissionDAO.insertPermission(message.channel.guild.id, args[1], args[2], args[3], message);
            } else {
                permissionDAO.deletePermission(message.channel.guild.id, args[1], args[2], args[3], message);
            }
            return 0;
        }

        return message.channel.send("Invalid arguments!");
    }

    message.channel.send('Wrong number of arguments! \nUsage: **!' + this.name + ' ' + this.usage + '**');
}

function validArguments(args) {
    if (args[0] != 'add' && args[0] != 'remove') return false;
    if (!actions.includes(args[1])) return false;
    if (!commandUtil.getCommandNames().includes(args[2])) return false;
    if (!/^<@&.*>$/.test(args[3])) return false;

    return true;
}