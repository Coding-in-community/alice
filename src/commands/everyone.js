const { chattools, Command } = require('../utils');

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

class Everyone {
  constructor() {
    this.name = 'everyone';
    this.strings = STRINGS;
  }

  async execute(data, message) {
    const { args } = data;
    const isFromAdm = await chattools.isFromAdm(message);

    if (!isFromAdm) {
      message.reply('staff only.');
      return;
    }

    if (args.includes('help')) {
      message.reply(this.strings.help);
      return;
    }

    const chat = await message.getChat();
    const { participants } = chat;

    if (message.hasQuotedMsg) {
      const quotedMessage = await message.getQuotedMessage();
      quotedMessage.reply(this.strings.defaultMessage, undefined, {
        mentions: participants,
      });
      return;
    }

    throw new Error('No message was replied.');
  }
}

module.exports = Everyone;
