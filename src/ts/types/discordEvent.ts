import { Client, ClientEvents } from 'discord.js';

export type DiscordEvent = {
  name: keyof ClientEvents;
  description: string;
  load?: (client: Client) => void | Promise<void>;
  run: (client: Client, ...args: any[]) => void | Promise<void>;
};
