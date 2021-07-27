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
    this.commands[cmd.name] = cmd;
  }

  /**
   * Checks if a command is set in Commands instance.
   * @param {string} cmd - The command's name.
   * @returns {boolean} `True` if the command is set in Commands instance, `False` if not.
   */
  has(cmd) {
    const availableCommands = Object.keys(this.commands);
    return availableCommands.includes(cmd);
  }

  /**
   * Calls (executes) a command.
   * @param {string} cmd - The command's name to be called.
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
  async call(cmdName, data, message, client) {
    if (!this.has(cmdName)) {
      throw new Error(`${cmdName} is not registered.`);
    }

    try {
      await this.commands[cmdName].execute(data, message, client);
    } catch (e) {
      message.reply(`❗ ${e.message}`);
    }
  }
}

module.exports = Commands;
