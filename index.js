const Discord = require('discord.js')
const { token } = require('./config.json')


const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]})


client.once('ready', () =>{
	console.log(`${client.user.username} tá ON!`)
})

client.on('messageCreate',  interaction =>{
	
	if (interaction.content === '/pica'){
		interaction.reply(`suas bolas foram lustradas, sinta-se à vontade ${interaction.author}`)
	}else if (interaction.content === '/rola'){
		interaction.reply(`que falta de vergonha! UMA ROULA`)
	}else if (interaction.content === '/deus'){
		interaction.reply(`${interaction.author}, nem tente, você jamais vai chegar aos pés do Deus EDNALDO PEREIRA`)
		interaction.channel.send({files: ["./fotos/pisque.jpg"]})
	}else if (interaction.content ==='/ping'){
		interaction.reply(`O ping do Bot é ${client.ws.ping}ms`)
	}
})


client.login(token)