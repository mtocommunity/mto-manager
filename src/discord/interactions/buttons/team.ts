import { GuildMemberRoleManager } from 'discord.js';
import { getTeam, joinTeam, leaveTeam } from '../../../database/functions';
import { BtnInteraction, InteractionType } from '../../../ts';

const teamInteraction: BtnInteraction = {
  type: InteractionType.BUTTON,
  key: 'team',
  run: async (client, interaction, params, ...args) => {
    if (params.length !== 2 || !['join', 'leave'].includes(params[0]) || !interaction.member) {
      interaction.reply({
        ephemeral: true,
        content: '❌ Interacción invalida.'
      });
      return;
    }

    const team = await getTeam(params[1]);
    if (!team) {
      interaction.reply({
        ephemeral: true,
        content: '❌ Equipo invalido.'
      });
      return;
    }

    const memberRoleManager = interaction.member.roles as GuildMemberRoleManager;

    switch (params[0]) {
      case 'join':
        // Join team
        if (!(await joinTeam(interaction.user.id, team.name))) {
          interaction.reply({
            ephemeral: true,
            content: '❌ No se pudo unir al equipo.'
          });
          return;
        }

        await memberRoleManager.add(team.member_role_id);
        await interaction.reply({
          ephemeral: true,
          content: `✅ Te uniste al \`${team.displayName ?? team.name}\` correctamente.`
        });
        break;
      case 'leave':
        // Leave team
        if (!(await leaveTeam(interaction.user.id, team.name))) {
          interaction.reply({
            ephemeral: true,
            content: '❌ No se pudo dejar el equipo.'
          });
          return;
        }

        await memberRoleManager.remove(team.member_role_id);
        await interaction.reply({
          ephemeral: true,
          content: `✅ Dejaste el \`${team.displayName ?? team.name}\` correctamente.`
        });
        break;
    }
  }
};

export default teamInteraction;
