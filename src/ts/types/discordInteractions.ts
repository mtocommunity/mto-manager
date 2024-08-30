/*
  The custom id's of the interactions are splited for "-" and the first part is the key of the interaction
  Example: utp_verification-email-teacher
  Example: utp_verification-code-student
*/

import { ButtonInteraction, ModalSubmitInteraction, StringSelectMenuInteraction } from 'discord.js';
import { DiscordClient } from './discordClient';

export enum InteractionType {
  BUTTON,
  COMMAND,
  MODAL,
  SELECT_MENU
}

export interface Interaction {
  type: InteractionType;
  key: string;
}

export interface BtnInteraction extends Interaction {
  run: (client: DiscordClient, interaction: ButtonInteraction, params: string[], ...args: any[]) => void | Promise<void>;
}

export interface ModalInteraction extends Interaction {
  run: (client: DiscordClient, interaction: ModalSubmitInteraction, params: string[], ...args: any[]) => void | Promise<void>;
}

export interface SelectMenuInteraction extends Interaction {
  run: (client: DiscordClient, interaction: StringSelectMenuInteraction, params: string[], ...args: any[]) => void | Promise<void>;
}
