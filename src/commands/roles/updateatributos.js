const { SlashCommandBuilder } = require('@discordjs/builders');
const Ficha = require('../../models/Ficha');

module.exports = {
	
    data: new SlashCommandBuilder()
        .setName("updateatributos")
        .setDescription("Muda os Atributos de uma ficha (DM)")
        .addStringOption(option =>
            option.setName('nome').setDescription('Nome da Ficha').setRequired(true))
        .addIntegerOption(option =>
            option.setName('str').setDescription('Força').setRequired(true))
        .addIntegerOption(option =>
            option.setName('dex').setDescription('Destreza').setRequired(true))
        .addIntegerOption(option =>
            option.setName('con').setDescription('Constituição').setRequired(true))
        .addIntegerOption(option =>
            option.setName('int').setDescription('Inteligência').setRequired(true))
        .addIntegerOption(option =>
            option.setName('wis').setDescription('Sabedoria').setRequired(true))
        .addIntegerOption(option =>
            option.setName('cha').setDescription('Carisma').setRequired(true)),

        async execute(interaction) {
            
            if (!interaction.member.roles.cache.has("974046862325731358")) {
                return await interaction.reply({ content: "Você não é o DM!" });
            }

                const nome = interaction.options.getString('nome');
                const força = interaction.options.getInteger('str');
                const destreza = interaction.options.getInteger('dex');
                const constituicao = interaction.options.getInteger('con');
                const inteligencia = interaction.options.getInteger('int');
                const sabedoria = interaction.options.getInteger('wis');
                const carisma = interaction.options.getInteger('cha');

                // equivalent to: UPDATE tags (description) values (?) WHERE name='?';
                const affectedRows = await Ficha.update({ str_at: força, dex_at: destreza, con_at: constituicao, int_at: inteligencia, wis_at: sabedoria, cha_at: carisma }, { where: { nome_ficha: nome } });

                if (affectedRows > 0) {
                    return interaction.reply(`A ficha ${nome} foi alterada com sucesso.`);
                }

                return interaction.reply(`Não foi encontrada uma ficha com o nome: ${nome}.`);
        }
    }