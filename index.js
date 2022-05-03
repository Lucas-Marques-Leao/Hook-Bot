const Discord = require('discord.js')
const dotenv = require('dotenv')
const { Routes } = require('discord-api-types/v9')
const { REST } = require('@discordjs/rest')
const fs = require('node:fs')
dotenv.config()


const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]})
client.commands = new Collection();


client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`)

	const guildId = '970802893798117406'
	const guild = client.guilds.cache.get(guildId)
	const commands = []
	
	
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command);
	}

	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)


	
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return

	const { commandName } = interaction

	if (commandName === 'ping') {
		await interaction.reply('Pong!')
	} else if (commandName === 'beep') {
		await interaction.reply('Boop!')
	}
});


client.login(process.env.TOKEN)

