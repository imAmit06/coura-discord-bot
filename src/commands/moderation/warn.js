const fs = require('fs');
const path = require('path');
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

const warningsPath = path.join(__dirname, '../../data/warnings.json');


if (!fs.existsSync(warningsPath)) {
    fs.writeFileSync(warningsPath, JSON.stringify({}));
}

module.exports = {
    name: 'warn',
    description: 'Warn a user and keep a local record.',
    options: [
        {
            name: 'user',
            description: 'User to warn',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'reason',
            description: 'Reason for warning',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    permissionRequired: [PermissionFlagsBits.ModerateMembers],
    botPermissions: [PermissionFlagsBits.ModerateMembers],

    callback: async (client, interaction) => {
        const targetUser = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided.';
        const guildId = interaction.guild.id;
        const userId = targetUser.id;

        
        const warningsData = JSON.parse(fs.readFileSync(warningsPath, 'utf-8'));

       
        if (!warningsData[guildId]) warningsData[guildId] = {};
        if (!warningsData[guildId][userId]) warningsData[guildId][userId] = [];

        warningsData[guildId][userId].push({
            reason,
            date: new Date().toISOString(),
            mod: interaction.user.tag,
        });

        
        fs.writeFileSync(warningsPath, JSON.stringify(warningsData, null, 2));

        await interaction.reply(`⚠️ ${targetUser.tag} has been warned.\n**Reason:** ${reason}`);
    }
};
