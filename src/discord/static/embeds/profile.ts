import { EmbedBuilder, User } from 'discord.js';
import UserProfile from '../../../database/models/user_profile';
import { TechnologyCategory } from '../../../ts';
import { buildExperienceBar } from '../../../utils';

export function buildProfileEmbed(profile: UserProfile, user: User): EmbedBuilder {
  return (
    new EmbedBuilder()
      .setColor(14947446)
      .setThumbnail(user.displayAvatarURL())
      .setTitle(`Perfil de ${user.displayName}`)
      // .setDescription(`:pencil: Biografía:\`\`\`404: Not found\`\`\`\n:arrow_up: Nivel: \`${profile.level}\` ${buildExperienceBar(profile.experience, 100)} \`${profile.level + 1}\`\n\n`)
      .setDescription(`\n:arrow_up: Nivel: \`${profile.level}\` ${buildExperienceBar(profile.experience, 100)} \`${profile.level + 1}\`\n\n`)
      .addFields([
        {
          name: 'Lenguajes de programación',
          value:
            (profile.technologies ?? [])
              .filter((t) => t.category === TechnologyCategory.PROGRAMMING_LANGUAGE)
              .map((t) => `<:${t.name}:${t.emoji_id}> \`${t.extension}\``)
              .join('\n') || '`404: Lenguajes de programación no encontrados`',
          inline: true
        },
        {
          name: 'Lenguajes de marcado',
          value:
            (profile.technologies ?? [])
              .filter((t) => t.category === TechnologyCategory.MARKUP_LANGUAGE)
              .map((t) => `<:${t.name}:${t.emoji_id}> \`${t.extension}\``)
              .join('\n') || '404: Lenguajes de marcado no encontrados',
          inline: true
        }
        // {
        //   name: 'Frameworks',
        //   value:
        //     (profile.technologies ?? [])
        //       .filter((t) => t.category === TechnologyCategory.FRAMEWORK)
        //       .map((t) => `<:${t.name}:${t.emoji_id}> \`${t.extension}\``)
        //       .join('\n') || '`404: Frameworks no encontrados`',
        //   inline: false
        // }
      ])
  );
}
