require('dotenv').config();
const { Routes, ApplicationCommandOptionType } = require('discord.js');
const { REST } = require('@discordjs/rest');


const commands = [
    {
        name: "add",
        description: "adds two numbers",
        options: [
            {
                name: 'first-number',
                description: 'the first number.',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: 'second-number',
                description: 'the second number.',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
        ]
    },
    {
        name: "embed",
        description: "embeds a message",
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID, 
                process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Slash commands were registered.'); 
    } catch (error) {
        console.log(error);
    }
})();