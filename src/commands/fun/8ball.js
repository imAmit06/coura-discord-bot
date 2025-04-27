const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: '8ball',
    description: "Ask the mystical 8ball a question!",
    options: [
        {
            name: 'task',
            description: 'What do you want to ask the 8ball?',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async (client, interaction) => {

        const eightballResponse = [
            "Absolutely yes 🔮",
            "Nope, not happening 🙅‍♂️",
            "Ask me later, I’m busy sipping code ☕",
            "Definitely... in another universe 🌌",
            "You already know the answer 😏",
            "I wouldn’t bet on it 🎲",
            "Sure, why not? 🤷",
            "Signs point to yes ✨",
            "That’s a strong maybe 🧐",
            "Do you even have to ask? Of course!",
            "No, just no 😬",
            "Trust your instincts... or don’t 🤔",
            "Try again when Mercury isn't in retrograde 🌙",
            "Outlook not so good ☁️",
            "Yes, but only if you bring snacks 🍿"
        ];

        const randomResponse = eightballResponse[Math.floor(Math.random() * eightballResponse.length)];

        await interaction.reply(`🎱 ${randomResponse}`);
    },
};
