import { BtnInteraction, InteractionType } from '../../../ts';
import { buildVerificationCodeModal, buildVerificationEmailStudentModal, buildVerificationEmailTeacherModal } from '../../static/modals';

const verification: BtnInteraction = {
  type: InteractionType.BUTTON,
  key: 'utp_verification',
  run: async (client, interaction, params) => {
    // Check the button params
    if (params.length < 1) {
      interaction.reply({
        content: '❌ | Opción no válida',
        ephemeral: true
      });
      return;
    }

    switch (params[0]) {
      case 'code':
        // interaction.showModal(buildVerificationCodeModal(interaction.user.id));
        interaction.showModal(buildVerificationCodeModal(interaction.user.id));
        break;
      case 'email':
        if (params.length !== 2) {
          interaction.reply({
            content: '❌ | Opción no válida',
            ephemeral: true
          });
          return;
        }
        switch (params[1]) {
          case 'student':
            interaction.showModal(buildVerificationEmailStudentModal(interaction.user.id));
            break;
          case 'teacher':
            interaction.showModal(buildVerificationEmailTeacherModal(interaction.user.id));
            break;
          default:
            interaction.reply({
              content: '❌ | Opción no válida',
              ephemeral: true
            });
            break;
        }
        break;
      default:
        interaction.reply({
          content: '❌ | Opción no válida',
          ephemeral: true
        });
        break;
    }
  }
};

export default verification;
