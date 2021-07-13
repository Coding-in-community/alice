// imports
const auth = require('./auth');
const parse = require('./parse');
const build = require('./build');

// instances
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

  static async main(message) {
    const { method, string, args, kwargs } = new parse.Content(message.body);

    const data = {
      text: string,
      args,
      kwargs,
    };

    if (method) {
      await components.call(method, data, message, session);
    }
  }

  initialize() {
    if (session.exists) session.load();
    else session.save();

    session.on(this.options.trigger, Alice.main);
    session.start();
  }
}

module.exports = {
  Alice,
};
