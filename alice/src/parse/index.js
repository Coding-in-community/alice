const REGEXP = {
  // example: !some_method
  method: /^!([^\s]+)/,

  // example: --some_flag
  args: /--([\S]+)(?=\s|$)/g,

  kwargs: /--([a-zA-Z0-9_-]+)="?([a-z0-9\.]+)"?/g, // eslint-disable-line
};

class Content {
  constructor(text) {
    this.text = text.trim();
  }

  get method() {
    const matches = this.text.match(REGEXP.method);

    return matches ? matches[1] : '';
  }

  get args() {
    const matchesIter = this.text.matchAll(REGEXP.args);
    const matchesArray = [...matchesIter];
    const matches = matchesArray.map((elem) => elem[1]);

    return matches;
  }

  get kwargs() {
    const obj = {};

    const matchesIter = this.text.matchAll(REGEXP.kwargs);
    const matchesArray = [...matchesIter];
    matchesArray.forEach((elem) => {
      Object.assign(obj, { [elem[1]]: elem[2] });
    });

    return obj;
  }

  get string() {
    return this.text
      .replace(REGEXP.method, '')
      .replace(REGEXP.args, '')
      .replace(REGEXP.kwargs, '')
      .trim();
  }
}

module.exports = {
  Content,
};
