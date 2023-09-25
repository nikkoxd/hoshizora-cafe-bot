import { Client, Events, GatewayIntentBits } from "discord.js";
import { EventHandler } from './eventHandler';
import { CommandHandler } from "./commandHandler";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMembers
] });
const eventHandler = new EventHandler(client);
const commandHandler = new CommandHandler(client);

client.login(process.env.TOKEN);