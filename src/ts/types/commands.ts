import { ApplicationCommandDataResolvable, CommandInteraction } from 'discord.js';
import { DiscordClient } from './discordClient';

export enum CommandCategory {
  GENERAL,
  MODERATION,
  ADMINISTRATION,
  FUN,
  EXPERIMENTAL
}

export enum CommandAccessType {
  COMMUNITY_GUILD,
  PROJECT_GUILD,
  DM,
  ALL
}

export type Command = {
  name: string;
  category: CommandCategory;
  accessType: CommandAccessType;
  data: ApplicationCommandDataResolvable;
  load?: (client: DiscordClient) => Promise<void>;
  execute: (client: DiscordClient, interaction: CommandInteraction) => Promise<void>;
};
