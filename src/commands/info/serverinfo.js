module.exports = {
    name: 'serverinfo',
    description: 'Get information about the server.',

    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const guild = interaction.guild;
        
        const serverInfoEmbed = {
            color: 0x0099ff,
            title: `Server Information`,
            thumbnail: {
                url: guild.iconURL({ dynamic: true }),
            },
            fields: [
                {
                    name: 'Server Name',
                    value: guild.name,
                    inline: true,
                },
                {
                    name: 'Server ID',
                    value: guild.id,
                    inline: true,
                },
                {
                    name: 'Member Count',
                    value: `${guild.memberCount}`,
                    inline: true,
                },
                {
                    name: 'Owner',
                    value: `<@${guild.ownerId}>`,
                    inline: true,
                },
                {
                    name: 'Region',
                    value: guild.preferredLocale,
                    inline: true,
                },
                {
                    name: 'Created At',
                    value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`,
                    inline: true,
                },
                {
                    name: 'Verification Level',
                    value: guild.verificationLevel,
                    inline: true,
                },
                {
                    name: 'Boost Level',
                    value: guild.premiumTier,
                    inline: true,
                },
                {
                    name: 'Boost Count',
                    value: `${guild.premiumSubscriptionCount || 0}`,
                    inline: true,
                },
                {
                    name: 'Roles',
                    value: `${guild.roles.cache.size} roles`,
                    inline: true,
                },
                {
                    name: 'Channels',
                    value: `${guild.channels.cache.size} channels`,
                    inline: true,
                },
                {
                    name: 'Emojis',
                    value: `${guild.emojis.cache.size} emojis`,
                    inline: true,
                },
                {
                    name: 'Features',
                    value: guild.features.length > 0 ? guild.features.join(', ') : 'None',
                    inline: true,
                },
                
            ],
        };
    
        await interaction.editReply({ embeds: [serverInfoEmbed] });
    }
}
