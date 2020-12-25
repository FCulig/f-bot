module.exports = {
    name: 'subscribe',
    description: 'Subscribe user to youtube channel',
    guildOnly: true,
    args: true,
    usage: '<channel-url>',
    execute(message, args) {
        console.log(args.length)

        if (args.length == 1) {
            return message.channel.send('User subscribed!');
        }

        message.channel.send('Wrong number of arguments! Usage: **!' + this.name + ' ' + this.usage + '**');
    },
};