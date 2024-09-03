import { IntentsBitField } from 'discord.js';
import { runHandler } from './handlers';
import Config from '../config';
import { DiscordClient } from '../ts';

if (Config.ENV_DEV) {
  console.log('>> Running in development mode');
}

const client = new DiscordClient({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

runHandler(client);

client.login(Config.DISCORD.TOKEN);
