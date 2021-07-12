const path = require('path');

function _isFunction(object) {
  return typeof object === 'function';
}

function _isEmpty(object) {
  return !object || Object.keys(object).length === 0;
}

class Components {
  constructor() {
    this.components = new Object();
  }

  get methods() {
    return Object.keys(this.components);
  }

  async set(name, object) {
    if (_isFunction(object)) {
      this.components[name] = object;
    } else if (_isEmpty(object)) {
      throw Error(`${name} component cannot be empty`);
    } else {
      throw Error(`${object} must be a function`);
    }
  }

  async call(method, data, message, client) {
    if (this.methods.includes(method)) {
      let response = await this.components[method](data, message, client);

      response && message.reply(String(response));
    } else if (!this.methods.includes(method)) {
      throw Error(`${method} is not registered`);
    } else {
      throw Error('method call is not found');
    }
  }
}

class Path {
  constructor(BASE_PATH) {
    this.BASE_PATH = BASE_PATH;
  }

  create(RELATIVE_PATH, alias) {
    let FILE_PATH = path.join(this.BASE_PATH, RELATIVE_PATH);
    let name = path.parse(FILE_PATH).name;

    alias = alias || name;

    let object = require(FILE_PATH);
    console.log(`Initialized "${alias}" function...`);

    return [alias, object];
  }
}

module.exports = {
  Components,
  Path,
};
