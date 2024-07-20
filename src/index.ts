import { config as configEnv } from 'dotenv';
configEnv();

import { Client, IntentsBitField } from 'discord.js';

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', (message) => {
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
