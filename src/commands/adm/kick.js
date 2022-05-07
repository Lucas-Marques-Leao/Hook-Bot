const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Teste de permissão pra kick'),
        permissions: [ Permissions.FLAGS.KICK_MEMBERS ],
	async execute(interaction) {
		await interaction.reply({ content: "esse comando funfa!"});
	},
};

