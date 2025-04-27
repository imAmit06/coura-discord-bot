const { EmbedBuilder } = require("@discordjs/builders");

module.exports = async (client) => {
    console.log(`✅ ${client.user.tag} is online.`);

    const activities = [
        { getName: () => `over ${client.guilds.cache.size} messy servers`, type: 3 }, // Watching
        { getName: () => `${client.users.cache.size} chaotic users`, type: 0 }, // Playing
        { getName: () => `you code me`, type: 3 }, // Watching
        { getName: () => `judging ${client.users.cache.size} users`, type: 2 }, // Listening
        { getName: () => `the fall of ${client.guilds.cache.size} servers`, type: 3 },
        { getName: () => `chaos unfold`, type: 2 },
        { getName: () => `the dev stress out`, type: 3 },
        { getName: () => `🧠 ${client.users.cache.size} brain cells`, type: 0 },
        { getName: () => `to ${client.guilds.cache.size} group chats`, type: 2 },
    ];

    let i = 0;
    setInterval(() => {
        const activity = activities[i % activities.length];
        client.user.setActivity(activity.getName(), { type: activity.type });
        i++;
    }, 100000); 

    try {
        const channelId = '1365956692508151830';
        const reportChannel = await client.channels.fetch(channelId).catch(console.error);

        if (!reportChannel) {
            console.error(`❌ Channel ${channelId} not found or inaccessible`);
            return;
        }

        // Verify channel is text-based
        if (!reportChannel.isTextBased()) {
            console.error(`❌ Channel ${channelId} is not a text channel`);
            return;
        }

        // Verify permissions
        const permissions = reportChannel.permissionsFor(client.user);
        if (!permissions.has(['ViewChannel', 'SendMessages', 'EmbedLinks'])) {
            console.error(`❌ Missing permissions in channel ${channelId}`);
            return;
        }

        // Build embed
        const onlineEmbed = new EmbedBuilder()
            .setTitle('🤖 I\'m Online...')
            .setDescription(`I'm currently in ${client.guilds.cache.size} servers\nand I am looking over ${client.users.cache.size} users...`)
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(0x00FF00);

        // Send message with additional verification
        const sentMessage = await reportChannel.send({ 
            embeds: [onlineEmbed],
            content: ' ' // Space as fallback content
        });

        console.log(`📢 Online message sent to ${reportChannel.name}`);

    } catch (error) {
        console.error('‼️ Critical error in ready event:', error);
    }
};
