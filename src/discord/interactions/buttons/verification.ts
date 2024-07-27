import { BtnInteraction, InteractionType } from '../../../ts';
import { buildVerificationEmailModal } from '../../modals';

const verification: BtnInteraction = {
  type: InteractionType.BUTTON,
  key: 'utp_verification',
  run: async (client, interaction, params) => {
    interaction.showModal(buildVerificationEmailModal(interaction.user.id));
  }
};

export default verification;
