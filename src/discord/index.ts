import { Client, IntentsBitField } from 'discord.js';
import eventHandler from './eventHandler';

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

eventHandler(client);

client.login(process.env.DISCORD_BOT_TOKEN);
