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
                    let d8 = Math.floor(Math.random() * 8) + 1;
                    let d6 = Math.floor(Math.random() * 6) + 1;
                    let lamspectral = d20 + Number(klaus.getProf().replace("+", "")) + Number(klaus.getChaMod().replace("+", "")) + 3;
                    let lamdmg = d8 + d8 + d8 + d8 + d8 + d8;
                    const embeda = new MessageEmbed()
                        .setTitle("Ataque com a Lâmina Espectral")
                        .setDescription("Lâmina Espectral (+3), Proficiente, Sifão d'alma(Pode usar o modificador-chave de conjuração para dano), dano crítico padrão")
                        .addFields(
                            { name:"Rolagem de Ataque", value: `A Lâmina Espectral acerta ${d20}${klaus.getProf()}${klaus.getChaMod()}+3(${lamspectral}) contra a Classe de Armadura!`},
                            { name:"Dano", value: `${d6}+${d8}+${d8}+${d8}+${d8}+${d8}+${13}(${d6 + 13 + lamdmg})`}
                        )
                        .setThumbnail(client.user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter({
                            text: `${client.user.tag}`
                        })
                        .setColor('RANDOM');
                    
                    
                        await interaction.reply({ embeds: [embeda], ephemeral: false})


                }else if (interaction.options.getSubcommand() === "eldblast") {
                    
                    await interaction.reply({content: "Você é do RPG, mas não tem um Cargo de Ficha ainda"})
                }else{
                    
                    await interaction.reply({content: "Você é do RPG, mas não tem um Cargo de Ficha ainda"})
                }
            
            
        }
}

