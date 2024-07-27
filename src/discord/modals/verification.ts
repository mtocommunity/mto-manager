import { TextInputBuilder, TextInputStyle } from 'discord.js';

/**
 * This function create a verification email modal with the user's ID for tracking purposes
 * @param userId Discord user id
 * @returns
 */
export function buildVerificationEmailModal(userId: string) {
  return new TextInputBuilder()
    .setCustomId(`utp_verify_email-${userId}`)
    .setRequired(true)
    .setLabel('Correo UTP')
    .setMinLength(20)
    .setMaxLength(20)
    .setPlaceholder('Ejmp: U2103142@utp.edu.pe')
    .setStyle(TextInputStyle.Short);
}

/**
 * This function create a verification code modal with the user's ID for tracking purposes
 * @param userId Discord user id
 * @returns
 */
export function buildVerificationCodeModal(userId: string) {
  return new TextInputBuilder()
    .setCustomId(`utp_verify_code-${userId}`)
    .setRequired(true)
    .setLabel('Código de verificación')
    .setMinLength(6)
    .setMaxLength(6)
    .setPlaceholder('Ejmp: AX2L3F')
    .setStyle(TextInputStyle.Short);
}
