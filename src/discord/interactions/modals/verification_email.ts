import { ActionRowBuilder, MessageActionRowComponentBuilder, ModalSubmitInteraction } from 'discord.js';
import { InteractionType, ModalInteraction } from '../../../ts';
import { buildVerificationCodeButton } from '../../static/buttons';
import { buildCodeNotAuthorizedEmbed, EmailSendWaitCodeEmbed } from '../../static/embeds';
import { generateAlphaNumericCode } from '../../../utils';
import User from '../../../database/models/user';
import VerifyCode from '../../../database/models/verify_code';
import { isAuthorized } from '../../../database/functions';
import emailSender from '../../../services/SimpleEmailService';

const verification: ModalInteraction = {
  key: 'utp_verify_email',
  type: InteractionType.MODAL,
  run: async (client, interaction, params, ...args) => {
    const email = interaction.components[0].components[0].value.toLocaleLowerCase();

    if (params[0] !== 'student') return;

    // Check the email
    if (!email || !email.match(/^u[0-9]{8}@utp.edu.pe$/)) {
      interaction.reply({
        content: '❌ | Correo no válido, debes usar tu correo UTP',
        ephemeral: true
      });
      return;
    }

    // check if code is authorized
    const userCode = email.split('@')[0].toUpperCase();
    if (!(await isAuthorized(userCode))) {
      interaction.reply({
        embeds: [buildCodeNotAuthorizedEmbed()],
        ephemeral: true
      });
      return;
    }

    // Check if the email is already registered
    const verificationCodeData = await VerifyCode.findOne({ where: { discord_id: interaction.user.id } });

    if (verificationCodeData && verificationCodeData.created_at.getTime() > Date.now() - 120 * 1000) {
      // Code was sent less than 2 minutes ago
      interaction.reply({
        content: '❌ | Ya se ha enviado un código de verificación, espera un momento',
        ephemeral: true
      });
      return;
    }

    // Check if the email is already registered
    const userData = await User.findOne({ where: { email: email } });

    if (userData) {
      if (userData.verified) {
        // User already verified
        interaction.reply({
          content: '❌ | Este correo ya está registrado',
          ephemeral: true
        });
        return;
      } else {
        // User not verified
        const code = generateAlphaNumericCode(6);

        // Send the email
        if (!(await sendEmail(email, code, interaction))) return;

        if (verificationCodeData) {
          // Update the code
          verificationCodeData.code = code;
          verificationCodeData.created_at = new Date();
          await verificationCodeData?.save();
        } else {
          // Create a new code
          const verificationCode = new VerifyCode({
            discord_id: interaction.user.id,
            code: code
          });
          await verificationCode.save();
        }
      }

      return;
    }

    // Check if the user is already registered
    const discordUserData = await User.findOne({ where: { discord_id: interaction.user.id } });
    if (discordUserData) {
      discordUserData.email = email;
      if (discordUserData.verified) {
        interaction.reply({
          content: '❌ | Este correo ya está registrado',
          ephemeral: true
        });
        return;
      }
      await discordUserData.save();
      const verificationCodeData = await VerifyCode.findOne({ where: { discord_id: interaction.user.id } });
      if (verificationCodeData) {
        const code = generateAlphaNumericCode(6);
        verificationCodeData.code = code;
        verificationCodeData.created_at = new Date();
        await verificationCodeData.save();
        await sendEmail(email, code, interaction);
      } else {
        const code = generateAlphaNumericCode(6);
        const verificationCode = new VerifyCode({
          discord_id: interaction.user.id,
          code: code
        });
        await verificationCode.save();
        await sendEmail(email, code, interaction);
      }
      return;
    }

    // Register user
    const user = new User({
      discord_id: interaction.user.id,
      username: interaction.user.username,
      user_code: email.split('@')[0].toUpperCase(),
      email: email
    });

    await user.save();

    const code = generateAlphaNumericCode(6);
    const verificationCode = new VerifyCode({
      discord_id: interaction.user.id,
      code: code
    });

    await sendEmail(email, code, interaction);
    await verificationCode.save();
  }
};

async function sendEmail(email: string, code: string, interaction: ModalSubmitInteraction): Promise<boolean> {
  const sentEmail = await emailSender.sendVerifyEmail(email, code);

  if (!sentEmail) {
    interaction.reply({
      content: '❌ | Opción no válida',
      ephemeral: true
    });
    return false;
  }

  interaction.reply({
    embeds: [EmailSendWaitCodeEmbed(email)],
    components: [new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(buildVerificationCodeButton())],
    ephemeral: true
  });

  return true;
}

export default verification;
