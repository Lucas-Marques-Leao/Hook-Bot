const { SlashCommandBuilder } = require('@discordjs/builders');
const {  MessageAttachment, MessageEmbed } = require('discord.js');
const { klaus, rayer } = require('../../classes-da-ficha/ficha.js');


//Coisas:

/*let klaus = new charSheet("Klaus", "Tiellfing", "Bruxo")
let rayer = new charSheet("Rayer", "Humano", "Sacerdote")

klaus.setAtributos(10, 10, 10, 10, 10, 10)
klaus.setSaude(600)
klaus.setNivelPri(18)
klaus.setConjClass1PactMagic()

rayer.setAtributos(20, 20, 20, 20, 20, 20)
rayer.setSaude(90)
rayer.setNivelPri(10)

klaus.pornaTelaATabela()
rayer.pornaTelaATabela()
                            */
module.exports = {
	
        data: new SlashCommandBuilder()
            .setName('ficha')
            .setDescription('Status da Ficha'),
        
	async execute(interaction, client) {
        if (!interaction.member.roles.cache.has('972180267265589258')){
         return await interaction.reply({content: "Você não tem o Cargo necessário!"})
        }
            if (interaction.member.roles.cache.has('972218325369245717')){
                
                const user = interaction.member.user
                const file = new MessageAttachment('../../src/fotos/klaus.jpg');
                const userEmbed = new MessageEmbed()
                    .setTitle(`Ficha D&D 5e`)
                    .setURL("https://www.lmlservertest.x10.mx/suafichajs.html")
                    .setDescription(`Ficha de Klaus`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(
                        { name: 'Usuário:', value: `\n${user}`, inline:true },
                        { name: 'Status da Ficha:', value: `${klaus.informacoes}`},
                    )
                    .setImage("https://i.pinimg.com/originals/2a/46/84/2a4684c6a41408696b0d48fc908788de.png")
                    .setTimestamp()
                    .setFooter({
                        text: `${client.user.tag}`
                    })
                    .setColor('PURPLE');
                    await interaction.reply({ embeds: [userEmbed], ephemeral: true})
		
            }else if (interaction.member.roles.cache.has('972230868976406538')){
                
                const user = interaction.member.user
                const file1 = new MessageAttachment('../../src/fotos/pisque.jpg');
                const userEmbed2 = new MessageEmbed()
                    .setTitle(`Ficha de D&D 5e`)
                    .setURL("https://www.lmlservertest.x10.mx/suafichajs.html")
                    .setDescription(`Ficha de Rayer`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(
                        { name: 'Usuário:', value: `\n${user}`, inline:true },
                        { name: 'Status da Ficha:', value: `${rayer.informacoes}`},
                    )
                    .setImage("https://i.pinimg.com/236x/55/11/b0/5511b0921c6b2e4322222e8f3305e860.jpg")
                    .setTimestamp()
                    .setFooter({
                        text: `${client.user.tag}`
                    })
                    .setColor('YELLOW');
                    await interaction.reply({ embeds: [userEmbed2], ephemeral: true,})
            }else{
                await interaction.reply({content: "Você é do RPG, mas não tem um Cargo de Ficha ainda"})
            }
    }
}

