import { Client } from 'discord.js';
import { readdir } from 'fs/promises';
import { join as joinPath } from 'path';
import { DiscordEvent } from '../ts';

const EVENT_DIR_PATH = './events';

export default async function (client: Client) {
  // Read the events folder and import the files
  const eventsFiles = (await readEventsFile(joinPath(__dirname, EVENT_DIR_PATH))).map((file) => file.replace('\\', '/').replace('.ts', ''));

  // Loop through the files and listen to the events
  for (const eventFile of eventsFiles) {
    // Import event
    const event: DiscordEvent = (await import(`${EVENT_DIR_PATH}/${eventFile}`)).default;

    // Listen event
    client.on(event.name, (...args) => event.run(client, ...args));
  }
}

/**
 * Read the events folder and return the list of files in recursive mode
 * @param dir Path to the events folder
 * @returns List of files in the events folder in revursive mode
 */
async function readEventsFile(dir: string) {
  return (await readdir(dir, { recursive: true })).filter((file) => file.endsWith('.ts'));
}
