const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "veja o meu ping",
    type: "CHAT_INPUT",


    run: async (client, interaction, args) => {
        let embed = new Discord.MessageEmbed()
        .setColor("000011")
        .setDescription(`**\\Meu ping está em**\`${client.ws.ping}ms\`**.**`)

        interaction.reply({ embeds: [embed], ephemeral: false})
    }
}