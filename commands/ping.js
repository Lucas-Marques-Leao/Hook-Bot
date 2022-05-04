const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde delicadamente'),
	async execute(interaction) {
		await interaction.reply('cacetem');
	},
};