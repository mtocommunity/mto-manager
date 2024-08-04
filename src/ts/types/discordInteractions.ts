/*
  The custom id's of the interactions are splited for "-" and the first part is the key of the interaction
  Example: utp_verification-email-teacher
  Example: utp_verification-code-student
*/

import { ButtonInteraction, Client, ModalSubmitInteraction } from 'discord.js';

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
    run: (client: Client, interaction: ButtonInteraction, params: string[], ...args: any[]) => void | Promise<void>;
}

export interface ModalInteraction extends Interaction {
    run: (client: Client, interaction: ModalSubmitInteraction, params: string[], ...args: any[]) => void | Promise<void>;
}
