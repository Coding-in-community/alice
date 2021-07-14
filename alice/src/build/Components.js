function isFunction(object) {
  return typeof object === 'function';
}

function isEmpty(object) {
  return !object || Object.keys(object).length === 0;
}

class Components {
  constructor() {
    this.components = {};
  }

  get methods() {
    return Object.keys(this.components);
  }

  async set(name, object) {
    if (isFunction(object)) {
      this.components[name] = object;
    } else if (isEmpty(object)) {
      throw Error(`${name} component cannot be empty`);
    } else {
      throw Error(`${object} must be a function`);
    }
  }

  async call(method, data, message, client) {
    if (this.methods.includes(method)) {
      const response = await this.components[method](data, message, client);

      if (response) message.reply(String(response));
    } else if (!this.methods.includes(method)) {
      throw Error(`${method} is not registered`);
    } else {
      throw Error('method call is not found');
    }
  }
}

module.exports = Components;
