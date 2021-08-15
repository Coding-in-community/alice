const { Command, Parse } = require('../utils');

const STRINGS = {
  help: Command.helper({
    description: 'Mostra informações sobre o bot.',
    usage: '!about [--args]',
    args: { help: 'mostra esta mensagem.' },
  }),

  about: Command.message`
  Alice foi criada utilizando a biblioteca \`\`\`whatsapp-web.js\`\`\` como base sob licença Apache 2.0. Saiba mais em _https://github.com/pedroslopez/whatsapp-web.js_

  Não sabe como usar um comando? Use a flag help, ex: \`\`\`!lyric --help\`\`\`. Se não conhece os comandos, use \`\`\`!commands\`\`\`

  _Quer contribuir? Então dá uma olhada em https://github.com/Coding-in-community/alice_
  `,
};

function execute(message) {
  const { args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  message.reply(STRINGS.about);
}

module.exports = {
  execute,
  name: 'about',
  options: {
    scope: ['private_chat', 'group'],
  },
};
