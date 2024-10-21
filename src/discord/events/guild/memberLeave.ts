import { GuildMember } from 'discord.js';
import { DiscordEvent } from '../../../ts';
import Config from '../../../config';
import { unverifyUser } from '../../../database/functions';

const memberLeave: DiscordEvent = {
  name: 'guildMemberRemove',
  description: 'This event is triggered when a member leaves the guild.',
  run: async (client, member: GuildMember) => {
    // Filter the community guild
    if (member.guild.id !== Config.DISCORD.COMMUNITY_GUILD_ID) return;

    await unverifyUser(member.user.id);
  }
};

export default memberLeave;
