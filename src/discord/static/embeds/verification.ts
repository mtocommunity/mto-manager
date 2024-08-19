import { EmbedBuilder } from 'discord.js';

export const EmailSendWaitCodeEmbed = (email: string): EmbedBuilder => {
  return new EmbedBuilder()
    .setTitle('Revisa tu correo')
    .setDescription(
      `Se ha enviado un correo a __${email.toLowerCase()}__ con el código de verificación.\n\nDa click al boton de **verificar** para continuar.\n> En caso no te haya llegado el correo, revisa la bandeja de spam.`
    )
    .setColor(14947446);
};

export function buildCodeNotAuthorizedEmbed() {
  return new EmbedBuilder()
    .setColor(14947446)
    .setTitle('Usuario no autorizado')
    .setDescription(
      'Tu código de usuario no está autorizado para acceder a la comunidad. El acceso está restringido a estudiantes de Ingeniería de Sistemas.\n\nSi crees que esto es un error, puedes enviarnos un correo explicando la situación e indicándonos tu código de UTP a\n```contact@mtocommunity.com```'
    );
}
