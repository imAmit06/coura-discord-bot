require('dotenv').config();
module.exports = {
    name: 'fact',
    description: "Knowledge is power! Here are some fun facts to impress your friends.",

    callback: async (client, interaction) => {
        const randomColor = Math.floor(Math.random() * 0xFFFFFF);
        await interaction.deferReply();
        try {
            const randomApiFacts = await fetch('https://api.api-ninjas.com/v1/facts', {
            method: 'GET',
            headers: {
                'X-Api-Key': process.env.NINJA_API_KEY,
            }
        });
        if(!randomApiFacts.ok) {
            throw new Error(`HTTP error! Status: ${randomApiFacts.status}`);
        }
        const data = await randomApiFacts.json();
            const factEmbed = {
                color: randomColor,
                title: '📚 Random Fact',
                description: data[0].fact,
                footer: {
                    text: 'Source: api.api-ninjas.com',
                },
            };

            await interaction.editReply({ embeds: [factEmbed] });
        } catch (error) {
            console.error('Error fetching fact:', error);
            await interaction.editReply(`Looks like I can't share a fact at this moment. Maybe try again?..`);
            
        }
    }
}