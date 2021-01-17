const actions = require('../constants/actions.js').actions;
const configureDAO = require('../database/configuration.js');

module.exports = {
    name: 'configure',
    description: 'Configure bot features.',
    guildOnly: true,
    args: true,
    usage: '<action> <value>',
    execute(message, args) {
        console.log(args);
        if (validArguments(args)) {
            configureDAO.insertConfiguration(message.channel.guild.id, args[0], args[1], message)

            return message.channel.send('Successfully configured ' + args[0]);
        }

        message.channel.send('Wrong number of arguments! Usage: **!' + this.name + ' ' + this.usage + '**');
    },
};

function validArguments(args) {
    if (!actions.configure.includes(args[0])) return false;
    if (!/^<#.*>$/.test(args[1])) return false;

    return true;
}