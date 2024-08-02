import { EmbedBuilder } from 'discord.js';

export const EmailSendWaitCodeEmbed = (email: string): EmbedBuilder => {
  return new EmbedBuilder()
    .setTitle('Revisa tu correo')
    .setDescription(
      `Se ha enviado un correo a __${email.toLowerCase()}__ con el código de verificación.\n\nDa click al boton de **verificar** para continuar.\n> En caso no te haya llegado el correo, revisa la bandeja de spam.`
    )
    .setColor(14947446);
};
