import { config as configEnv } from 'dotenv';
configEnv();

import { Client, IntentsBitField } from 'discord.js';
import eventHandler from './discord/eventHandler';

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

eventHandler(client);

client.login(process.env.DISCORD_BOT_TOKEN);
