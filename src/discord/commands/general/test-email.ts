import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { Command, CommandAccessType, CommandCategory } from '../../../ts';
import emailSender from '../../../services/SimpleEmailService';

const TestEmail: Command = {
  name: 'test-email',
  category: CommandCategory.ADMINISTRATION,
  accessType: CommandAccessType.COMMUNITY_GUILD,
  data: {
    name: 'test-email',
    description: 'Test email sending.',
    options: [
      {
        name: 'email',
        description: 'Destination email address.',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'content',
        description: 'Email content.',
        type: ApplicationCommandOptionType.String,
        required: false
      }
    ],
    defaultMemberPermissions: [PermissionFlagsBits.Administrator]
  },
  execute: async (client, interaction) => {
    const email = interaction.options.get('email')?.value as string;
    const content = interaction.options.get('content')?.value as string | undefined;

    // Check if is a valid email address.
    if (!email || email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
      interaction.reply({ content: 'Invalid email address.', ephemeral: true });
      return;
    }

    if (await emailSender.sendTestEmail(email, content)) {
      interaction.reply({ content: 'Email sent.', ephemeral: true });
    } else {
      interaction.reply({ content: 'Failed to send email.', ephemeral: true });
    }
  }
};

export default TestEmail;
