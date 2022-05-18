const { SlashCommandBuilder } = require("@discordjs/builders");
const Ficha = require('../../models/Ficha');
const { MessageEmbed } = require('discord.js');
const Armas = require("../../models/Armas");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("meuid")
      .setDescription("Gera o Id da Ficha")
      .addStringOption(option =>
        option.setName('nome').setDescription('Nome de uma ficha Criada')),
    async execute(interaction, client) {

      if (!interaction.member.roles.cache.has('972180267265589258')){
        return await interaction.reply({content: 'Você não é do RPG.'});
      }

       const fichaName = interaction.options.getString("nome");

      // // Equivale à: SELECT * FROM fichas WHERE nome_ficha = 'fichaName' LIMIT 1;
       const ficha = await Ficha.findOne({ where: { nome_ficha: fichaName} });

          if (ficha) {

            if (interaction.member.roles.cache.has("974046862325731358") || interaction.user.username === `${ficha.getAuthorId()}`) {


                const userEmbed = new MessageEmbed()
                    .setTitle(`Id de ${ficha.nome_ficha}`)
                    .setURL("https://www.lmlservertest.x10.mx/suafichajs.html")
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(
                        { name: 'Usuário:', value: `\n${interaction.user.tag}`, inline:true },
                        { name: 'Id', value: `\n${ficha.getId()}` },
                    )
                    .setTimestamp()
                    .setFooter({
                        text: `${client.user.tag}`
                    })
                    .setColor('RANDOM');
                    return await interaction.reply({ embeds: [userEmbed], ephemeral: true})
              
            }else{
              return await interaction.reply(`Você não é o Dono ou o DM`);
            }

    }else{
      return await interaction.reply({ content: `A Ficha de nome ${fichaName} não foi encontrada.` });
    }
  },
};