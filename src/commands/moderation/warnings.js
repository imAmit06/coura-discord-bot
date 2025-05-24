const { ApplicationCommandOptionType, PermissionFlagsBits, Embed, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const warnFilePath = path.resolve(__dirname, "./../../data/warnings.json");

function loadWarns() {
    if (!fs.existsSync(warnFilePath)) {
        fs.writeFileSync(warnFilePath, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(warnFilePath, "utf-8"));
}

module.exports = {
    name: 'warnings',
    description: 'View the warnings of a user.',
    options: [
        {
            name: 'user',
            description: 'User to view warnings for',
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    permissionRequired: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.ManageMessages],

    callback: async (client, interaction) => {
        const targetUser = interaction.options.getUser('user');
        const guildId = interaction.guild.id;
        const userId = targetUser.id;

        const warnsData = loadWarns();

        if (!warnsData[guildId] || !warnsData[guildId][userId] || warnsData[guildId][userId].length === 0) {
            return interaction.reply(`✅ ${targetUser.tag} has no warnings.`);
        }

        const userWarns = warnsData[guildId][userId];
        let warnList = "";

        userWarns.forEach((warn, index) => {
            warnList += `\n**${index + 1}.** ❗️Reason: ${warn.reason} — *by ${warn.mod}* (ID: \`${warn.id}\`)`;
        });

        const warningsEmbed = new EmbedBuilder()
            .setTitle(`Warnings for ${targetUser.tag}`)
            .setDescription(warnList || `I don't see any warnings for ${targetUser.tag}.`)
            .setColor('#FF0000')
            .setTimestamp()
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))

        await interaction.reply({
            embeds: [warningsEmbed],
            ephemeral: true 
        });
    }
};
