import { join as joinPath } from 'path';
import { BaseInteraction, ButtonInteraction } from 'discord.js';
import { BtnInteraction, DiscordEvent, Interaction, InteractionType, ModalInteraction } from '../../../ts';
import { readTypescriptFiles } from '../../../utils';

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
    }
  }
};

export default interactionCreate;
