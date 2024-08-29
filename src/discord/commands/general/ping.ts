import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { Command, CommandAccessType, CommandCategory } from '../../../ts';

const PingCommand: Command = {
  name: 'ping',
  category: CommandCategory.EXPERIMENTAL,
  accessType: CommandAccessType.COMMUNITY_GUILD,
  data: {
    name: 'ping',
    description: "Check the bot's latency.",
    options: [
      {
        name: 'message',
        description: 'The message to send.',
        type: ApplicationCommandOptionType.String,
        maxLength: 100,
        required: false
      }
    ],
    defaultMemberPermissions: [PermissionFlagsBits.Administrator]
  },
  load: async (client) => {
    console.log('Ping command loaded!');
  },
  execute: async (client, interaction) => {
    const message = interaction.options.getString('message') || 'Pong!';
    await interaction.reply(message);
  }
};

export default PingCommand;
