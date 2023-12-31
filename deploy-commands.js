const { REST, Routes } = require("discord.js");
const { readdirSync } = require("node:fs");
const dotenv = require("dotenv");
const path = require("node:path");

const env = process.env.NODE_ENV || "development";

dotenv.config();

const commands = [];
const foldersPath = path.join(__dirname, "dist/commands");
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ("data" in command && "execute" in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		let data;

		if (env == ("development" || "dev")) {
			data = await rest.put(
				Routes.applicationGuildCommands(process.env.CLIENT, process.env.DEVSERVER),
				{ body: commands },
			);
		} else {
			data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT),
				{ body: commands },
			);
		}

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();