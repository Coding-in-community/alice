const { search, Command, Parse } = require('../utils');

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

function formatResult(result) {
  const { title, link, snippet } = result;
  return `*${title}*\n\n${snippet}\n\n_${link}_`;
}

async function execute(message) {
  const { args, text, kwargs } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  if (!text) {
    throw new Error('Nenhum texto para pesquisa foi especificado.');
  }

  const results = await search(text, kwargs.target, kwargs.limit);

  if (results.length > 0) {
    const stringResult = results
      .map((r) => formatResult(r))
      .join('\n\n🔹🔹🔹\n\n');
    message.reply(stringResult);
    return;
  }

  message.reply(`Nenhum resultado foi encontrado para: _${text}_`);
}

module.exports = {
  execute,
  name: 'search',
  options: {
    scope: ['private_chat', 'group'],
  },
};
