const { Session } = require('./auth');
const { Commands } = require('./build');
const { Parse } = require('./utils');

const session = new Session();
const commands = new Commands();

/**
 * @param {object[]} commandsArray
 */
class Alice {
  constructor(commandsArray) {
    this.events = [
      {
        name: 'message_create',
        callback: Alice.onMessage,
      },
      {
        name: 'group_join',
        callback: Alice.onJoinedGroup,
      },
    ];

    commandsArray.forEach((cmd) => {
      commands.register(cmd);
    });
  }

  init() {
    this.events.forEach((e) => {
      session.on(e.name, e.callback);
    });

    session.start();
  }

  // --- Only events callbacks below ---

  static async onMessage(message) {
    const data = new Parse(message.body);

    if (data.command) {
      await commands.call(data, message, session);
    }
  }

  static async onJoinedGroup(notification) {
    const contacts = await notification.getRecipients();

    contacts.forEach(async (c) => {
      const chat = await c.getChat();
      await chat.sendMessage(
        `Bem vindo(a) a comunidade Coding, ${c.pushname}!`
      );
    });
  }
}

module.exports = {
  Alice,
};
