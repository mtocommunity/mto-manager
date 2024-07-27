import { Client } from 'discord.js';
import { DiscordEvent } from '../ts';
import { readTypescriptFiles } from '../utils';
import { join as joinPath } from 'path';

const EVENT_DIR_PATH = './events';

export default async function (client: Client) {
  // Read the events folder and import the files
  const eventsFiles = await readTypescriptFiles(joinPath(__dirname, EVENT_DIR_PATH));

  // Loop through the files and listen to the events
  for (const eventFile of eventsFiles) {
    // Import event
    const event: DiscordEvent = (await import(`${EVENT_DIR_PATH}/${eventFile}`)).default;

    // Listen event
    client.on(event.name, (...args) => event.run(client, ...args));

    // Load event if needed
    if (event.load) await event.load(client);
  }
}
