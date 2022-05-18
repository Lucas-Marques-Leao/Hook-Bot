const { SlashCommandBuilder } = require("@discordjs/builders");
const Armas = require("../../models/Armas");
const Ficha  = require('../../models/Ficha');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("addficha")
    .setDescription("Adicionar ficha PERMANENTEMENTE")
	.addStringOption(option =>
		option.setName('nome').setDescription('O nome do seu personagem').setRequired(true))
	.addStringOption(option =>
		option.setName('classe').setDescription('A sua Classe Inicial').setRequired(true))
	.addStringOption(option =>
		option.setName('raça').setDescription('A raça do seu Personagem').setRequired(true))
	.addIntegerOption(option =>
		option.setName('nível').setDescription('Nível da sua Classe Inicial').setRequired(true))
	.addStringOption(option =>
		option.setName('link_foto').setDescription('URL da Foto do Personagem').setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.roles.cache.has("972180267265589258")) {
      return await interaction.reply({ content: "Você não é do RPG!" });
    }

   
		
		const sheetName = interaction.options.getString('nome');
		const sheetClassePri = interaction.options.getString('classe');
		const sheetRace = interaction.options.getString('raça');
		const sheetLevel = interaction.options.getInteger('nível');
		const sheetPhoto = interaction.options.getString('link_foto');
		


		try {
			// Equivale à: INSERT INTO fichas (author_id, nome_ficha, raça, classe_pri, nivel_pri, foto) values (?, ?, ?, ?, ?, ?);
			const ficha = await Ficha.create({
				author_id: `${interaction.user.username}`,
				nome_ficha: `${sheetName}`,
				raça: `${sheetRace}`,
				classe_pri: `${sheetClassePri}`,
				nivel_pri: `${sheetLevel}`,
				foto: `${sheetPhoto}`,

				
			});

			return interaction.reply(`a Ficha de: ${ficha.nome_ficha}, da raça ${ficha.raça} e da classe ${ficha.classe_pri} foi adicionada por ${ficha.author_id}`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('Essa Ficha já existe.');
			}

			console.error(error);
			return interaction.reply('Algo deu errado ao adicionar a Ficha.');
		}
	}
};
