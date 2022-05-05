const Discord = require('discord.js')
const { token } = require('../config.json')
const { charSheet } = require('./classes-da-ficha/ficha.js')
const fs = require('node:fs')




//definições
let c1 = new charSheet('Rayer', 'Humano', 'Sacerdote')
const Rayer = c1.getNome()
let c2 = new charSheet('Klaus', 'Tielfing', 'Bruxo')
const Klaus = c2.getNome()
let c3 = new charSheet('Eris', 'Humana', 'Maga')
const Eris = c3.getNome()
let c4 = new charSheet('Fulano', 'Tiefling', 'Patrulheiro')
const Fulano = c4.getNome()

//settings
c1.setNivelPri(7)
c1.setIdade("24 anos")
c1.setAtributos(9, 12, 10, 16, 22, 14)
c1.setInventario("Símbolo Sagrado")
c1.setConjClass1Full()

c2.setNivelPri(18)
c2.setIdade("17 anos")
c2.setAtributos(10, 10, 16, 14, 16, 20)
c2.setInventario("Lâmina Espectral")
c2.setInventario("Grimório Demoníaco")
c2.setConjClass1PactMagic()

c3.setNivelPri(3)
c3.setIdade("15 anos")
c3.setAtributos(7, 12, 9, 20, 18, 15)
c3.setClasseSec("Feiticeira")
c3.setNivelSec(7)
c3.setInventario("Cajado")
c3.setInventario("Pergaminho de Passo do Trovão(5º círculo)")
c3.setConjClass1FullClass2Full()

//infopass
c1.pornaTelaATabela()
c2.pornaTelaATabela()
c3.pornaTelaATabela()
c4.pornaTelaATabela()


const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS]})




client.once('ready', () =>{
	console.log(`${client.user.username} tá ON!`)

	const guildId = '970802893798117406'
	const guild = client.guilds.cache.get(guildId)
	let commands

	if(guild){
		commands = guild.commands
	}else{
		commands = client.application?.commands
	}

	commands?.create({
		name: 'ping',
		description: 'pinga!'

	})

	commands?.create({
		name: 'server',
		description: 'Dados do Servidor'
	})

	commands?.create({
		name: 'user',
		description: 'Dados do Usuário'
	})

	commands?.create({
		name: 'rpg',
		description: 'Nome da Ficha e Ação',
		options: [
			{
				name: 'charsheet',
				description: 'O Nome do seu Personagem',
				required: true,
				type : Discord.Constants.ApplicationCommandOptionTypes.STRING
			},
			{
				name: 'action',
				description: 'Ação',
				required: false,
				type : Discord.Constants.ApplicationCommandOptionTypes.STRING
			}
		]
	})
})

