const { SlashCommandBuilder } = require("@discordjs/builders");
const  Ficha  = require('../../models/Ficha');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addtag")
    .setDescription("Adicionar tags (DM)"),
  async execute(interaction) {
    if (!interaction.member.roles.cache.has("974046862325731358")) {
      return await interaction.reply({ content: "Você não é o DM!" });
    }

   
	const tagName = interaction.options.getString('nome_ficha');
	const tagClassePri = interaction.options.getString('classe_pri');
	const tagRace = interaction.options.getString('raça')


		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Ficha.create({
				author_id: interaction.user.username,
				nome_ficha: tagName,
				raça: tagRace,
				classe_pri: tagClassePri,
		
			});

			return interaction.reply(`a ficha de: ${tag.nome_ficha}, da raça ${tag.raça} e da classe ${tag.classe_pri} foi adicionada por ${tag.author_id}`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('Essa tag já existe.');
			}

			return interaction.reply('Algo deu errado ao adicionar a tag.');
		}
	}
};
