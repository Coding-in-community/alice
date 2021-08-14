const { chattools, Command, Parse } = require('../utils');

const STRINGS = {
  help: Command.helper({
    description: 'Marca todos os membros do grupo com a mensagem citada.',
    usage: '!everyone [--args]',
    args: {
      help: 'mostra esta mensagem.',
    },
  }),

  defaultMessage: Command.message`@everyone`,
};

async function execute(message) {
  const { args } = new Parse(message.body);
  const isFromAdm = await chattools.isFromAdm(message);

  if (!isFromAdm) {
    message.reply('staff only.');
    return;
  }

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  const chat = await message.getChat();
  const { participants } = chat;

  if (message.hasQuotedMsg) {
    const quotedMessage = await message.getQuotedMessage();
    quotedMessage.reply(STRINGS.defaultMessage, undefined, {
      mentions: participants,
    });
    return;
  }

  throw new Error('No message was replied.');
}

module.exports = {
  name: 'everyone',
  execute,
};
