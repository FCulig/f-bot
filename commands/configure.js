module.exports = {
    name: 'configure',
    description: 'Configure bot features.',
    guildOnly: true,
    args: true,
    usage: '<action> <value>',
    execute(message, args) {
        if (args.length === 2) {
            console.log(args)
            return 0;
        }

        message.channel.send('Wrong number of arguments! Usage: **!' + this.name + ' ' + this.usage + '**');
    },
};