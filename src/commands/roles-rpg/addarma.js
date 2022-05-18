const { SlashCommandBuilder } = require("@discordjs/builders");
const  Armas  = require('../../models/Armas');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("addarma")
    .setDescription("Adicionar Arma (DM)")
	.addStringOption(option =>
		option.setName('id').setDescription('O id do Player').setRequired(true))
	.addStringOption(option =>
		option.setName('nome').setDescription('o Nome da Arma').setRequired(true))
	.addStringOption(option =>
		option.setName('dano').setDescription('O dano não-mágico da Arma').setRequired(true))
	.addStringOption(option =>
		option.setName('link_foto').setDescription('URL da Foto da Arma').setRequired(true))
    .addIntegerOption(option => 
        option.setName('bonus').setDescription('O Bônus Mágico da Arma')),
		
  async execute(interaction) {
    if (!interaction.member.roles.cache.has("974046862325731358")) {
        return await interaction.reply({ content: "Você não é o DM!" });
      }

   
		const ficha_id = interaction.options.getString('id');
		const weapomName = interaction.options.getString('nome');
		const weapomDamage = interaction.options.getString('dano');
		const weapomPhoto = interaction.options.getString('link_foto');
        const weapomMagicBonus = interaction.options.getInteger('bonus');


		try {
			// Equivale à: INSERT INTO armas (nome_arma, bonus_magico, dano, propriedades, foto) values (?, ?, ?, ?, ?);
			const arma = await Armas.create({
				
				nome_arma: weapomName,
				bonus_magico: weapomMagicBonus,
				dano: weapomDamage,
				foto: weapomPhoto,
				FichaId: ficha_id,
		
			});

			return interaction.reply(`a Arma ${weapomName} foi adicionada com sucesso!`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('Essa arma já existe.');
			}

			console.error(error);
			return interaction.reply('Algo deu errado ao adicionar a Arma.');
		}
	}
};
