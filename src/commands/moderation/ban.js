const {  ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports =  {
    name: 'ban',
    description: "Bans a user from the server",
   /*  devOnly: Boolean,
    testOnly: Boolean, */
    options: [
        {
            name: 'target-user',
            description: 'user to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: `reason for the user's ban`,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionRequired: [
        PermissionFlagsBits.Administrator
    ],
    
    botPermissions: [
        PermissionFlagsBits.Administrator
    ],


    callback: (client, interaction) => {
        interaction.reply('Oops...this command is still in the works...');
    }

};