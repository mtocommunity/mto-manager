import { config as configEnv } from 'dotenv';
configEnv();

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, IntentsBitField, MessageActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', (message) => {
    console.log(message.content);
    if (message.content === '!ping') {
        message.reply({
            components: [new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Click me!').setCustomId('ping'))]
        });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'ping') {
            const textInput = new TextInputBuilder()
                .setCustomId('utp-email')
                .setRequired(true)
                .setLabel('Correo UTP')
                .setMinLength(20)
                .setMaxLength(20)
                .setPlaceholder('Ejmp: U2103142@utp.edu.pe')
                .setStyle(TextInputStyle.Short);

            const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput);

            const modal = new ModalBuilder().setCustomId('verify1-form').setTitle('Verificación de identidad UTP');

            modal.addComponents(actionRow);

            interaction.showModal(modal);
        } else if (interaction.customId === 'verify-code') {
            const textInput = new TextInputBuilder()
                .setCustomId('verify-code')
                .setRequired(true)
                .setLabel('Código de verificación')
                .setMinLength(6)
                .setMaxLength(6)
                .setPlaceholder('Ejmp: 123456')
                .setStyle(TextInputStyle.Short);

            const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput);

            const modal = new ModalBuilder().setCustomId('verify2-form').setTitle('Verificación de identidad UTP');

            modal.addComponents(actionRow);

            interaction.showModal(modal);
        }
    } else if (interaction.isModalSubmit()) {
        interaction.reply({
            ephemeral: true,
            content: 'Una vez te llegue el código de verificación, por favor da click en el boton.',
            components: [new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Verificar').setCustomId('verify-code'))]
        });
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
