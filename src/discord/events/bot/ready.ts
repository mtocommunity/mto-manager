import { DiscordEvent } from '../../../ts';

/**
 * This event is triggered when the bot is ready.
 */
const readyEvent: DiscordEvent = {
  name: 'ready',
  description: 'This event is triggered when the bot is ready.',
  run: (client) => {
    console.log(`Logged in as ${client.user?.tag}!`);
  }
};

export default readyEvent;
