const fs = require('fs');
const path = require('path');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all bot commands organized by category.',

    callback: async (client, interaction) => {
        const commandsPath = path.join(__dirname, '../');
        const categories = fs.readdirSync(commandsPath).filter(file => fs.statSync(path.join(commandsPath, file)).isDirectory());

        const categoryEmbeds = categories.map(category => {
            const commands = fs.readdirSync(path.join(commandsPath, category)).filter(file => file.endsWith('.js'));
            const fields = commands.map(cmdFile => {
                const command = require(path.join(commandsPath, category, cmdFile));
                return {
                    name: `/${command.name}`,
                    value: command.description || 'No description provided.',
                    inline: false
                };
            });

            return new EmbedBuilder()
                .setTitle(`${category.charAt(0).toUpperCase()+ String(category).slice(1)} Commands`)
                .setColor(0x00AE86)
                .addFields(fields)
                .setFooter({ text: `Category ${categories.indexOf(category) + 1} of ${categories.length}` });
        });

        let currentPage = 0;

        const getButtons = () => new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('prev').setLabel('Previous').setStyle(ButtonStyle.Primary).setDisabled(currentPage === 0),
            new ButtonBuilder().setCustomId('next').setLabel('Next').setStyle(ButtonStyle.Primary).setDisabled(currentPage === categoryEmbeds.length - 1)
        );

        await interaction.reply({ embeds: [categoryEmbeds[currentPage]], components: [getButtons()], ephemeral: true });

        const collector = interaction.channel.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 60_000
        });

        collector.on('collect', async i => {
            if (i.customId === 'prev' && currentPage > 0) currentPage--;
            else if (i.customId === 'next' && currentPage < categoryEmbeds.length - 1) currentPage++;

            await i.update({ embeds: [categoryEmbeds[currentPage]], components: [getButtons()] });
        });

        collector.on('end', async () => {
            try {
                await interaction.editReply({ components: [] });
            } catch (e) {  }
        });
    }
};
