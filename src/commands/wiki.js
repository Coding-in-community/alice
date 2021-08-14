const wikijs = require('wikijs').default;
const { Command, Parse } = require('../utils');

const wikiOptions = { apiUrl: 'https://pt.wikipedia.org/w/api.php' };
const STRINGS = {
  help: Command.helper({
    description: 'Faz uma pesquisa na wikipedia.',
    usage: '!wiki [--args] ...',
    args: {
      search: 'retorna uma lista com os títulos dos artigos encontrados.',
      help: 'mostra esta mensagem.',
    },
  }),
};

async function execute(message) {
  const { text, args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  if (!text) {
    throw new Error('Nenhum texto para pesquisa foi especificado.');
  }

  const wiki = wikijs(wikiOptions);
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

module.exports = {
  execute,
  name: 'wiki',
  options: {
    scope: ['private_chat', 'group'],
  },
};
