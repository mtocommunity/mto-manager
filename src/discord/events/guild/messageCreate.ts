import { Message } from 'discord.js';
import { DiscordEvent } from '../../../ts';
import MailSenderClient from '../../../services/MailSenderClient';

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

      // TODO: remove this line
      //   MailSenderClient.sendVerifyEmail('u22203189@utp.edu.pe', '123456');
    }
    if (msg.content === '!asd') {
    }
  }
};

export default messageCreateEvent;
