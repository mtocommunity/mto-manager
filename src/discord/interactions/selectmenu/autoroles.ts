import { GuildMemberRoleManager } from 'discord.js';
import Config from '../../../config';
import { InteractionType, SelectMenuInteraction, TechnologyCategory } from '../../../ts';
import { setTechnologiesToUserWithCategory } from '../../../database/functions';

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
          content: '✅ | Se agregaron los roles de juegos correctamente, serás notificado cuando haya algún evento de juegos.',
          ephemeral: true
        });
        break;
      case 'programming_language':
        // Set technologies to user
        await setTechnologiesToUserWithCategory(interaction.user.id, interaction.values, TechnologyCategory.PROGRAMMING_LANGUAGE);

        await interaction.reply({
          content: '✅ | Ahora estos lenguajes de programación están en tu perfil',
          ephemeral: true
        });
        break;
      case 'markup_language':
        // Set technologies to user
        await setTechnologiesToUserWithCategory(interaction.user.id, interaction.values, TechnologyCategory.MARKUP_LANGUAGE);

        await interaction.reply({
          content: '✅ | Ahora estos lenguajes de marcado están en tu perfil',
          ephemeral: true
        });
        break;
      case 'framework':
        // Set technologies to user
        await setTechnologiesToUserWithCategory(interaction.user.id, interaction.values, TechnologyCategory.FRAMEWORK);

        await interaction.reply({
          content: '✅ | Ahora estos frameworks están en tu perfil',
          ephemeral: true
        });
        break;
    }
  }
};

export default autoroles;
