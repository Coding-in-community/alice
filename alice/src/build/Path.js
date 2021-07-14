const path = require('path');

class Path {
  constructor(BASE_PATH) {
    this.BASE_PATH = BASE_PATH;
  }

  create(RELATIVE_PATH, alias) {
    const FILE_PATH = path.join(this.BASE_PATH, RELATIVE_PATH);
    const { name } = path.parse(FILE_PATH);

    alias = alias || name;

    const object = require(FILE_PATH);
    console.log(`Initialized "${alias}" function...`);

    return [alias, object];
  }
}

module.exports = Path;
