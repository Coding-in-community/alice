const REGEXP = {
  // example: !some_method
  METHOD: /^!([^\s]+)/,

  // example: --some_flag
  ARGS: /--([\S]+)(?=\s|$)/g,

  KWARGS: /--([a-zA-Z0-9_-]+)="?([a-z0-9\.]+)"?/g, // eslint-disable-line
};

class Content {
  constructor(text) {
    this.originalText = text.trim();
  }

  get method() {
    const matches = this.originalText.match(REGEXP.METHOD);

    return matches ? matches[1] : '';
  }

  get args() {
    const matchesIter = this.originalText.matchAll(REGEXP.ARGS);
    const matchesArray = [...matchesIter];
    const matches = matchesArray.map((elem) => elem[1]);

    return matches;
  }

  get kwargs() {
    const obj = {};

    const matchesIter = this.originalText.matchAll(REGEXP.KWARGS);
    const matchesArray = [...matchesIter];
    const matches = matchesArray.forEach((elem) => { // eslint-disable-line
      Object.assign(obj, { [elem[1]]: elem[2] });
    });

    return obj;
  }

  get string() {
    return this.originalText
      .replace(REGEXP.METHOD, '')
      .replace(REGEXP.ARGS, '')
      .replace(REGEXP.KWARGS, '')
      .trim();
  }
}

module.exports = {
  Content,
};
