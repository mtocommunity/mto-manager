import eventHandler from './eventHandler';
import commandHandler from './commandHandler';
import { DiscordClient } from '../../ts';

export function runHandler(client: DiscordClient) {
  eventHandler(client);
  commandHandler(client);
}
