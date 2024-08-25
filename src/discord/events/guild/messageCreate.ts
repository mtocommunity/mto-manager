import { Message } from 'discord.js';
import { DiscordEvent } from '../../../ts';
import Config from '../../../config';

/**
 * This event is triggered when a message is created.
 */
const messageCreateEvent: DiscordEvent = {
  name: 'messageCreate',
  description: 'This event is triggered when the bot is ready.',
  run: (client, msg: Message) => {
    // Ignore others users in development
    if (Config.ENV_DEV && !Config.DISCORD.ADMINISTRATORS_ID.includes(msg.author.id)) return;

    if (msg.author.bot) return;
    if (msg.content === '!ping') {
      msg.reply('Pong!');

      // TODO: remove this line
      // emailSender.sendVerifyEmail('U22203189@utp.edu.pe', '123456');
    }
    if (msg.content === '!asd') {
    }
  }
};

export default messageCreateEvent;
