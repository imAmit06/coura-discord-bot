const {  ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports =  {
    name: 'ban',
    description: "Bans a user from the server",
   /*  devOnly: Boolean,
    testOnly: Boolean, */
    options: [
        {
            name: 'user',
            description: 'user to ban.',
            required: true,
            type: ApplicationCommandOptionType.User,
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


    callback: async (client, interaction) => {
        const targetUser = interaction.options.getUser('user');
        const targetMember = await interaction.guild.members.fetch(targetUser.id).catch(() => null);
        const banReason = interaction.options.getString('reason') || 'No reason provided.';
        await interaction.deferReply();

        if(!targetMember) {
            return interaction.editReply(`Who you tryna ban? I dont see them in the server... 🙄`);
        }

        if(targetUser.id === interaction.guild.onwerId) {
            return interaction.editReply(`Did you seriously try and ban the owner of the server..?`);
        }

        if(targetUser.id === interaction.user.id) {
            return interaction.editReply(`Why you tryna ban yourself? 🤣`);
        }

        if(targetUser.id === interaction.client.user.id) {
            return interaction.editReply(`Did you just try and ban me..? did i do something wrong? 🥲`);
        }

        if(!targetMember.bannable) {
            return interaction.editReply(`I don't think i can ban this member, recheck my permission...`);
        }

        try {
            await targetMember.send(`You got banned from ${interaction.guild.name} for ${banReason}`);
        } catch (error) {
            
        }

        await targetMember.ban({ banReason });
        const banMessages = [
            `✨ ${targetUser} has been yeeted into the void.`,
            `🚫 ${targetUser} got banned harder than Internet Explorer loading Google.`,
            `💀 ${targetUser} just got *obliterated*.`,
            `🥶 ${targetUser} caught these ban hands.`,
            `☠️ ${targetUser} is now just a memory.`,
            `👋 Say goodbye to ${targetUser}! Don't miss them.`,
            `🧹 ${targetUser} just got swept out of the server.`,
            `🪦 RIP ${targetUser}, banned and forgotten.`,
            `🔨 ${targetUser} just got hammer smashed.`,
            `📦 ${targetUser} has been *permanently shipped out.*`,
            `🚀 ${targetUser} got launched outta here.`,
            `👢 ${targetUser} got kicked into another dimension.`,
            `🕳️ ${targetUser} fell into the ban abyss.`,
            `🎯 ${targetUser} was a moving target... and still got hit.`,
            `🥾 ${targetUser} got the legendary boot.`,
            `📜 Another one bites the dust: ${targetUser}.`,
            `🐍 ${targetUser} got banned faster than a snake slithers.`,
            `💣 ${targetUser} exploded into a ban wave.`,
            `🏴‍☠️ ${targetUser} walked the plank.`,
            `🌪️ ${targetUser} vanished like a weak storm.`,
            `🥷 ${targetUser} got stealth-banned.`,
            `🐸 ${targetUser} couldn't jump out of this ban.`,
            `🎲 Rolled the dice... ${targetUser} lost.`,
            `🛑 ${targetUser}, access DENIED forever.`,
            `🔥 ${targetUser} got roasted AND banned. Double kill.`,
        ];
        const randomBanMessage = banMessages[Math.floor(Math.random() * banMessages.length)];
        interaction.editReply(randomBanMessage);

    }

};