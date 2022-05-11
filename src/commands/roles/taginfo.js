const { SlashCommandBuilder } = require("@discordjs/builders");
const  Ficha  = require('../../models/Ficha');

module.exports = {
    data: new SlashCommandBuilder()
      .setName("taginfo")
      .setDescription("Info das Fichas pelo DM"),
    async execute(interaction, client) {
      if (!interaction.member.roles.cache.has("974046862325731358")) {
        return await interaction.reply({ content: "Você não é o DM!" });
      }

      const fichaName = interaction.options.getString("nome");

      // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
      const ficha = await Ficha.findOne({ where: { nome: fichaName } });

      if (ficha) {
        return interaction.reply(
          `${ficha.nome_ficha} foi criado por ${ficha.author_id} at ${ficha.created_at}`
        );
      }

      return interaction.reply(`${fichaName} não foi encontrado.`);
    },
};
