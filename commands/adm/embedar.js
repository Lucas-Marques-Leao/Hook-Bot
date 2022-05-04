const Discord = require('discord.js')
const db = require('quick.db')


module.exports = {
    name: "stats",
    aliases: ["stats"],

    run: async(client, messsage, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply("Você não possui permissão para executar este comando")
     }else{
        let embed_1 = new Discord.MessageEmbed()
        .setColor("RAMDOM")
        .setDescription(`${messsage.author} Qual será o chat a enviar o anúncio?`);

        let embed_erro = new Discord.MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${messsage.author} Não foi possível reconhecer um canal de texto.`);

        let embed_2 = new Discord.MessageEmbed()
        .setColor("RAMDOM")
        .setDescription(`${messsage.author} Qual será o título do anúncio?`);

        message.reply({embeds: [embed_1]}).then(msg => {
            let coletor = messsage.channel.createMessageCollector({filters: mm => mm.author.id == message.author.id, max: 1})
        })
    }


    }
}

