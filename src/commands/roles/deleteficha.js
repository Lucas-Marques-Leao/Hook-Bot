const { SlashCommandBuilder } = require("@discordjs/builders");
const  Ficha  = require('../../models/Ficha');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("deleteficha")
    .setDescription("Remover ficha PERMANENTEMENTE (DM)")
	.addStringOption(option =>
		option.setName('nome').setDescription('O nome do seu personagem').setRequired(true)),
		
  async execute(interaction, client , database) {
    if (!interaction.member.roles.cache.has("974046862325731358")) {
      return await interaction.reply({ content: "Você não é o DM!" });
    }

        const fichaName = interaction.options.getString('nome');
        // equivalent to: DELETE from tags WHERE name = ?;
        const rowCount = await Ficha.destroy({ where: { nome_ficha: fichaName } });
    
        if (!rowCount) return interaction.reply('Essa Ficha não existe.');
    
        return interaction.reply('Ficha deletada.');
    }
};
