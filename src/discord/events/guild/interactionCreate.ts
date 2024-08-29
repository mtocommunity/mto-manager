import { join as joinPath } from 'path';
import { ApplicationCommandType, BaseInteraction, ButtonInteraction } from 'discord.js';
import { BtnInteraction, CommandCategory, DiscordEvent, Interaction, InteractionType, ModalInteraction } from '../../../ts';
import { readTypescriptFiles } from '../../../utils';
import Config from '../../../config';

const INTERACTIONS_DIR_PATH = '../../interactions';

const interactions: Interaction[] = [];

const interactionCreate: DiscordEvent = {
  name: 'interactionCreate',
  description: 'This event is triggered when an interaction is created.',
  load: async () => {
    // Read all interactions files
    const interactionsFiles = await readTypescriptFiles(joinPath(__dirname, INTERACTIONS_DIR_PATH));

    // Import all interactions
    for (const file of interactionsFiles) {
      const interaction = (await import(`${INTERACTIONS_DIR_PATH}/${file}`)).default as Interaction;
      interactions.push(interaction);
    }
  },
  run: (client, interaction: BaseInteraction) => {
    // Ignore others users in development
    if (Config.ENV_DEV && !Config.DISCORD.ADMINISTRATORS_ID.includes(interaction.user.id)) return;

    // Filter the interaction type
    if (interaction.isButton()) {
      interactions
        .filter((i) => i.type === InteractionType.BUTTON)
        .forEach(async (i) => {
          const [key] = interaction.customId.split('-');
          if (i.key === key) {
            // Run the interaction
            (i as BtnInteraction).run(client, interaction, interaction.customId.split('-').slice(1));
          }
        });
    } else if (interaction.isModalSubmit()) {
      interactions
        .filter((i) => i.type === InteractionType.MODAL)
        .forEach(async (i) => {
          const [key] = interaction.customId.split('-');
          if (i.key === key) {
            // Run the interaction
            (i as ModalInteraction).run(client, interaction, interaction.customId.split('-').slice(1));
          }
        });
    } else if (interaction.isCommand()) {
      const command = client.commandList.get(interaction.commandName);

      if (!command) return;

      if (Config.ENV_DEV) {
        // Dev environment

        // Ignore non-experimental commands
        if (command.category !== CommandCategory.EXPERIMENTAL) return;

        // Check user permissions
        if (!Config.DISCORD.ADMINISTRATORS_ID.includes(interaction.user.id)) return;

        // Execute the command
        command.execute(client, interaction);
      } else {
        // Production environment

        // Execute non-experimental commands
        if (command.category !== CommandCategory.EXPERIMENTAL) {
          // Execute the command
          command.execute(client, interaction);
          return;
        }

        // Check user permissions
        if (!Config.DISCORD.ADMINISTRATORS_ID.includes(interaction.user.id)) {
          // User is not authorized
          interaction.reply({
            content: 'Este es un comando experimental y no tienes permisos para usarlo.',
            ephemeral: true
          });
          return;
        }
      }
    }
  }
};

export default interactionCreate;
