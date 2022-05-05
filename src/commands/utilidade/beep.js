const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('Responde delicadamente'),
	async execute(interaction) {
		await interaction.reply('Boca de sacola');
	},
};