/*client.on('messageCreate',  interaction =>{
	
	 if (interaction.content === '/rola'){
		interaction.reply(`que falta de vergonha! UMA ROULA`)
	}else if (interaction.content === '/deus'){
		interaction.reply(`${interaction.author}, nem tente, você jamais vai chegar aos pés do Deus EDNALDO PEREIRA`)
		interaction.channel.send({files: ["./fotos/pisque.jpg"]})
	}else if (interaction.content ==='/shura'){
		interaction.reply("O Gladiador Mascarado, o Primeiro Deus de Athas")
		interaction.channel.send({files: ["./fotos/shura.jpg"]})
		
	}else if (interaction.content.startsWith(`/${Rayer.toLowerCase()}`)){
		if (interaction.content === `/${Rayer.toLowerCase()} status`){
			interaction.reply(`Ficha do ${Rayer}:
			${c1.informacoes}`)
		}else if (interaction.content === `/${Rayer.toLowerCase()} longsword`){
			let d20 = Math.floor(Math.random() * 20) + 1
			let res = d20 + Number(c1.getProf().replace('+', '')) + Number(c1.getChaMod().replace('+', '').replace('-', ''))
			interaction.reply(`atacou com ${d20 + c1.getProf() + c1.getChaMod()}(${res}) para acertar a Classe de Armadura!`)
		}else{
			interaction.reply("Escreve certinho, fazendo favor...")
		}
		
	}else if (interaction.content.startsWith(`/${Klaus.toLowerCase()}`)){
		if (interaction.content === `/${Klaus.toLowerCase()} status`){
			interaction.reply(`Ficha do ${Klaus}:
			${c2.informacoes}`)
		}else if (interaction.content === `/${Klaus.toLowerCase()} eldblast`){
			let d20 = Math.floor(Math.random() * 20) + 1
			let res = d20 + Number(c2.getProf().replace('+', '')) + Number(c2.getChaMod().replace('+', ''))
			interaction.reply(`atacou com ${d20 + c2.getProf() + c2.getChaMod()}(${res}) para acertar a Classe de Armadura!`)
		}else if (interaction.content === `/${Klaus.toLowerCase()} lamspec`){
			let d20 = Math.floor(Math.random() * 20) + 1
			let res = d20 + Number(c2.getProf().replace('+', '')) + Number(c2.getChaMod().replace('+', '')) + 3
			interaction.reply(`atacou com ${d20  + c2.getProf() + c2.getChaMod()}+3(${res}) para acertar a Classe de Armadura!`)
		}else{
			interaction.reply("Pare de parasitar o chat, Analfabeto!")
		}
		
	}else if (interaction.content.startsWith(`/${Eris.toLowerCase()}`)){
		if (interaction.content === `/${Eris.toLowerCase()} status`){
			interaction.channel.send({files: ["./fotos/eris.jpg"]})
			interaction.reply(`Ficha da ${Eris}:
			${c3.informacoes}`)
			
		}else if (interaction.content === `/${Eris.toLowerCase()} firebolt`){
			let d20 = Math.floor(Math.random() * 20) + 1
			let res = d20 + Number(c3.getProf().replace('+', '')) + Number(c3.getIntMod().replace('+', '').replace('-', ''))
			interaction.reply(`atacou com ${d20 + c3.getProf() + c3.getIntMod()}(${res}) para acertar a Classe de Armadura!`)
		}else{
			interaction.reply("Que pena, mas não se preocupa! Eu vou te ensinar a escrever algum dia!")
		}
	}else if (interaction.content.startsWith(`/${Fulano.toLowerCase()}`)){
		if (interaction.content === `/${Fulano.toLowerCase()} status`){
			interaction.reply(`Ficha do ${Fulano}:
			${c4.informacoes}`)
		}else{
			interaction.reply("Esperava mais de você...")
		}
	}

})*/

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) {return}

	const { commandName, options } = interaction;

	if (commandName === 'ping') {
		 await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Nome do Servidor: ${interaction.guild.name}\nTotal de Participantes: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Sua tag: ${interaction.user.tag}\nSeu id: ${interaction.user.id}`);
	}else if (commandName === 'rpg'){
		const charSheet = options.getString('charsheet')
		const action = options.getString('action')

		if (charSheet === 'Klaus'){
			if(!action || action === 'Ficha'){
				interaction.reply({
					content: `${c2.informacoes}`,
					ephemeral: true
	
				})
			}else if (action === 'lamspec'){
				let d20 = Math.floor(Math.random() * 20) + 1
				let res = d20 + Number(c2.getProf().replace('+', '')) + Number(c2.getChaMod().replace('+', '')) + 3
				interaction.reply(`Klaus atacou com ${d20  + c2.getProf() + c2.getChaMod()}+3(${res}) para acertar a Classe de Armadura!`)
			}
			
		}else if(charSheet === 'Eris'){
			interaction.reply({
				content: `${c3.informacoes}`,
				ephemeral: true
			})
		}
		
	}else if (commandName === 'pica'){

	}

});

client.login(token)