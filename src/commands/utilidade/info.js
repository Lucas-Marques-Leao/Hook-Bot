const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');






module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Informação sobre usuários e servidor')
        .addSubcommand(subcommand => 
            subcommand
                .setName("user")
                .setDescription('Informações do usuário')
                .addUserOption(option => option.setName("target").setDescription('o usúario mencionado')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Informações do server')),

	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === "user"){
            const user = interaction.options.getUser("target")
            if (user){
                
                const file = new MessageAttachment('../../js/Hook Bot/src/fotos/darkicone.png');
                const userEmbed = new MessageEmbed()
                    .setTitle(`Sobre: ${user.username}!`)
                    .setURL("https://www.lmlservertest.x10.mx/suafichajs.html")
                    .setDescription(`Você é bom, mas você não é... EDNALDO PEREIRA`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(

                        { name: 'Usuário:', value: `${user.username}`, inline: true},
                        { name: `\u200B`, value: `\u200B`, inline: true},
                        { name: `Tag:`, value: `#${user.discriminator}`, inline: true},

                    )
                    .setImage("https://pbs.twimg.com/media/FRsSopEWYAADAZ1?format=jpg&name=small")
                    .setTimestamp()
                    .setFooter({
                        text: `${client.user.tag}`
                    })
                    .setColor('RED');
                    
                    
                await interaction.reply({ embeds: [userEmbed], ephemeral: false})
            }else{
                await interaction.reply(`Usuário: ${interaction.user.username}\nSeu ID: ${interaction.user.id}`)
            }
        }else if (interaction.options.getSubcommand() === "server"){
            await interaction.reply(`Nome do Servidor: ${interaction.guild.name}\nTotal de participantes: ${interaction.guild.memberCount} (bot também é gente!)`)
        }else{
            await interaction.reply('Nenhum Subcomando foi utilizado.')
        }
	},
};