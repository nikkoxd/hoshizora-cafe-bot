import { Client, Events, GatewayIntentBits } from "discord.js";
import { CommandHandler } from "./commandHandler";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, cl => {
  console.log(`Logged in as ${cl.user.tag}`);
});

const handler = new CommandHandler(client);

client.login(process.env.TOKEN);