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

  set(name, object) {
    if (isFunction(object)) {
      this.components[name] = object;
    } else if (isEmpty(object)) {
      throw new Error(`${name} component cannot be empty`);
    } else {
      throw new Error(`${object} must be a function`);
    }
  }

  async call(method, data, message, client) {
    if (this.methods.includes(method)) {
      const response = await this.components[method](data, message, client);

      if (response) message.reply(String(response));
    } else if (!this.methods.includes(method)) {
      throw new Error(`${method} is not registered`);
    } else {
      throw new Error('method call is not found');
    }
  }
}

module.exports = Components;
