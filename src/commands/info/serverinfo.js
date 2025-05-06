module.exports = {
    name: 'serverinfo',
    description: 'Get information about the server.',

    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const guild = interaction.guild;
        const serverInfo = {
            name: guild.name,
            id: guild.id,
            owner: await guild.fetchOwner(),
            memberCount: guild.memberCount,
            createdAt: guild.createdAt.toDateString(),
            region: guild.preferredLocale,
            verificationLevel: guild.verificationLevel,
            boostCount: guild.premiumSubscriptionCount || 0,
        };
    
        const embed = {
            color: 0x0099ff,
            title: `Server Information`,
            fields: Object.entries(serverInfo).map(([key, value]) => ({
                name: key.charAt(0).toUpperCase() + key.slice(1),
                value: String(value),
                inline: true,
            })),
        };
    
        await interaction.editReply({ embeds: [embed] });
    }
}
