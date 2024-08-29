import { readTypescriptFiles } from '../../utils';
import { join as joinPath } from 'path';
import { CommandAccessType, DiscordClient } from '../../ts';
import Config from '../../config';

const COMMANDS_DIR_PATH = '../commands';

export default async function commandHandler(client: DiscordClient) {
  // Read the commands folder and import the files
  const commandsFiles = await readTypescriptFiles(joinPath(__dirname, COMMANDS_DIR_PATH));

  // Loop through the files and set the commands
  for (const commandFile of commandsFiles) {
    const command = (await import(`${COMMANDS_DIR_PATH}/${commandFile}`)).default;

    // Set the command
    client.commandList.set(command.name, command);
  }
}

export async function registerCommands(client: DiscordClient) {
  // Register slash commands
  await client.application?.commands
    .set(client.commandList.filter((c) => c.accessType === CommandAccessType.ALL).map((command) => command.data))
    .then(() => {
      console.log('SlashCommands >> to all access registered!');
    })
    .catch(console.error);

  // Register slash commands to community guild access
  await client.guilds
    .resolve(Config.DISCORD.COMMUNITY_GUILD_ID)
    ?.commands.set(client.commandList.filter((c) => c.accessType === CommandAccessType.COMMUNITY_GUILD).map((command) => command.data))
    .then(() => {
      console.log('SlashCommands >> to community guild access registered!');
    })
    .catch(console.error);

  // TODO: Register Project server slash commands

  // TODO: Register DM slash commands
}
