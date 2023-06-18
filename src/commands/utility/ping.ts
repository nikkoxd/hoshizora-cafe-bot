import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Понг!"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply({ ephemeral: true, content: "Понг!" });
  }
}