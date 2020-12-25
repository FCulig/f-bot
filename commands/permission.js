module.exports = {
    name: 'permission',
    description: 'Setup which members can use which commands.',
    guildOnly: true,
    args: true,
    usage: '<action> <command-name> <role-that-can-execute>',
    execute(message, args) {
        if (args.length === 3) {
            console.log(args)

            //https://discordjs.guide/popular-topics/faq.html#how-do-i-check-if-a-guild-member-has-a-certain-role
            let rolemap = message.guild.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(r => r)
                .join(",");
            if (!rolemap) rolemap = "No roles";
            console.log(rolemap);
            return 0;
        }

        message.channel.send('Wrong number of arguments! Usage: **!' + this.name + ' ' + this.usage + '**');
    },
};