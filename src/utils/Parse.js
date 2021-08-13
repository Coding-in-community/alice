/**
 * Extract useful data from a given string (usually the content of a message).
 * @example
 * const messageContent = '!command --arg1 --kwarg=1 any text here'
 * const data = new Parse(messageContent)
 * data.command // command
 * data.args // ['arg1']
 * data.kwargs // { kwarg: 1 }
 * data.text // 'any text here'
 * @param {string} text - Text to be parsed.
 */
class Parse {
  constructor(text) {
    /** The original text. */
    this.rawText = text.trim();

    /**
     * A collection of regular expressions used in the extraction of data.
     * @property {string} REGEXP.command - Regular expression for commands. Ex: !command
     * @property {string[]} REGEXP.args - Regular expression for args. Ex: --arg1
     * @property {object} REGEXP.kwargs - Regular expression for kwargs. Ex: --kwarg=1
     */
    this.REGEXP = {
      command: /^!([^\s]+)/,
      args: /--([\S]+)(?=\s|$)/g,
      kwargs: /--([a-zA-Z0-9_-]+)="?([a-z0-9\.]+)"?/g, // eslint-disable-line
    };
  }

  /**
   * Gets the command extracted.
   * @returns {string}
   */
  get command() {
    const matches = this.rawText.match(this.REGEXP.command);
    return matches ? matches[1] : '';
  }

  /**
   * Gets the args extracted.
   * @returns {string[]}
   */
  get args() {
    const matchesIter = this.rawText.matchAll(this.REGEXP.args);
    const matchesArray = [...matchesIter];
    const matches = matchesArray.map((elem) => elem[1]);
    return matches;
  }

  /**
   * Gets the kwargs extracted.
   * @returns {object}
   */
  get kwargs() {
    const obj = {};
    const matchesIter = this.rawText.matchAll(this.REGEXP.kwargs);
    const matchesArray = [...matchesIter];

    matchesArray.forEach((elem) => {
      Object.assign(obj, { [elem[1]]: elem[2] });
    });

    return obj;
  }

  /**
   * Gets the text extracted.
   * @returns {string}
   */
  get text() {
    return this.rawText
      .replace(this.REGEXP.command, '')
      .replace(this.REGEXP.args, '')
      .replace(this.REGEXP.kwargs, '')
      .trim();
  }
}

module.exports = Parse;
