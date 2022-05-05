const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Recebe informação sobre...')
        .addSubcommand(subcommand => 
            subcommand
                .setName("user")
                .setDescription('Info do Usuário')
                .addUserOption(option => option.setName("target").setDescription('o user mencionado')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('informações do server')),
	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === "user"){
            const user = interaction.options.getUser("target")
            if (user){
                const file = new MessageAttachment("./src/fotos/mestre.png");
                const userEmbed = new MessageEmbed()
                    .setTitle(`informações de: ${user.username}`)
                    .setDescription('descrição')
                    .setURL('https://static.tvtropes.org/pmwiki/pub/images/external_contentduckduckgo_01.jpg')
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(
                        { name: 'Usuário:', value: `Usuário é: ${user.username}`, inline: true},
                        { name: `\u200B`, value: `\u200B`, inline: true},
                        { name: `Tag:`, value: `Tag de usuário: #${user.discriminator}`, inline: true}
                    )
                    .setImage("https://static.tvtropes.org/pmwiki/pub/images/external_contentduckduckgo_01.jpg")
                    .setTimestamp()
                    .setColor('RANDOM')
                    
                    
                await interaction.reply({ embeds: [userEmbed], files: [file] })
            }else{
                await interaction.reply(`Usuário: ${interaction.user.username}\nSeu ID: ${interaction.user.id}`)
            }
        }else if (interaction.options.getSubcommand() === "server"){
            await interaction.reply(`Nome do Servidor: ${interaction.guild.name}\nTotal de participantes: ${interaction.guild.memberCount}`)
        }else{
            await interaction.reply('Nenhum subcomando foi utilizado.')
        }
	},
};