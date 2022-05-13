const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	
    data: new SlashCommandBuilder()
        .setName("comandosrpg")
        .setDescription("Lista de Comandos do RPG"),
    
        async execute(interaction, client) {
        if (!interaction.member.roles.cache.has('972180267265589258')){
            return await interaction.reply({content: "Você não pode usar os comandos do RPG."})
        }

        const membed = new MessageEmbed()
            .setTitle('RPG na Quinta Edição de Dungeons & Dragons')
            .setDescription(`Comandos do RPG`)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: '/addficha', value: 'Comando para criar uma ficha.\n Não permite criar fichas com o mesmo nome.'},
                { name: '/fichainfo', value: 'Comando para ver os Status (ficha de um personagem).\n Adicione o Nome do personagem, acessível caso você seja o criador ou o Dungeon Master'},
                { name: '/deleteficha', value: 'Comando para Deletar uma ficha.\n Uso exclusivo do DM!'},
            )
            .setTimestamp()
            .setFooter({
                text: `${client.user.tag}`
            })
            .setColor('DARK_ORANGE')


            return await interaction.reply({ embeds: [membed], ephemeral: true});
         
        
            
        }
}
