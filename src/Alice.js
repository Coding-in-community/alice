const auth = require('./auth');
const { Parse } = require('./utils/Parse');
const build = require('./build');

const session = new auth.Session();
const commands = new build.Commands();

class Alice {
  constructor(commandsArray) {
    this.options = {
      trigger: 'message_create',
    };

    commandsArray.forEach((cmd) => {
      commands.set(...cmd);
    });
  }

  static async onMessage(message) {
    const data = new Parse(message.body);

    if (data.command) {
      await commands.call(data.command, data, message, session);
    }
  }

  initialize() {
    if (session.exists) {
      session.load();
    } else {
      session.create();
    }

    session.on(this.options.trigger, Alice.onMessage);
    session.start();
  }
}

module.exports = {
  Alice,
};
