import { GuildMemberRoleManager } from 'discord.js';
import User from '../../../database/models/user';
import VerifyCode from '../../../database/models/verify_code';
import { InteractionType, ModalInteraction } from '../../../ts';
import { COMMUNITY_GUILD } from '../../../config';

const verification: ModalInteraction = {
  key: 'utp_verify_code',
  type: InteractionType.MODAL,
  run: async (client, interaction, params, ...args) => {
    const code = interaction.components[0].components[0].value;

    // Check the code
    if (!code && !code.matchAll(/^[A-Z0-9]{6}$/)) {
      interaction.reply({
        content: '❌ | Opción no válida',
        ephemeral: true
      });
      return;
    }

    // Check if the code is valid
    const verificationCodeData = await VerifyCode.findOne({ where: { user_id: interaction.user.id } });

    if (!verificationCodeData || verificationCodeData.code !== code) {
      interaction.reply({
        content: '❌ | Código de verificación incorrecto',
        ephemeral: true
      });
      return;
    }

    // Check if the code is expired (5 minutes)
    if (verificationCodeData.created_at.getTime() < Date.now() - 5 * 60 * 1000) {
      interaction.reply({
        content: '❌ | Código de verificación expirado',
        ephemeral: true
      });
      return;
    }

    // Verify the user
    const userData = await User.findOne({ where: { user_id: interaction.user.id } });

    if (!userData) return;

    userData.verified = true;
    const guildMemberRoleManager = interaction.member?.roles as GuildMemberRoleManager;

    guildMemberRoleManager.add(COMMUNITY_GUILD.colaboratorRole);
    guildMemberRoleManager.remove(COMMUNITY_GUILD.unverifyRole);

    await userData.save();

    interaction.reply({
      content: '✅ | Verificado correctamente',
      ephemeral: true
    });
  }
};

export default verification;
