import { ClientOptions, Collection, Client } from 'discord.js';
import { Command } from './commands';

export class DiscordClient extends Client {
  declare commandList: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);

    this.commandList = new Collection();
  }
}
