/**
 * Extract useful data from a given string (usually the content of a message).
 * @example
 * const messageContent = '!command --arg1 --kwarg=1 any text here'
 * const data = new Parse(messageContent)
 * data.command // command
 * data.args // ['arg1']
 * data.kwargs // { kwarg: 1 }
 * data.text // 'any text here'
 */
class Parse {
  rawText: string;
  readonly REGEXP: {
    command: RegExp;
    args: RegExp;
    kwargs: RegExp;
  };

  constructor(text: string) {
    this.rawText = text.trim(); // The original text
    this.REGEXP = {
      command: /^!([^\s]+)/, // !command
      args: /--([\S]+)(?=\s|$)/g, // --arg1
      kwargs: /--([a-zA-Z0-9_-]+)="?([a-z0-9\.]+)"?/g, // --kwarg=1 // eslint-disable-line
    };
  }

  get command(): string {
    const matches = this.rawText.match(this.REGEXP.command);

    return matches ? matches[1] : '';
  }

  get args(): string[] {
    const matchesIter = this.rawText.matchAll(this.REGEXP.args);
    const matchesArray = [...matchesIter];
    const matches = matchesArray.map((elem) => elem[1]);

    return matches;
  }

  get kwargs(): { [kwarg: string]: string } {
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
      .replace(this.REGEXP.command, '')
      .replace(this.REGEXP.args, '')
      .replace(this.REGEXP.kwargs, '')
      .trim();
  }
}

export default Parse;
