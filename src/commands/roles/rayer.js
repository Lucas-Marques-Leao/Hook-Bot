const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { rayer } = require('../../classes-da-ficha/ficha.js');


module.exports = {
	
    data: new SlashCommandBuilder()
        .setName("rayer")
        .setDescription("Comandos do Rayer")
        .addSubcommand(subcommand => 
            subcommand
                .setName("longsword")
                .setDescription('Ataque com a Espada Longa'))
        .addSubcommand(subcommand =>
            subcommand
            .setName("disgui")
            .setDescription("Ataque mágico baseado em Sabedoria")),
    
                
        async execute(interaction, client) {
        if (!interaction.member.roles.cache.has('972180267265589258')){
            return await interaction.reply({content: "Você não pode usar os comandos do RPG."})
        }
            if (!interaction.member.roles.cache.has('972230868976406538')){
                return await interaction.reply({content: "Você não pode usar os comandos do amiguinho."})
            }
                if (interaction.options.getSubcommand() === "longsword"){
                    
                   
                    let d20 = Math.floor(Math.random() * 20) + 1;
                    let trov = d20 + Number(rayer.getProf().replace("+", "")) + Number(rayer.getWisMod().replace("+", "")) + 3;
                    
                    const embeda = new MessageEmbed()
                        .setTitle("Ataque com a Espada da Luz Trovejante")
                        .setDescription("Espada Longa (+3), Proficiente, Sifão d'alma(Pode usar o modificador-chave de conjuração para dano), 2d6 dano radiante extra contra Corruptores, Mortos-vivos e Constructos, dano crítico padrão")
                        .addFields(
                            { name:"Rolagem de Ataque", value: `A Lâmina Espectral acertou ${d20}${rayer.getProf()}${rayer.getWisMod()}+3(${trov}) contra a Classe de Armadura!`, inline: true},
                            { name:"Dano", value: `2d6(Cortante)+4d6(Radiante)${rayer.getWisMod()}+3 (Considerado Mágico)`, inline: true}
                        )
                        .setThumbnail(client.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter({
                            text: `${client.user.tag}`
                        })
                        .setColor('RANDOM');
                    
                    
                        await interaction.reply({ embeds: [embeda], ephemeral: false})


                }else if (interaction.options.getSubcommand() === "disgui") {
                    
                    
                    let d20 = Math.floor(Math.random() * 20) + 1;
                    let raig = d20 + Number(rayer.getProf().replace("+", "")) + Number(rayer.getWisMod().replace("+", ""));
                    
                    const embeda2 = new MessageEmbed()
                        .setTitle("Disparo Guia")
                        .setDescription("Magia de 1º Círculo (Escola de Magia: Evocação, Conjuração em níveis superiores: 1d6 extra por nível além do Primeiro), 36m de Alcance, Ataque Mágico, Guia Divino (Caso acerte, o Próximo ataque contra o Oponente terá vantagem), dano crítico padrão")
                        .addFields(
                            { name:"Rolagem de Ataque Mágico", value: `O Ataque mágico acertou ${d20}${rayer.getProf()}${rayer.getWisMod()}(${raig}) contra a Classe de Armadura!`, inline: true},
                            { name:"Dano", value: `4d6 dano radiante (mágico)`, inline: true}
                        )
                        .setThumbnail(client.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter({
                            text: `${client.user.tag}`
                        })
                        .setColor('RANDOM');

                        await interaction.reply({ embeds: [embeda2], ephemeral: false})

                }else{
                    
                    await interaction.reply({content: "Você é do RPG, mas não tem um Cargo de Ficha ainda"})
                }
            
            
        }
}

