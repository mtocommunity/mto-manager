import { Client, ClientEvents } from 'discord.js';

export type DiscordEvent = {
  name: keyof ClientEvents;
  description: string;
  run: (client: Client, ...args: any[]) => void | Promise<void>;
};
