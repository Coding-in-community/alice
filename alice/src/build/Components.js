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

  has(method) {
    return this.methods.includes(method);
  }

  async call(method, data, message, client) {
    if (!this.has(method)) {
      throw new Error(`${method} is not registered`);
    }

    const response = await this.components[method](data, message, client);
    if (response) {
      message.reply(String(response));
    }
  }
}

module.exports = Components;
