import { Message } from 'discord.js';
import { DiscordEvent } from '../../../ts';

/**
 * This event is triggered when a message is created.
 */
const messageCreateEvent: DiscordEvent = {
  name: 'messageCreate',
  description: 'This event is triggered when the bot is ready.',
  run: (client, msg: Message) => {
    if (msg.author.bot) return;
    if (msg.content === '!ping') {
      msg.reply('Pong!');
    }
  }
};

export default messageCreateEvent;
