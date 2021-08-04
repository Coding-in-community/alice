const { search } = require('../utils');

const STRINGS = {
  help: `
Retorna o primeiro resultado de uma pesquisa no google.

*uso:* \`\`\`!cron [--args] ...\`\`\`

*args válidos:*
  \`\`\`--help\`\`\` -> _mostra esta mensagem._
  \`\`\`--target\`\`\` -> _define um site especifico para pesquisa._
  \`\`\`--limit\`\`\` -> _define um limite de resultados. O padrão é 1._
  `.trim(),
};

class Search {
  constructor() {
    this.name = 'search';
    this.strings = STRINGS;
  }

  async execute(data, message) {
    const { args, text, kwargs } = data;

    if (args.includes('help')) {
      message.reply(this.strings.help);
      return;
    }

    if (!text) {
      throw new Error('Nenhum texto para pesquisa foi especificado.');
    }

    const results = await search(text, kwargs.target, kwargs.limit);

    if (results.length > 0) {
      const stringResult = results
        .map((r) => Search.formatResult(r))
        .join('\n\n🔹🔹🔹\n\n');
      message.reply(stringResult);
      return;
    }

    message.reply(`Nenhum resultado foi encontrado para: _${text}_`);
  }

  static formatResult(result) {
    const { title, link, snippet } = result;
    return `*${title}*\n\n${snippet}\n\n_${link}_`;
  }
}

module.exports = Search;
