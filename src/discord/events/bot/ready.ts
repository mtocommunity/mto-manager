import { DiscordEvent } from '../../../ts';
import { registerCommands } from '../../handlers/commandHandler';

/**
 * This event is triggered when the bot is ready.
 */
const readyEvent: DiscordEvent = {
  name: 'ready',
  description: 'This event is triggered when the bot is ready.',
  run: (client) => {
    // Log that the bot is ready
    console.log(`Logged in as ${client.user?.tag}!`);

    // Register slash commands
    registerCommands(client);
  }
};

export default readyEvent;
