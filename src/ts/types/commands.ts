import { ApplicationCommandDataResolvable, Client } from 'discord.js';

export type Command = {
  name: string;
  data: ApplicationCommandDataResolvable;
  load?: (client: Client) => Promise<void>;
  execute: (client: Client, interaction: any) => Promise<void>;
};
