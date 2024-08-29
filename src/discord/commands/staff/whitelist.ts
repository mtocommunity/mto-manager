import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { Command, CommandAccessType, CommandCategory } from '../../../ts';
import { addCodeAuthorized, deleteCodeAuthorizedCheck } from '../../../database/functions';
import Config from '../../../config';

const Whitelist: Command = {
  name: 'whitelist',
  category: CommandCategory.ADMINISTRATION,
  accessType: CommandAccessType.COMMUNITY_GUILD,
  data: {
    name: 'whitelist',
    description: 'User whitelist management can be verified in the community.',
    options: [
      {
        name: 'action',
        description: 'Add a user to the whitelist.',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'add',
            value: 'add'
          },
          {
            name: 'remove',
            value: 'remove'
          },
          {
            name: 'list',
            value: 'list'
          }
        ],
        required: true
      },
      {
        name: 'code',
        description: "The user's UTP code.",
        type: ApplicationCommandOptionType.String,
        required: true,
        min_length: 9,
        max_length: 9
      }
    ],
    defaultMemberPermissions: [PermissionFlagsBits.Administrator]
  },
  execute: async (client, interaction) => {
    if (!Config.DISCORD.ADMINISTRATORS_ID.includes(interaction.user.id)) {
      await interaction.reply('You are not authorized to use this command.');
      return;
    }

    const action = interaction.options.get('action', true).value;
    const code = (interaction.options.get('code', true).value?.toString() ?? '').toUpperCase();

    // Check if the code is valid
    if (!code.match(/^U[0-9]{8}$/)) {
      await interaction.reply('Invalid UTP code.');
      return;
    }

    switch (action) {
      case 'add':
        // Add the user to the whitelist
        if (await addCodeAuthorized(code)) {
          await interaction.reply(`Added ${code} to the whitelist.`);
        } else {
          await interaction.reply(`Failed to add ${code} to the whitelist.`);
        }
        break;
      case 'remove':
        if (await deleteCodeAuthorizedCheck(code)) {
          await interaction.reply(`Removed ${code} from the whitelist.`);
        } else {
          await interaction.reply(`Failed to remove ${code} from the whitelist.`);
        }
        break;
      case 'list':
        // List all users on the whitelist
        // TODO: Implement this
        break;
    }
  }
};

export default Whitelist;
