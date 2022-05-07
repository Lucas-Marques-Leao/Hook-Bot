module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;


    
    const hasRoleRpg = interaction.member.roles.cache.some(r => r.name === "RPG")
    const command = client.commands.get(interaction.commandName);
    
    if (!command) return;

    try {

      if (command.permissions && command.permissions.length > 0){
        if (!interaction.member.permissions.has(command.permissions)) return await interaction.reply({ content: `Você não tem permissão para usar este comando.`});
      }


      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Houve um erro ao executar este comando",
        ephemeral: true,
      });
    }
  },
};
