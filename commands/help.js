const Discord = require('discord.js');
const commands = require('./../utils/command-util.js')
const embeds = require('./../utils/help-embeds.json');

module.exports = {
    name: 'help',
    description: 'Help me.',
    guildOnly: true,
    args: true,
    usage: '<command-name>',
    execute: execute,
};

function execute(message, args) {
    if (args.length == 0) {
        return message.channel.send(getEmbed(embeds.general));
    } else if (args.length == 1) {
        if (args[0] == 'setup') {
            return message.channel.send(getEmbed(embeds.setup));
        }

        if (commands.getCommandNames().includes(args[0])) {
            return message.channel.send(getEmbed(embeds[args[0]]));
        }

        return message.channel.send("Unknown command **" + args[0] + "**");
    }

    return message.channel.send("Invalid number of arguments for help command.");
}

function getEmbed(content) {
    return new Discord.MessageEmbed()
        .setColor(content.color)
        .setTitle(content.title)
        .setAuthor(content.author, content.image)
        .setDescription(content.description)
        .setThumbnail(content.image)
        .addFields(content.fields)
        .setFooter(content.footer, content.image);
}