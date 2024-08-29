import { Client } from 'discord.js';
import eventHandler from './eventHandler';
import commandHandler from './commandHandler';

export function runHandler(client: Client) {
  eventHandler(client);
  commandHandler(client);
}
