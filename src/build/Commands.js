/**
 * Commands wrapper
 * @param {object} commands - Object that contains the commands.
 * @param {object} commands.* - A command. The key and value must be, respectively, the command name and a callback function for the command.
 */
class Commands {
  constructor() {
    this.commands = {};
  }

  /**
   * Sets a command in Commands instance.
   * @param {string} name - Command's name.
   * @param {function} callback - Callback to command.
   */
  register(cmd) {
    if (!Commands.isValid(cmd)) {
      throw new Error(`${cmd} isn't a valid Command!`);
    }

    this.commands[cmd.name] = cmd;
  }

  /**
   * Checks if a command is set in Commands instance.
   * @param {string} cmdName - The command's name.
   * @returns {boolean} `True` if the command is set in Commands instance, `False` if not.
   */
  has(cmdName) {
    const availableCommands = Object.keys(this.commands);
    return availableCommands.includes(cmdName);
  }

  /**
   * Checks if a command is valid.
   * @param {any} cmd - The command instance.
   * @returns {boolean} `True` if the command is valid, `False` if not.
   */
  static isValid(cmd) {
    if (cmd.name && cmd.execute && typeof cmd.execute === 'function') {
      return true;
    }
    return false;
  }

  /**
   * Calls (executes) a command.
   * @param {object} data - The data extracted from the message that called the command.
   * @param {string} data.command - The command's name extracted from the message.
   * @param {string[]} data.args - The args extracted from the message.
   * @param {object} data.kwargs - The kwargs extracted from the message.
   * @param {string} data.text - The text extracted from the message. This text NOT includes command's name, args and kwargs.
   * @param {Message} message - The message that called the command.
   * @param {Session} client - The whatsapp web session.
   * @see https://docs.wwebjs.dev/Message.html
   * @see https://docs.wwebjs.dev/Client.html
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
