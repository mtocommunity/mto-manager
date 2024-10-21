import { GuildMember, GuildMemberRoleManager } from 'discord.js';
import User from '../../../database/models/user';
import { InteractionType, ModalInteraction } from '../../../ts';
import Config from '../../../config';
import { deleteCode, deleteCodeAuthorized, existCode } from '../../../database/functions';

const verification: ModalInteraction = {
  key: 'utp_verify_code',
  type: InteractionType.MODAL,
  run: async (client, interaction, params, ...args) => {
    const memberId = (interaction.member as GuildMember).id;
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
    const verificationCodeDat = await existCode(memberId);
    if (!verificationCodeDat) {
      interaction.reply({ content: '❌ | No existe un código de verificación', ephemeral: true });
      return;
    }

    // Check if the code is correct
    if (verificationCodeDat.code !== code) {
      interaction.reply({
        content: '❌ | Código de verificación incorrecto',
        ephemeral: true
      });
      return;
    }

    // Check if the code is expired (15 minutes)
    if (verificationCodeDat.created_at.getTime() < Date.now() - 15 * 60 * 1000) {
      await deleteCode(interaction.user.id);
      interaction.reply({
        content: '❌ | Código de verificación expirado',
        ephemeral: true
      });
      return;
    }

    // Verify the user
    const userData = await User.findOne({ where: { discord_id: interaction.user.id } });

    if (!userData) return;

    userData.verified = true;
    const guildMemberRoleManager = interaction.member?.roles as GuildMemberRoleManager;

    // Set the roles
    await guildMemberRoleManager.add(Config.COMMUNITY_GUILD.colaboratorRole);
    await guildMemberRoleManager.remove(Config.COMMUNITY_GUILD.unverifyRole);
    await deleteCode(interaction.user.id);

    // Save the user
    await userData.save();
    await deleteCodeAuthorized(userData.user_code.toUpperCase());

    interaction.reply({
      content: '✅ | Verificado correctamente',
      ephemeral: true
    });
  }
};

export default verification;
