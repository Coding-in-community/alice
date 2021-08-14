const { Parse, inhibitor } = require('../utils');

/**
 * Commands wrapper.
 */
class Commands {
  constructor() {
    this.commands = {};
  }

  /**
   * Registers an command.
   * @param {object} cmd - A command.
   */
  register(cmd) {
    if (!Commands.isValid(cmd)) {
      throw new Error(`${cmd} isn't a valid Command!`);
    }

    this.commands[cmd.name] = cmd;
  }

  /**
   * Checks if a message contains an command call. If `true`, call this command.
   * @see https://docs.wwebjs.dev/Message.html
   * @see https://docs.wwebjs.dev/Client.html
   * @param {Message} message
   * @param {Client} client
   */
  async observe(message, client) {
    const { command } = new Parse(message.body);

    if (command) {
      await this.call(message, client);
    }
  }

  /**
   * Calls (executes) an command.
   * @see https://docs.wwebjs.dev/Message.html
   * @see https://docs.wwebjs.dev/Client.html
   * @param {Message} message - The message that called the command.
   * @param {Session} client - The whatsapp web session.
   */
  async call(message, client) {
    const { command } = new Parse(message.body);

    if (!this.has(command)) {
      throw new Error(`${command} is not registered.`);
    }

    if (await inhibitor(this.commands[command].options, message)) {
      return;
    }

    try {
      await this.commands[command].execute(message, client);
    } catch (e) {
      message.reply(`❗ ${e.message}`);
    }
  }

  /**
   * Checks if an command is registered.
   * @param {string} cmdName - The command's name.
   * @returns {boolean} `true` if the command is registered, `false` if not.
   */
  has(cmdName) {
    const availableCommands = Object.keys(this.commands);
    return availableCommands.includes(cmdName);
  }

  /**
   * Checks if an command is valid.
   * @param {any} cmd - The command instance.
   * @returns {boolean} `true` if the command is valid, `false` if not.
   */
  static isValid(cmd) {
    if (cmd.name && cmd.execute && typeof cmd.execute === 'function') {
      return true;
    }
    return false;
  }
}

module.exports = Commands;
