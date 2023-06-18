import { Client } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

export class EventHandler {
  constructor(client: Client) {
    const eventsPath = path.join(__dirname, "events");
    const eventFiles = readdirSync(eventsPath).filter(file => [".js", ".ts"].some(type => file.endsWith(type)));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
}