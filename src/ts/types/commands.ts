import { ApplicationCommandDataResolvable } from 'discord.js';
import { DiscordClient } from './discordClient';

export enum CommandCategory {
  GENERAL,
  MODERATION,
  ADMINISTRATION,
  FUN,
  EXPERIMENTAL
}

export type Command = {
  name: string;
  category: CommandCategory;
  data: ApplicationCommandDataResolvable;
  load?: (client: DiscordClient) => Promise<void>;
  execute: (client: DiscordClient, interaction: any) => Promise<void>;
};
