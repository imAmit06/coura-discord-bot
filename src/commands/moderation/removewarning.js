const fs = require('fs');
const path = require('path');
const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

const warningsPath = path.join(__dirname, '../../data/warnings.json');

module.exports = {
    name: 'removewarning',
    description: "Removes a warning from a user.",
    options: [
        {
            name: 'user',
            description: 'Mention the user',
            type: ApplicationCommandOptionType.User,
            required: true,

        },
        {
            name: 'warn_id',
            description: 'The warn id of the warnings',
            type: ApplicationCommandOptionType.String,
            required: true,
        },

    ],

    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const targetUser = interaction.options.getUser('user');
        const targetMember = interaction.guild.members.fetch(targetUser.id).catch(() => null);
        const warnId = interaction.options.getString('warn_id');

        const guildId = interaction.guild.id;
        const userId = targetUser.id;

        const warningsData = JSON.parse(fs.readFileSync(warningsPath, 'utf-8'));

        if (!warningsData[guildId] || !warningsData[guildId][userId]) {
            return interaction.editReply(`⚠️ This user has no warnings.`);
        }

        const userWarnings = warningsData[guildId][userId];

        const index = userWarnings.findIndex(w => w.id === warnId);

        if (index === -1) {
            return interaction.editReply(`❌ No warning found with ID \`${warnId}\` for ${targetUser.tag}.`);
        }

        const removedWarning = userWarnings.splice(index, 1)[0];

        
        if (userWarnings.length === 0) {
            delete warningsData[guildId][userId];
        }

        fs.writeFileSync(warningsPath, JSON.stringify(warningsData, null, 2));

        return interaction.editReply(`✅ Removed warning with ID \`${warnId}\` for ${targetUser.tag}.`);

    }
}