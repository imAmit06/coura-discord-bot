require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
        ],
});

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
    if(message.author.bot) {
        return;
    }
    if (message.content === "hello") {
        message.reply(`hello`);
    }
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number')?.value;
        const num2 = interaction.options.get('second-number')?.value;

        const responses = [
            `Can't even do this easy math? The answer is`,
            `Damn, you really asking me? It's`,
            `I gotchu, but wow... it's`,
            `Seriously? You needed help with this? Here's your answer:`,
            `Let me bless you with this answer:`,
            `Math? Again? Fine. It's`,
            `What am I, your calculator? It's`,
            `Bro... it’s just addition 😐 The result is`,
            `This better be for a good reason. Anyway, it's`,
            `At this point, I deserve a raise. Here's your number:`,
            `I'm not mad, just disappointed. It's`,
            `This is child's play. Here's your sum:`,
            `Fine. But next time, try it yourself. The answer is`,
            `Quick maths coming up! It's`,
            `Even a potato could’ve done this. It's`,
            `Here you go, genius:`,
            `As you wish, math master 🙄 The answer is`,
            `You’re lucky I’m smart. It's`,
            `Is this really the best use of my talents? Whatever, it's`,
            `Numbers don’t lie. Unlike you asking for help again. It's`
        ];
        const randomMessage = responses[Math.floor(Math.random() * responses.length)];

        interaction.reply(`${randomMessage} ${num1 + num2}.`);
    }
})


client.login(process.env.BOT_TOKEN);

