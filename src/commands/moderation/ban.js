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
        const targetMember = interaction.guild.members.fetch(targetUser.id).catch(() => null);
        const banReason = interaction.options.getString('reason') || 'No reason provided.';

        if(!targetMember) {
            return interaction.reply(`Who you tryna ban? I dont see them in the server... 🙄`);
        }

        if(targetUser.id === interaction.guild.onwerId) {
            return interaction.reply(`Did you seriously try and ban the owner of the server..?`);
        }

        if(targetUser.id === interaction.user.id) {
            return interaction.reply(`Why you tryna ban yourself? 🤣`);
        }

        if(targetUser.id === interaction.client.user.id) {
            return interaction.reply(`Did you just try and ban me..? did i do something wrong? 🥲`);
        }

        if(!targetMember.bannable) {
            return interaction.reply(`I don't think i can ban this member, recheck my permission...`);
        }

        try {
            await targetMember.send(`You got banned from ${interaction.guild.name} for ${banReason}`);
        } catch (error) {
            
        }

        await targetMember.ban({ banReason });
        const banMessages = [
            `✨ ${targetUser.tag} has been yeeted into the void.`,
            `🚫 ${targetUser.tag} got banned harder than Internet Explorer loading Google.`,
            `💀 ${targetUser.tag} just got *obliterated*.`,
            `🥶 ${targetUser.tag} caught these ban hands.`,
            `☠️ ${targetUser.tag} is now just a memory.`,
            `👋 Say goodbye to ${targetUser.tag}! Don't miss them.`,
            `🧹 ${targetUser.tag} just got swept out of the server.`,
            `🪦 RIP ${targetUser.tag}, banned and forgotten.`,
            `🔨 ${targetUser.tag} just got hammer smashed.`,
            `📦 ${targetUser.tag} has been *permanently shipped out.*`,
            `🚀 ${targetUser.tag} got launched outta here.`,
            `👢 ${targetUser.tag} got kicked into another dimension.`,
            `🕳️ ${targetUser.tag} fell into the ban abyss.`,
            `🎯 ${targetUser.tag} was a moving target... and still got hit.`,
            `🥾 ${targetUser.tag} got the legendary boot.`,
            `📜 Another one bites the dust: ${targetUser.tag}.`,
            `🐍 ${targetUser.tag} got banned faster than a snake slithers.`,
            `💣 ${targetUser.tag} exploded into a ban wave.`,
            `🏴‍☠️ ${targetUser.tag} walked the plank.`,
            `🌪️ ${targetUser.tag} vanished like a weak storm.`,
            `🥷 ${targetUser.tag} got stealth-banned.`,
            `🐸 ${targetUser.tag} couldn't jump out of this ban.`,
            `🎲 Rolled the dice... ${targetUser.tag} lost.`,
            `🛑 ${targetUser.tag}, access DENIED forever.`,
            `🔥 ${targetUser.tag} got roasted AND banned. Double kill.`,
        ];
        const randomBanMessage = banMessages[Math.floor(Math.random() * banMessages.length)];
interaction.reply(randomBanMessage);

        
        interaction.reply(`${randomBanMessage}`);
    }

};