module.exports = (client) => {
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
    }, 100000); // every 10 seconds
};
