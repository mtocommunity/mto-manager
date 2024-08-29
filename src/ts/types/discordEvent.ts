import { ClientEvents } from 'discord.js';
import { DiscordClient } from './discordClient';

export type DiscordEvent = {
  name: keyof ClientEvents;
  description: string;
  load?: (client: DiscordClient) => void | Promise<void>;
  run: (client: DiscordClient, ...args: any[]) => void | Promise<void>;
};
