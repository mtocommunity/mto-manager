import { Client, IntentsBitField } from 'discord.js';
import { runHandler } from './handlers';
import Config from '../config';

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

runHandler(client);

client.login(Config.DISCORD.TOKEN);
