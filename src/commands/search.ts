import { Message } from 'whatsapp-web.js';
import { Command, Parse, search } from '../utils';

interface ISearchResult {
  title: string;
  link: string;
  snippet: string;
}

const STRINGS = {
  help: Command.helper({
    description: 'Retorna o primeiro resultado de uma pesquisa no google.',
    usage: '!cron [--args] ...',
    args: {
      help: 'mostra esta mensagem.',
      target: 'define um site especifico para pesquisa.',
      limit: 'define um limite de resultados. O padrão é 1.',
    },
  }),
};

function formatResult(result: ISearchResult) {
  const { title, link, snippet } = result;
  return `*${title}*\n\n${snippet}\n\n_${link}_`;
}

async function execute(message: Message) {
  const { args, text, kwargs } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  if (!text) {
    throw new Error('Nenhum texto para pesquisa foi especificado.');
  }

  const results: ISearchResult[] = await search(
    text,
    kwargs.target,
    Number(kwargs.limit) || undefined
  );

  if (results.length > 0) {
    const stringResult = results
      .map((r) => formatResult(r))
      .join('\n\n🔹🔹🔹\n\n');
    message.reply(stringResult);
    return;
  }

  message.reply(`Nenhum resultado foi encontrado para: _${text}_`);
}

export default {
  execute,
  name: 'search',
  options: {
    scope: ['private_chat', 'group'],
  },
};
