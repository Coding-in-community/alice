const { search } = require('../utils');

class Search {
  constructor() {
    this.name = 'search';
  }

  // eslint-disable-next-line
  async execute(data, message) {
    const { text } = data;

    if (!text) {
      throw new Error('Nenhum texto para pesquisa foi especificado.');
    }

    const results = await search.google(text, undefined, 1);

    if (results.length > 0) {
      const stringResult = results
        .map((r) => Search.formatResult(r))
        .join('\n\n');
      message.reply(stringResult);
      return;
    }

    message.reply(`Nenhum resultado foi encontrado para: _${text}_`);
  }

  static formatResult(object) {
    const { title, link, snippet } = object;
    return `*${title}*\n\n${snippet}\n\n_${link}_`;
  }
}

module.exports = Search;
