import { Client, Collection, Events, Interaction } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

export class CommandHandler {
  constructor(client: Client) {
    client.commands = new Collection();

    const foldersPath = path.join(__dirname, "commands");
    const commandFolders = readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = readdirSync(commandsPath).filter(file => [".js", ".ts"].some(type => file.endsWith(type)));
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
          console.log(`Successfuly loaded the command at ${filePath}`);
          client.commands.set(command.data.name, command);
        } else {
          console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
      }
    }

    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: "При выполнении команды произошла ошибка!", ephemeral: true });
        } else {
          await interaction.reply({ content: "При выполнении команды произошла ошибка!", ephemeral: true });
        }
      }
    }); 
  }
}