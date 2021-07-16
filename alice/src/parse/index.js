class Parse {
  constructor(text) {
    this.rawText = text.trim();
    this.REGEXP = {
      method: /^!([^\s]+)/,
      args: /--([\S]+)(?=\s|$)/g,
      kwargs: /--([a-zA-Z0-9_-]+)="?([a-z0-9\.]+)"?/g, // eslint-disable-line
    };
  }

  get method() {
    const matches = this.rawText.match(this.REGEXP.method);

    return matches ? matches[1] : '';
  }

  get args() {
    const matchesIter = this.rawText.matchAll(this.REGEXP.args);
    const matchesArray = [...matchesIter];
    const matches = matchesArray.map((elem) => elem[1]);

    return matches;
  }

  get kwargs() {
    const obj = {};

    const matchesIter = this.rawText.matchAll(this.REGEXP.kwargs);
    const matchesArray = [...matchesIter];
    matchesArray.forEach((elem) => {
      Object.assign(obj, { [elem[1]]: elem[2] });
    });

    return obj;
  }

  get text() {
    return this.rawText
      .replace(this.REGEXP.method, '')
      .replace(this.REGEXP.args, '')
      .replace(this.REGEXP.kwargs, '')
      .trim();
  }
}

module.exports = {
  Parse,
};
