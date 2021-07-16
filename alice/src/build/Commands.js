function isFunction(object) {
  return typeof object === 'function';
}

class Commands {
  constructor() {
    this.commands = {};
  }

  set(name, callback) {
    if (!isFunction(callback)) {
      throw new Error(`${callback} must be a function`);
    }
    this.commands[name] = callback;
  }

  has(cmd) {
    const availableCommands = Object.keys(this.commands);
    return availableCommands.includes(cmd);
  }

  async call(cmd, data, message, client) {
    if (!this.has(cmd)) {
      throw new Error(`${cmd} is not registered`);
    }

    const response = await this.commands[cmd](data, message, client);
    if (response) {
      message.reply(String(response));
    }
  }
}

module.exports = Commands;
