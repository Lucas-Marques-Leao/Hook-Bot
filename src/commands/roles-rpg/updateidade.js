const { SlashCommandBuilder } = require('@discordjs/builders');
const Ficha = require('../../models/Ficha');

module.exports = {
	
    data: new SlashCommandBuilder()
        .setName("updateidade")
        .setDescription("Muda a idade de uma ficha")
        .addStringOption(option =>
            option.setName('nome').setDescription('Nome da Ficha').setRequired(true))
        .addIntegerOption(option =>
            option.setName('idade').setDescription('Idade em anos do seu Personagem').setRequired(true)),

        async execute(interaction) {

             if (!interaction.member.roles.cache.has('972180267265589258')){
                  return await interaction.reply({content: "Você não pode usar os comandos do RPG."})
             }
            
                const nome = interaction.options.getString('nome');
                const idade = interaction.options.getInteger('idade');

                const ficha = await Ficha.findOne({ where: { nome_ficha: nome } });

                if (ficha) {
                
                    if (interaction.member.roles.cache.has("974046862325731358") || interaction.user.username === `${ficha.getAuthorId()}`) {
                    
                       // Equivalente a: UPDATE fichas (idade) values (?) WHERE nome_ficha='?';
                     const affectedRows = await Ficha.update({ idade: `${idade} anos` }, { where: { nome_ficha: nome } });

                       if (affectedRows > 0) {
                          return interaction.reply(`A ficha ${nome} foi alterada com sucesso.`);
                    }

                }else{
                    return await interaction.reply({ content: "Você não é o Dono ou o DM!" });
                }

                // Equivalente a: UPDATE fichas (idade) values (?) WHERE nome_ficha='?';
                }else{
                    return await interaction.reply({content: `A ficha com o nome ${nome}, não foi encontrada`});
                }

            
            }
        }
    