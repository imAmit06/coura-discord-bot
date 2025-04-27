const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'roast',
    description: 'Roast yourself or another user!',
    options: [
        {
            name: 'user',
            description: 'Mention a user you want to roast',
            required: false,
            type: ApplicationCommandOptionType.User, // Must be 'User', not 'Mentionable'
        },
    ],
    callback: async ( client, interaction ) => { // <--- DESTRUCTURING
        const targetUser = interaction.options.getUser('user') ?? interaction.user;

        const roastMessages = [
            // Classic Burns
            "You're the reason the gene pool needs a lifeguard.",
            "If ignorance is bliss, you must be orgasmic.",
            "I'd call you a tool, but at least tools are useful.",
            "You're like a broken pencil—pointless.",
            "Your face makes onions cry.",
            "You're not stupid, you just have bad luck thinking.",
            "You're the human equivalent of a '404 Error'.",
            "I'd agree with you but then we'd both be wrong.",
        
            // Dark Humor Edition
            "You’re so useless, even your shadow left you.",
            "If laughter is the best medicine, your face must be curing diseases.",
            "You’re like a cemetery—people avoid you out of respect.",
            "I’d ask how your day is going, but I don’t care and neither does anyone else.",
            "You’re the reason some animals eat their young.",
            "You’re like a haunted house—full of creeps and nobody wants to stay.",
            "If you were a vegetable, you’d be a ‘turnip’ for the worse.",
            "Your birth certificate is an apology letter from the condom factory.",
        
            // Savage AF
            "You’re so dense, light bends around you.",
            "You’re like a participation trophy—no one wanted you, but here you are.",
            "You’re the reason why ‘block user’ exists.",
            "You’re like a vending machine—takes forever and sometimes doesn’t work.",
            "You’re not stupid, you just have bad luck when forming thoughts.",
            "You’re like a pop-up ad—unwanted and annoying.",
            "You’re the reason why ‘delete history’ was invented.",
            "You’re not ugly, you’re just… not attractive.",
        
            // Existential Dread Roasts
            "You’re like a background character in your own life.",
            "If you were a Sims character, you’d be stuck in the pool without a ladder.",
            "You’re the reason why ‘skip ad’ was invented.",
            "You’re like a loading screen—everyone waits for you to disappear.",
            "You’re not boring, you’re just in standby mode.",
            "You’re like a bad sequel—nobody asked for you.",
            "You’re the reason why ‘mute’ exists.",
            "You’re not wrong, you’re just not right either.",
        
            // Bonus: Unholy Tier (Use with caution)
            "You’re so unlucky, if you fell in a river, you’d emerge with a dry face.",
            "You’re like a reverse lottery—everyone wins except you.",
            "You’re the reason why ‘abort mission’ is a phrase.",
            "You’re like a free trial—disappointing and expires quickly.",
            "You’re not a clown, you’re the entire circus—bankrupt and on fire.",
            "You’re the reason why ‘Do Not Resuscitate’ orders exist.",
            "You’re like a horror movie—painful to watch but people laugh anyway.",
            "You’re not dead weight, you’re just… dead."
        ];

        const randomRoast = roastMessages[Math.floor(Math.random() * roastMessages.length)];

        await interaction.reply(`${targetUser}, ${randomRoast}`);
    },
};
