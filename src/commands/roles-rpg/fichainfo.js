const { SlashCommandBuilder } = require("@discordjs/builders");
const Ficha = require('../../models/Ficha');
const { MessageEmbed } = require('discord.js');
const Armas = require("../../models/Armas");
const { findOne } = require("../../models/Ficha");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("fichainfo")
      .setDescription("Info das Fichas pelos donos ou DM")
      .addStringOption(option =>
        option.setName('nome').setDescription('Nome de uma ficha Criada').setRequired(true))
      .addStringOption(option =>
        option.setName('id').setDescription('Id do seu Personagem').setRequired(true)),
    async execute(interaction, client) {

      if (!interaction.member.roles.cache.has('972180267265589258')){
        return await interaction.reply({content: 'Você não é do RPG.'});
      }

       const fichaName = interaction.options.getString("nome");
       const fichaId = interaction.options.getString("id");

      // // Equivale à: SELECT * FROM fichas WHERE nome_ficha = 'fichaName' LIMIT 1;
       const ficha = await Ficha.findOne({ where: { nome_ficha: fichaName, id: fichaId} });

          if (ficha) {

            if (interaction.member.roles.cache.has("974046862325731358") || interaction.user.username === `${ficha.getAuthorId()}`) {

                const armasFicha = await Armas.findAll({where: { FichaId: fichaId }, raw: true});

                const weaponName = armasFicha.map((arma) => {
                    if (!arma.bonus_magico) {
                      return (`${arma.nome_arma}`)
                    }else{
                      return (`${arma.nome_arma} +${arma.bonus_magico}`);
                    }
                });
                // console.log(weaponName);
                
                
                
                // console.log(armasFicha);

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
                        { name: 'Informações básicas', value: `${ficha.informacaobase}`},
                        { name: 'Classes e Conjuração', value: `${ficha.informacaoclasses}`},
                        { name: 'Inventário', value: `${weaponName.join('\n')}`},
                        { name: 'Atributos', value: `${ficha.infotributos}`},
                        { name: 'Modificadores', value: `${ficha.infomod}`},
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
      return await interaction.reply({ content: `A Ficha de nome ${fichaName} não foi encontrada.` });
    }
  },
};

// Criador: ${this.getAuthorId()}
//          Id da Ficha: ${this.getId()}

//          Nome: ${this.getNomeFicha()} 
//          Nível: ${this.getNivel()}
//          Bônus de Proficiência: ${this.getProf()}
//          Raça: ${this.getRaça()} 
         
//          Idade: ${this.getIdade()} 
         
//          Classe Primária: ${this.getClassePri()} 
//          Nível Primário: ${this.getNivelPri()} 
         
//          Classe Secundária: ${this.getClasseSec()} 
//          Nível Secundário: ${this.getNivelSec()} 
         
//          Nível de Conjurador: ${this.getNivelConj()}
//          Pontos de Vida: ${this.getSaude()} 
//          Pontos de Vida Temporários: ${this.getSaudeTemp()}
         
//          Inventário: ${this.getArmas()}
          
//          Atributos: 
//                      Força: ${this.getStrAt()}
//                      Destreza: ${this.getDexAt()}
//                      Constituição: ${this.getConAt()}
//                      Inteligência: ${this.getIntAt()}
//                      Sabedoria: ${this.getWisAt()}
//                      Carisma: ${this.getChaAt()} 
        
//          Modificadores: 
//                     Mod de Força: ${this.getStrMod()}
//                     Mod de Destreza: ${this.getDexMod()}
//                     Mod de Constituição: ${this.getConMod()}
//                     Mod de Inteligência: ${this.getIntMod()}
//                     Mod de Sabedoria: ${this.getWisMod()}
//                     Mod de Carisma: ${this.getChaMod()}`