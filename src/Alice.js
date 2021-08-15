const { Session } = require('./auth');
const { Commands } = require('./build');

const commands = new Commands();
const defaultOptions = { commands: [], modules: [] };

/**
 * @param {object} options
 * @param {object[]} options.commands
 * @param {object[]} options.modules
 */
class Alice {
  constructor(options) {
    this.session = new Session();
    this.options = { ...defaultOptions, ...options };

    this.options.commands.forEach((cmd) => {
      commands.register(cmd);
    });
  }

  init() {
    this.session.on('message_create', (msg) =>
      commands.observe(msg, this.session)
    );

    this.options.modules.forEach((m) => {
      this.session.on(m.trigger, (..._) => m.callback(this.session, ..._));
    });

    this.session.start();
  }
}

module.exports = {
  Alice,
};
