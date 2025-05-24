const fs = require('fs');
const path = require('path');
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

const warningsPath = path.join(__dirname, '../../data/warnings.json');

// Ensure the file exists
if (!fs.existsSync(warningsPath)) {
    fs.writeFileSync(warningsPath, JSON.stringify({}));
}

// Function to generate a unique ID
function generateUniqueWarningId(existingWarnings) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id;

    do {
        id = '';
        for (let i = 0; i < 8; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    } while (existingWarnings.some(w => w.id === id));

    return id;
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

        const userWarnings = warningsData[guildId][userId];
        const warningId = generateUniqueWarningId(userWarnings);

        userWarnings.push({
            id: warningId,
            reason,
            date: new Date().toISOString(),
            mod: interaction.user.tag,
        });

        fs.writeFileSync(warningsPath, JSON.stringify(warningsData, null, 2));

        const warningMessages = [
            `🚫 ${targetUser}, congratulations! You've won a shiny new warning. 🏅`,
            `⚠️ ${targetUser}, the mod squad just handed you a warning with style. 💅`,
            `📢 Attention ${targetUser}: You’ve officially been bonked. Reason: ${reason}`,
            `😬 Oops! ${targetUser}, you’ve triggered the wrath of the rulebook. Warning issued!`,
            `🧽 ${targetUser}, clean up your act. This is your warning sponge 🧼`,
            `📉 ${targetUser}, your behavior just took a dip. Here's a warning to help it recover.`,
            `🎯 ${targetUser}, you aimed… and missed. Warning fired!`,
            `💌 ${targetUser}, love from the mods: it's a warning letter ❤️`,
            `🔥 ${targetUser}, that take was too hot for this server. Here’s a cooldown warning.`,
            `🧠 ${targetUser}, use it or lose it. Warning time.`,
            `🥴 ${targetUser}, even the bot had to sigh. Warning delivered.`,
            `🤖 ${targetUser}, the warning gods have spoken. Don’t test fate again.`,
            `📦 ${targetUser}, a fresh warning just got delivered straight to your inbox. Signed: the mods.`,
            `🔇 ${targetUser}, next stop: timeout town. This is your last pitstop warning.`,
            `🧃 ${targetUser}, sip some chill juice. Warning earned.`,
            `👀 ${targetUser}, we've got eyes everywhere. Warning noted.`,
            `🐸 ${targetUser}, not cool. You’ve been warned. But carry on 🐸☕`,
            `🎟️ ${targetUser}, your ticket to the warning club has been validated.`,
            `🗣️ ${targetUser}, keep talking and this bot’s gonna turn into Judge Judy. Here’s a warning.`,
            `🚨 ${targetUser}, don’t make me turn this server around! Warning issued.`
        ];

        const randomWarningMessage = warningMessages[Math.floor(Math.random() * warningMessages.length)];

        await interaction.reply(`${randomWarningMessage}`);
    }
};
