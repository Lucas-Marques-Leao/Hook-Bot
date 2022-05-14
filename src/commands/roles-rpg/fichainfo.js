const { SlashCommandBuilder } = require("@discordjs/builders");
const Ficha = require('../../models/Ficha');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName("fichainfo")
      .setDescription("Info das Fichas pelos donos ou DM")
      .addStringOption(option =>
        option.setName('nome').setDescription('Nome de uma ficha Criada')),
    async execute(interaction, client) {

      if (!interaction.member.roles.cache.has('972180267265589258')){
        return await interaction.reply({content: 'Você não é do RPG.'});
      }

       const fichaName = interaction.options.getString("nome");

      // // Equivale à: SELECT * FROM fichas WHERE nome_ficha = 'fichaName' LIMIT 1;
       const ficha = await Ficha.findOne({ where: { nome_ficha: fichaName } });

          if (ficha) {

            if (interaction.member.roles.cache.has("974046862325731358") || interaction.user.username === `${ficha.getAuthorId()}`) {

                ficha.setNivel();
                ficha.atribuirmodificador();
                ficha.pornaTelaATabela();
                const userEmbed = new MessageEmbed()
                    .setTitle(`Ficha D&D 5e`)
                    .setURL("https://www.lmlservertest.x10.mx/suafichajs.html")
                    .setDescription(`Ficha de ${fichaName}`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(
                        { name: 'Usuário:', value: `\n${interaction.user.tag}`, inline:true },
                        { name: 'Status da Ficha:', value: `${ficha.informacoes}`},
                    )
                    .setImage(`${ficha.getFoto()}`)
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
      return await interaction.reply({ content: `A ficha de nome ${fichaName} não foi encontrada.` });
    }
  },
};


//https://i.pinimg.com/originals/2a/46/84/2a4684c6a41408696b0d48fc908788de.png
//https://i.pinimg.com/236x/55/11/b0/5511b0921c6b2e4322222e8f3305e860.jpg