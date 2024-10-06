import { ApplicationCommandOptionType, PermissionFlagsBits, User } from 'discord.js';
import { Command, CommandAccessType, CommandCategory } from '../../../ts';
import { getUserInformation } from '../../../database/functions';

const LookUpCommand: Command = {
  name: 'lookup',
  category: CommandCategory.ADMINISTRATION,
  accessType: CommandAccessType.COMMUNITY_GUILD,
  data: {
    name: 'lookup',
    description: "Look up a user's information.",
    options: [
      {
        name: 'user',
        description: 'User to look up.',
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ],
    defaultMemberPermissions: [PermissionFlagsBits.Administrator]
  },
  execute: async (client, interaction) => {
    const discordUser = interaction.options.get('user')?.user;
    if (!discordUser) return;

    // Get the user's information from the database.
    const data = await getUserInformation(discordUser.id);

    // If the user is not found in the database, return a message to the user.
    if (data === null) {
      interaction.reply({ content: 'User not found.' });
      return;
    }

    // Send the user's information to the user.
    interaction.reply({
      embeds: [
        {
          title: 'User Information',
          fields: [
            { name: 'User ID', value: data.user_id, inline: true },
            { name: 'Discord ID', value: data.discord_id, inline: true },
            { name: 'Username', value: data.username, inline: true },
            { name: 'Email', value: data.email, inline: true },
            { name: 'Verified', value: data.verified ? 'Yes' : 'No', inline: true },
            { name: 'User Code', value: data.user_code, inline: true },
            { name: 'Verify Code', value: data.verifyCode?.code ?? 'No verification code found.', inline: true }
          ]
        }
      ]
    });
  }
};

export default LookUpCommand;
