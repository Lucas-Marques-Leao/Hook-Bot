module.exports = {
  name: "interactionCreate",
  async execute(interaction, client, database) {
    if (!interaction.isCommand()) return;


    const command = client.commands.get(interaction.commandName);
    
    if (!command) return;

    try {

      if (command.permissions && command.permissions.length > 0){
        if (!interaction.member.permissions.has(command.permissions)) return await interaction.reply({ content: `Você não tem permissão para usar este comando.`});
      }



      await command.execute(interaction, client, database);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Houve um erro ao executar este comando",
        ephemeral: true,
      });
    }
  },
};


// module.exports = {
//   name: 'messageCreate',
//   async execute(message) {
//       const prefix = "!";
      
//       if (!message.content.startsWith(prefix) || message.author.bot) return;

//       const command = message.client.prefixCommands.get(message.name);

//       if (!command) return;

//       try {
//           await command.execute(message);
//       } catch (error) {
//           console.error(error);
//           await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//       }
//   },
// };