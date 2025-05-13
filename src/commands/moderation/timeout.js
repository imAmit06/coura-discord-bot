const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: 'timeout',
    description: 'Timeout a user in the server for a specified duration.',
    options: [
        {
            name: 'user',
            description: 'The user to timeout.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'duration',
            description: 'The duration of the timeout (e.g., 1m, 2h, 1d).',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: '1 minute', value: '1m' },
                { name: '5 minutes', value: '5m' },
                { name: '10 minutes', value: '10m' },
                { name: '30 minutes', value: '30m' },
                { name: '1 hour', value: '1h' },
                { name: '2 hours', value: '2h' },
                { name: '6 hours', value: '6h' },
                { name: '12 hours', value: '12h' },
                { name: '1 day', value: '1d' },
            ],
        },
        {
            name: 'reason',
            description: 'Reason for timeout.',
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    permissionRequired: [PermissionFlagsBits.ModerateMembers],
    botPermissions: [PermissionFlagsBits.ModerateMembers],

    callback: async (client, interaction) => {
        const timeoutUser = interaction.options.getUser('user');
        const timeoutDuration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided.';

        const member = interaction.guild.members.cache.get(timeoutUser.id);
        const durationInMs = ms(timeoutDuration);

        if (!member) {
            return interaction.reply({ content: '❌ User not found in the server.', ephemeral: true });
        }

        if (!durationInMs || durationInMs < 5000 || durationInMs > 2.419e9) { // 28 days max
            return interaction.reply({ content: '❌ Duration must be between 5 seconds and 28 days.', ephemeral: true });
        }

        if (member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: '❌ You cannot timeout an administrator.', ephemeral: true });
        }

        if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.user.id !== interaction.guild.ownerId) {
            return interaction.reply({ content: '❌ You cannot timeout a user with a higher or equal role.', ephemeral: true });
        }

        if (member.isCommunicationDisabled()) {
            return interaction.reply({ content: '❌ This user is already timed out.', ephemeral: true });
        }

        try {
            await member.timeout(durationInMs, reason);

            const embed = new EmbedBuilder()
                .setColor(0xffaa00)
                .setTitle('🔇 User Timed Out')
                .addFields(
                    { name: 'User', value: `<@${timeoutUser.id}>`, inline: true },
                    { name: 'Duration', value: timeoutDuration, inline: true },
                    { name: 'Reason', value: reason }
                )
                .setFooter({ text: `Action by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: '❌ I was unable to timeout that user.', ephemeral: true });
        }
    }
};
