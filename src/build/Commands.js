/**
 * Commands wrapper.
 */
class Commands {
  constructor() {
    this.commands = {};
  }

  /**
   * Sets an command in Commands instance.
   * @param {object} cmd - A command.
   */
  register(cmd) {
    if (!Commands.isValid(cmd)) {
      throw new Error(`${cmd} isn't a valid Command!`);
    }

    this.commands[cmd.name] = cmd;
  }

  /**
   * Checks if an command is set in Commands instance.
   * @param {string} cmdName - The command's name.
   * @returns {boolean} `true` if the command is set in Commands instance, `false` if not.
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

  /**
   * Calls (executes) a command.
   * @see https://docs.wwebjs.dev/Message.html
   * @see https://docs.wwebjs.dev/Client.html
   * @param {object} data - The data extracted from the message that called the command.
   * @param {string} data.command - The command's name.
   * @param {string[]} data.args - The command's args.
   * @param {object} data.kwargs - The command's kwargs.
   * @param {string} data.text - The text. This text NOT includes command's name, args and kwargs.
   * @param {Message} message - The message that called the command.
   * @param {Session} client - The whatsapp web session.
   */
  async call(data, message, client) {
    if (!this.has(data.command)) {
      throw new Error(`${data.command} is not registered.`);
    }

    try {
      await this.commands[data.command].execute(data, message, client);
    } catch (e) {
      message.reply(`❗ ${e.message}`);
    }
  }
}

module.exports = Commands;
