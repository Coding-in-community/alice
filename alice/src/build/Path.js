const path = require('path');

class Path {
  constructor(BASE_PATH) {
    this.BASE_PATH = BASE_PATH;
  }

  create(RELATIVE_PATH, alias) {
    const FILE_PATH = path.join(this.BASE_PATH, RELATIVE_PATH);
    const { name } = path.parse(FILE_PATH);
    const func = require(FILE_PATH); // eslint-disable-line global-require

    if (alias) {
      return [alias, func];
    }
    return [name, func];
  }
}

module.exports = Path;
