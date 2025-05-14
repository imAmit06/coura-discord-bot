const fs = require('fs');
const path = require('path');
const { ChannelType, ApplicationCommandType, PermissionFlagsBits } = require('discord.js');

const welcomePath = path.join(__dirname, '../../data/welcomeChannel.json');

// Ensure the file exists
if (!fs.existsSync(welcomePath)) {
    fs.writeFileSync(welcomePath, JSON.stringify({}));
}

module.exports = {
    name: 'setwelcome',
    description: 'Setup the welcome message for your server.',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: PermissionFlagsBits.Administrator,

    callback: async (client, interaction) => {
        await interaction.reply({
            content: 'Let’s set up your welcome system. Please answer the next questions here!',
            ephemeral: true
        });

        const filter = msg => msg.author.id === interaction.user.id;
        const channel = interaction.channel;

        const ask = async (question) => {
            await channel.send(question);
            try {
                const collected = await channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] });
                return collected.first().content;
            } catch {
                await channel.send('❌ Setup timed out. Please run the command again.');
                throw 'timeout';
            }
        };

        try {
            const askChannel = await ask('📢 Please mention the channel where welcome messages should be sent (e.g., #general):');
            const mentionedChannel = interaction.guild.channels.cache.get(askChannel.replace(/[<#>]/g, ''));
            if (!mentionedChannel || mentionedChannel.type !== ChannelType.GuildText) {
                return channel.send('❌ Invalid channel. Setup cancelled.');
            }

            const message = await ask('💬 What welcome message should I send? You can use `{user}` to mention the user.');
            const isEmbedResponse = await ask('🖼️ Do you want the message to be sent as an embed? (yes/no)');

            const welcomeData = JSON.parse(fs.readFileSync(welcomePath, 'utf-8'));
            welcomeData[interaction.guild.id] = {
                channelId: mentionedChannel.id,
                message: message,
                isEmbed: isEmbedResponse.toLowerCase().startsWith('y')
            };

            fs.writeFileSync(welcomePath, JSON.stringify(welcomeData, null, 2));

            await channel.send('✅ Welcome message setup completed successfully!');
        } catch (err) {
            if (err !== 'timeout') console.error(err);
        }
    }
};
