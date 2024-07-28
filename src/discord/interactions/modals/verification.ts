import { ActionRowBuilder, MessageActionRowComponentBuilder } from 'discord.js';
import mailSenderClient from '../../../services/MailSenderClient';
import { InteractionType, ModalInteraction } from '../../../ts';
import { buildVerificationCodeButton } from '../../static/buttons';
import { EmailSendWaitCodeEmbed } from '../../static/embeds';

const verification: ModalInteraction = {
  key: 'utp_verify_email',
  type: InteractionType.MODAL,
  run: async (client, interaction, params, ...args) => {
    const email = interaction.components[0].components[0].value;

    // Check the email
    if (!email && params[1] === 'student' && !email.matchAll(/^u[0-9]{8}@utp.edu.pe$/)) {
      interaction.reply({
        content: '❌ | Opción no válida',
        ephemeral: true
      });
      return;
    }

    // TODO: Generate a random code and save it in the database
    const sentEmail = await mailSenderClient.sendVerifyEmail(email, '123456');

    if (!sentEmail) {
      interaction.reply({
        content: '❌ | Opción no válida',
        ephemeral: true
      });
      return;
    }

    interaction.reply({
      embeds: [EmailSendWaitCodeEmbed(email)],
      components: [new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(buildVerificationCodeButton())],
      ephemeral: true
    });
  }
};

export default verification;
