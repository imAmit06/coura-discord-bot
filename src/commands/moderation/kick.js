const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'kicks a user from the server',
    options: [
        {
            name: 'user',
            description: 'user you want to kick',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for the kick',
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
        const kickReason = interaction.options.getString('reason') || 'No reason provided.';
        await interaction.deferReply();


        if(!targetMember) {
            return interaction.reply(`Who you tryna kick? I dont see them in the server... 🙄`);
        }

        if(targetUser.id === interaction.guild.ownerId) {
            return interaction.reply(`Did you seriously try and ban the owner of the server..?`)
        }
        
        if(targetUser.id === interaction.user.id) {
            return interaction.reply(`Why you tryna kick yourself? 🤣`)
        }
        if(targetUser.id === interaction.client.user.id) {
            return interaction.reply(`Did you just try and kick me..? did i do something wrong? 🥲`)
        }
        if(!targetMember.kickable) {
            return interaction.reply(`I don't think i can kick this member, recheck my permission...`)
        }
        try {
            await targetMember.send(`You got kicked from ${interaction.guild.name} for ${kickReason}`);
        } catch (error) {
            
        }
        await targetMember.kick({kickReason});

        const kickMessages = [
            `🚪 ${targetUser} just got a one-way ticket outta here!`,
            `💨 ${targetUser} got kicked so hard they’re still flying!`,
            `👟 Goodbye ${targetUser}, don’t let the door hit you on the way out!`,
            `🫢 ${targetUser} has been yeeted into the void.`,
            `📤 ${targetUser} got kicked like a soccer ball—straight out!`,
            `🥾 ${targetUser} was shown the exit. Politely. Kinda.`,
            `💥 ${targetUser} went boom 💣 out of the server.`,
            `🌪️ ${targetUser} was swept away by the ban hammer’s little cousin.`,
            `🎟️ ${targetUser} got an exclusive pass... out.`,
            `✈️ ${targetUser} took off! With some help from my boot.`,
            `💬 ${targetUser}, you talked the talk. Now walk the plank.`,
            `👋 Bye ${targetUser}! May your next server be less annoyed.`,
            `💅 ${targetUser} got kicked in style. Fashionably late to get banned.`,
            `🧼 ${targetUser} has been cleaned from the server. Sparkly!`,
            `🫳 ${targetUser} just got gently launched. Very gently. Definitely.`,
            `🧾 ${targetUser} has been removed from the guest list.`,
            `🕳️ ${targetUser} fell into the kick dimension. We don't talk about it.`,
            `🫥 ${targetUser} vanished... with a little help.`,
            `🪄 Poof! ${targetUser} is now someone else’s problem.`,
            `📦 ${targetUser} got packaged, labeled, and shipped—far away.`
        ];
        const randomKickMessage = kickMessages[Math.floor(Math.random() * kickMessages.length)];    
        await interaction.editReply(randomKickMessage);
    
    }
}