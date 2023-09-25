import { CommandInteraction, JSONEncodable, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

let embeds: any = [];
let choices: any = [];

const folderPath = path.join(__dirname, "/../../embeds");
const files = readdirSync(folderPath).filter(file => [".js", ".ts"].some(type => file.endsWith(type)));

for (const file of files) {
  const filePath = path.join(folderPath, file);

  const fileName = file.split(".", 1);
  const choice = {
    name: fileName[0],
    value: fileName[0]
  }
  choices.push(choice);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Отправить встроенное сообщение в чат")
    .addStringOption((option: SlashCommandStringOption) => 
      option
        .setName("embed")
        .setDescription("Сообщение для отправки")
        .addChoices(choices)
    ),
  async execute(interaction: CommandInteraction) {
    console.log(choices);
  }
}