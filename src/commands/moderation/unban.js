const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unbans a user from the server',
    options: [
        {
            name: 'user',
            description: 'user you want to unban',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for the unban',
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
        const unbanReason = interaction.options.getString('reason') || 'No reason provided.';
        await interaction.deferReply();

        if (targetUser.id === interaction.guild.ownerId) {
            return interaction.editReply(`Did you seriously try and unban the owner of the server..?`);
        }

        if (targetUser.id === interaction.user.id) {
            return interaction.editReply(`Why you tryna unban yourself? 🤣`);
        }

        if (targetUser.id === interaction.client.user.id) {
            return interaction.editReply(`Don't unban me, I'm just a bot!`);
        }

        const unbanMessages = [
            `🔓 ${targetUser} has been released from the shadow realm!`,
            `🕊️ ${targetUser} is free… for now.`,
            `🎩 Welcome back ${targetUser}, don't mess it up this time.`,
            `💫 ${targetUser} has been resurrected from the ban graveyard.`,
            `🧼 ${targetUser} has been scrubbed clean and unbanned.`,
            `🕳️ ${targetUser} has crawled out of the abyss of bans.`,
            `😈 ${targetUser} is back… chaos incoming.`,
            `🫡 ${targetUser} served their time. Freedom granted.`,
            `🗝️ Unlocked: ${targetUser} is back in the game.`,
            `📜 The ban on ${targetUser} has been revoked. Temporarily.`,
            `🥸 ${targetUser} is back. Let’s pretend that never happened.`,
            `👻 ${targetUser} is no longer a ghost of the server.`,
            `🎭 ${targetUser} gets a second chance. Let the drama resume!`,
            `🌈 Forgiveness is divine. ${targetUser} has returned.`,
            `📦 ${targetUser} was returned by UPS. Guess we have to keep them.`,
            `💌 ${targetUser} has been invited back into the chaos.`,
            `🚫❌ Ban undone. ${targetUser} reloaded.`,
            `🧙 Unbanned with magic. ${targetUser}, use your powers wisely.`,
            `👋 ${targetUser} has re-entered the chat.`,
            `🪄 Poof! ${targetUser} is no longer banned. Plot twist?`
        ];
        
        const randomUnbanMessage = unbanMessages[Math.floor(Math.random() * unbanMessages.length)];
        

        try {
            await interaction.guild.members.unban(targetUser.id, unbanReason);
            await interaction.editReply(`${randomUnbanMessage}`);
        } catch (error) {
            console.log(`Error unbanning user: ${error}`);
            return interaction.editReply(`I couldn't unban this user, something went wrong.`);
            
        }
    }
}