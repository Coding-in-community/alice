import { Parse, inhibitor } from '../utils';
import { Message, Client } from 'whatsapp-web.js';
import { ICommand } from '../types';

class Commands {
  commands: {
    [cmdName: string]: ICommand;
  };

  constructor(commands: ICommand[] = []) {
    this.commands = {};

    commands.forEach(this.register, this);
  }

  register(cmd: ICommand) {
    if (!Commands.isValid(cmd)) {
      throw new Error(`${cmd} isn't a valid Command!`);
    }

    this.commands[cmd.name] = cmd;
  }

  async observe(message: Message, client: Client) {
    const { command } = new Parse(message.body);

    if (command) {
      await this.call(message, client);
    }
  }

  async call(message: Message, client: Client) {
    const { command } = new Parse(message.body);

    if (!this.has(command)) {
      return;
    }

    if (await inhibitor(this.commands[command].options, message)) {
      return;
    }

    try {
      await this.commands[command].execute(message, client);
    } catch (e) {
      if (e instanceof Error) {
        message.reply(`❗ ${e.message}`);
      }
    }
  }

  has(cmdName: string) {
    const availableCommands = Object.keys(this.commands);

    return availableCommands.includes(cmdName);
  }

  static isValid(cmd: ICommand) {
    if (cmd.name && cmd.execute && typeof cmd.execute === 'function') {
      return true;
    }

    return false;
  }
}

export default Commands;
