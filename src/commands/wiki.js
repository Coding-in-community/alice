const wikijs = require('wikijs').default;
const { Command } = require('../utils');

const STRINGS = {
  help: Command.message`
  Faz uma pesquisa na wikipedia.

  *uso:* \`\`\`!wiki [--args] ...\`\`\`

  *args válidos:*
  \`\`\`--search\`\`\` -> _retorna uma lista com os títulos dos artigos encontrados._
  \`\`\`--help\`\`\` -> _mostra esta mensagem._
  `,
};

class Wiki {
  constructor() {
    this.name = 'wiki';
    this.strings = STRINGS;
    this.wikiOptions = { apiUrl: 'https://pt.wikipedia.org/w/api.php' };
  }

  async execute(data, message) {
    const { text, args } = data;

    if (args.includes('help')) {
      message.reply(this.strings.help);
      return;
    }

    if (!text) {
      throw new Error('Nenhum texto para pesquisa foi especificado.');
    }

    const wiki = wikijs(this.wikiOptions);
    let output;

    if (args.includes('search')) {
      const { results } = await wiki.search(text, 10);
      output = '*Resultados encontrados:*\n\n';
      output += results.join('\n');
      message.reply(output);
      return;
    }

    const page = await wiki.page(text);
    const { title, canonicalurl: url } = page.raw;
    const summary = await page.summary();
    output = `*${title}*\n\n${summary}\n\n_${url}_`;
    message.reply(output);
  }
}

module.exports = Wiki;
