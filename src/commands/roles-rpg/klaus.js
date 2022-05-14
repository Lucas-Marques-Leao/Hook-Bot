const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { klaus } = require('../../classes-da-ficha/ficha.js');


module.exports = {
	
    data: new SlashCommandBuilder()
        .setName("klaus")
        .setDescription("Comandos do Klaus")
        .addSubcommand(subcommand => 
            subcommand
                .setName("lamspec")
                .setDescription('Ataque com a Lâmina Espectral'))
        .addSubcommand(subcommand =>
            subcommand
            .setName("eldblast")
            .setDescription("Ataque mágico baseado em Carisma")),
    
                
        async execute(interaction, client) {
        if (!interaction.member.roles.cache.has('972180267265589258')){
            return await interaction.reply({content: "Você não pode usar os comandos do RPG."})
        }
            if (!interaction.member.roles.cache.has('972218325369245717')){
                return await interaction.reply({content: "Você não pode usar os comandos do amiguinho."})
            }
                if (interaction.options.getSubcommand() === "lamspec"){
                    
                   
                    let d20 = Math.floor(Math.random() * 20) + 1;
                    let lamspectral = d20 + Number(klaus.getProf().replace("+", "")) + Number(klaus.getChaMod().replace("+", "")) + 3;
                    
                    const embeda = new MessageEmbed()
                        .setTitle("Ataque com a Lâmina Espectral")
                        .setDescription("Lâmina Espectral (+3), Proficiente, Sifão d'alma(Pode usar o modificador-chave de conjuração para dano), dano crítico padrão")
                        .addFields(
                            { name:"Rolagem de Ataque", value: `A Lâmina Espectral acertou ${d20}${klaus.getProf()}${klaus.getChaMod()}+3(${lamspectral}) contra a Classe de Armadura!`, inline: true},
                            { name:"Dano", value: `1d6+6d8+13 dano cortante (mágico)`, inline: true}
                        )
                        .setThumbnail(client.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter({
                            text: `${client.user.tag}`
                        })
                        .setColor('RANDOM');
                    
                    
                        await interaction.reply({ embeds: [embeda], ephemeral: false})


                }else if (interaction.options.getSubcommand() === "eldblast") {
                    
                    
                    let d20 = Math.floor(Math.random() * 20) + 1;
                    let lamspectral = d20 + Number(klaus.getProf().replace("+", "")) + Number(klaus.getChaMod().replace("+", "")) + 3;
                    
                    const embeda2 = new MessageEmbed()
                        .setTitle("Rajada Mística")
                        .setDescription("4 Rajadas, Truque (rajadas adicionais aos níveis 5, 11, 17), dano crítico padrão")
                        .addFields(
                            { name:"Rolagem de Ataque Mágico", value: `O Ataque mágico acertou ${d20}${klaus.getProf()}${klaus.getChaMod()}(${lamspectral - 3}) contra a Classe de Armadura!`, inline: true},
                            { name:"Dano", value: `1d10+5 dano de energia (mágico)`, inline: true}
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

