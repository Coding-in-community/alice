const auth = require('./auth');
const { Parse } = require('./parse');
const build = require('./build');

const session = new auth.Session();
const components = new build.Components();

class Alice {
  constructor(componentsArray) {
    this.options = {
      trigger: 'message_create',
    };

    componentsArray.forEach((elem) => {
      components.set(...elem);
    });
  }

  static async onMessage(message) {
    const data = new Parse(message.body);

    if (data.method) {
      await components.call(data.method, data, message, session);
    }
  }

  initialize() {
    if (session.exists) session.load();
    else session.create();

    session.on(this.options.trigger, Alice.onMessage);
    session.start();
  }
}

module.exports = {
  Alice,
};
