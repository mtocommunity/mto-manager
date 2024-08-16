import { Client, IntentsBitField } from 'discord.js';
import eventHandler from './eventHandler';
import Config from '../config';

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

eventHandler(client);

client.login(Config.DISCORD.TOKEN);
