module.exports =  {
    name: 'ping',
    description: "Pong!",
   /* devOnly: Boolean,
    testOnly: Boolean,
    options: Object[], */

    callback: (client, interaction) => {
        const pingResponses = [
            `Zooming in at ${client.ws.ping}ms! 💨`,
            `Ping? More like *Pong!* — ${client.ws.ping}ms 🏓`,
            `I've seen faster... but this works: ${client.ws.ping}ms 😎`,
            `Latency check: ${client.ws.ping}ms. Not bad, right? 😉`,
            `Beep boop. Ping is ${client.ws.ping}ms 🤖`,
            `Running on coffee and ${client.ws.ping}ms of pure energy ☕`,
            `At ${client.ws.ping}ms, I'm basically teleporting. 🚀`,
            `Measured precisely at ${client.ws.ping}ms. I’m a scientist now 🔬`,
            `Could be better, could be worse. It’s ${client.ws.ping}ms. 🤷‍♂️`,
            `Blink and you’ll miss it: ${client.ws.ping}ms ⚡`,
            `I’m flying through the wires at ${client.ws.ping}ms 🛸`,
            `Your royal latency: ${client.ws.ping}ms 👑`,
            `Ping pong? It’s ${client.ws.ping}ms. You serve 🎾`,
            `Currently cruising at ${client.ws.ping}ms — buckle up! 🛫`,
            `I checked twice. Still ${client.ws.ping}ms 📡`
          ];
    
        const pingResponse = pingResponses[Math.floor(Math.random() * pingResponses.length)];
        interaction.reply(pingResponse);
    }

}