const { testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const applicationCommands = require('../../utils/getApplicationCommands');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

module.exports = async (client) => {
    const localCommands = getLocalCommands();

    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);

        for(const localCommand of localCommands) {
            const {name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );
            
            if(existingCommand) {
                if(localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`🗑️ Deleted Command: "${name}".`);
                    continue;
                }

                if(areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`🔁 Edited Command: "${name}".`)
                }
            } else {
                if(localCommand.deleted) {
                    console.log(`⏭️ Skipping registering command "${name}" as its set to delete.`);
                    continue;
                }

                await applicationCommands.create({
                    name, 
                    description,
                    options,  
                })

                console.log(`✅ Registered command "${name}".`);
            }
        }
    } catch (error) {
        console.log(error)
    }
}