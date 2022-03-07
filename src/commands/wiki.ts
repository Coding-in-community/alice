import { Message } from 'whatsapp-web.js';
import wikijs from 'wikijs';
import { Command, Parse } from '../utils';

const WIKI_DEFAULT_OPTIONS = { apiUrl: 'https://pt.wikipedia.org/w/api.php' };
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

async function execute(message: Message) {
  const { text, args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  if (!text) {
    throw new Error('Nenhum texto para pesquisa foi especificado.');
  }

  const wiki = wikijs(WIKI_DEFAULT_OPTIONS);

  if (args.includes('search')) {
    const { results } = await wiki.search(text, 10);
    const output = '*Resultados encontrados:*\n\n' + results.join('\n');
    message.reply(output);
    return;
  }

  const page = await wiki.page(text);
  const { title, fullurl: url } = page.raw;
  const summary = await page.summary();
  const output = `*${title}*\n\n${summary}\n\n_${url}_`;
  message.reply(output);
}

export default {
  execute,
  name: 'wiki',
  options: {
    scope: ['private_chat', 'group'],
  },
};
