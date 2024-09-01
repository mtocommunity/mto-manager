import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { Command, CommandAccessType, CommandCategory } from '../../../ts';
import { getUserProfile } from '../../../database/functions';
import { buildProfileEmbed } from '../../static/embeds';

const Profile: Command = {
  name: 'profile',
  category: CommandCategory.GENERAL,
  accessType: CommandAccessType.COMMUNITY_GUILD,
  data: {
    name: 'profile',
    description: 'Mira tú perfil y el de los demás.',
    options: [
      {
        name: 'colaborador',
        description: 'Consultar el perfil de este usuario.',
        type: ApplicationCommandOptionType.User,
        required: false
      }
    ],
    defaultMemberPermissions: [PermissionFlagsBits.SendMessages]
  },
  load: async (client) => {},
  execute: async (client, interaction) => {
    const user = interaction.options.get('colaborador')?.user || interaction.user;

    const profile = await getUserProfile(user.id);

    if (!profile) {
      await interaction.reply({
        content: ':x: | No se pudo encontrar un perfil para este usuario.',
        ephemeral: true
      });
      return;
    }

    await interaction.reply({ embeds: [buildProfileEmbed(profile, interaction.user)] });
  }
};

export default Profile;
