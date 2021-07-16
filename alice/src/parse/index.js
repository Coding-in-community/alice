class Content {
  constructor(text) {
    this.text = text.trim();
    this.REGEXP = {
      method: /^!([^\s]+)/,
      args: /--([\S]+)(?=\s|$)/g,
      kwargs: /--([a-zA-Z0-9_-]+)="?([a-z0-9\.]+)"?/g, // eslint-disable-line
    };
  }

  get method() {
    const matches = this.text.match(this.REGEXP.method);

    return matches ? matches[1] : '';
  }

  get args() {
    const matchesIter = this.text.matchAll(this.REGEXP.args);
    const matchesArray = [...matchesIter];
    const matches = matchesArray.map((elem) => elem[1]);

    return matches;
  }

  get kwargs() {
    const obj = {};

    const matchesIter = this.text.matchAll(this.REGEXP.kwargs);
    const matchesArray = [...matchesIter];
    matchesArray.forEach((elem) => {
      Object.assign(obj, { [elem[1]]: elem[2] });
    });

    return obj;
  }

  get string() {
    return this.text
      .replace(this.REGEXP.method, '')
      .replace(this.REGEXP.args, '')
      .replace(this.REGEXP.kwargs, '')
      .trim();
  }
}

module.exports = {
  Content,
};
