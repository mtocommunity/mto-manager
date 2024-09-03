import Config from '../../../config';
import { addExperienceToUser, getUserProfile } from '../../../database/functions';
import { DiscordEvent } from '../../../ts';
import { requiredExperience } from '../../../utils';

const message: DiscordEvent = {
  name: 'messageCreate',
  description: 'Experience event on messageCreate',
  run: async (client, message) => {
    if (message.author.bot) return;

    if (!Config.ENV_DEV) return;

    if (message.content.startsWith('!'))
      return message.reply({
        content: JSON.stringify(await getUserProfile(message.author.id))
      });

    addExperienceToUser(message.author.id, message.content.length);
    console.log(requiredExperience((await getUserProfile(message.author.id))?.level ?? 0 + 1));
  }
};

export default message;
