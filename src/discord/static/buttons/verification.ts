import { ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';

export const buildVerificationCodeButton = (): ButtonBuilder => {
  return new ButtonBuilder().setCustomId(`utp_verification-code`).setLabel('Verificar').setStyle(ButtonStyle.Success);
};
