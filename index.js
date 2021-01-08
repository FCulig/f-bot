const fs = require('fs');
const Discord = require('discord.js');
const commandUtil = require('./utils/command-util.js');
const permissionUtil = require('./utils/permission-util.js');
const database = require('./database/database.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

database.connect();

const commandFiles = commandUtil.getCommandFileNames();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    try {
        permissionUtil.canInvoke(message, commandName).then(canIvoke => {
            if (canIvoke) {
                command.execute(message, args);
            } else {
                message.reply("You don't have permission to invoke this command.");
            }
        });
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);