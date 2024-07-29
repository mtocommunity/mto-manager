import { config as configEnv } from 'dotenv';
configEnv();

import { Client, IntentsBitField } from 'discord.js';
import eventHandler from './discord/eventHandler';
import { verifyConnection as verifyDatabase } from './database';

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

eventHandler(client);
verifyDatabase();

client.login(process.env.DISCORD_BOT_TOKEN);
