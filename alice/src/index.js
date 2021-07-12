// imports
const auth = require('./auth');
const parse = require('./parse');
const build = require('./build');

// instances
let session = new auth.Session();
let components = new build.Components();

class Alice {
  constructor(componentsArray) {
    this.options = {
      trigger: 'message',
    };

    componentsArray.map((elem) => {
      components.set(...elem);
    });
  }

  async main(message) {
    let content = new parse.Content(message.body);
    let method = content.method;

    let data = {
      text: content.string,
      args: content.args,
      kwargs: content.kwargs,
    };

    if (method) {
      await components.call(method, data, message, session);
    }
  }

  initialize() {
    if (session.exists) session.load();
    else session.save();

    session.on(this.options.trigger, this.main);
    session.start();
  }
}

module.exports = {
  Alice,
};
