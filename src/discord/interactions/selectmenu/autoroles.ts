import { GuildMemberRoleManager } from 'discord.js';
import Config from '../../../config';
import { InteractionType, SelectMenuInteraction } from '../../../ts';

const autoroles: SelectMenuInteraction = {
  key: 'utp_autoroles',
  type: InteractionType.SELECT_MENU,
  run: async (client, interaction, params, ...args) => {
    if (interaction.guildId !== Config.DISCORD.COMMUNITY_GUILD_ID) return;

    switch (params[0]) {
      case 'game':
        // Game role
        const guildMemberRoleManager = interaction.member?.roles as GuildMemberRoleManager;
        await Config.DISCORD.AUTO_ROLES.forEach(async (role) => {
          if (interaction.values.includes(role.key)) {
            await guildMemberRoleManager.add(role.role);
          } else {
            guildMemberRoleManager.cache.has(role.role) && (await guildMemberRoleManager.remove(role.role));
          }
        });

        await interaction.reply({
          content: '✅ | Se agregaron los roles de juegos correctamente',
          ephemeral: true
        });
        break;
      case 'programming_language':
        // TODO: Add programming language roles
        break;
    }
  }
};

export default autoroles;
