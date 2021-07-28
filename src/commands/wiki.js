const wikijs = require('wikijs').default;

class Wiki {
  constructor() {
    this.name = 'wiki';
    this.wikiOptions = { apiUrl: 'https://pt.wikipedia.org/w/api.php' };
  }

  async execute(data, message) {
    const { text, args } = data;
    const wiki = wikijs(this.wikiOptions);
    let output;

    if (!text) {
      throw new Error('Nenhum texto para pesquisa foi especificado.');
    }

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
