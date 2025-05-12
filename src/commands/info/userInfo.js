const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Get information about a user.',
    options: [
        {
            name: 'user',
            description: 'The user to get information about.',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],

    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const targetUser = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(targetUser.id) || await interaction.guild.members.fetch(targetUser.id);

        const statusMap = {
            online: '🟢 Online',
            idle: '🌙 Idle',
            dnd: '⛔ Do Not Disturb',
            offline: '⚫ Offline',
        };

        const userInfoEmbed = {
            color: 0x00aaff,
            title: 'User Information',
            thumbnail: {
                url: targetUser.displayAvatarURL({ dynamic: true }),
            },
            fields: [
                {
                    name: 'Username',
                    value: targetUser.username,
                    inline: true,
                },
                {
                    name: 'User ID',
                    value: targetUser.id,
                    inline: true,
                },
                {
                    name: 'Account Created',
                    value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:R>`,
                    inline: true,
                },
                {
                    name: 'Joined Server',
                    value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`,
                    inline: true,
                },
                {
                    name: 'Roles',
                    value: member.roles.cache.size > 1
                        ? member.roles.cache
                              .filter(role => role.id !== interaction.guild.id)
                              .map(role => role.toString())
                              .join(', ')
                        : 'No roles',
                    inline: false,
                },
                {
                    name: 'Status',
                    value: statusMap[member.presence?.status || 'offline'],
                    inline: true,
                },
                {
                    name: 'Activity',
                    value: member.presence?.activities[0]?.name || 'None',
                    inline: true,
                },
                {
                    name: 'Bot',
                    value: targetUser.bot ? 'Yes' : 'No',
                    inline: true,
                },
                {
                    name: 'Avatar URL',
                    value: `[Click Here](${targetUser.displayAvatarURL({ dynamic: true })})`,
                    inline: false,
                },
            ],
        };

        await interaction.editReply({ embeds: [userInfoEmbed] });
    },
};
