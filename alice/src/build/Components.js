function isFunction(object) {
  return typeof object === 'function';
}

class Components {
  constructor() {
    this.components = {};
  }

  get methods() {
    return Object.keys(this.components);
  }

  set(name, object) {
    if (!isFunction(object)) {
      throw new Error(`${object} must be a function`);
    }
    this.components[name] = object;
  }

  async call(method, data, message, client) {
    if (!this.methods.includes(method)) {
      throw new Error(`${method} is not registered`);
    }

    const response = await this.components[method](data, message, client);
    if (response) {
      message.reply(String(response));
    }
  }
}

module.exports = Components;
