const { chattools } = require('../utils');

const STRINGS = {
  help: `
Marca todos os membros do grupo.

*uso:* \`\`\`!everyone [--args] [text]\`\`\`

*args válidos:*
  \`\`\`--quoted\`\`\` -> _marca com a mensagem citada._
  \`\`\`--help\`\`\` -> _mostra esta mensagem._
  `.trim(),
  defaultMessage: '@everyone',
};

class Everyone {
  constructor() {
    this.name = 'everyone';
    this.strings = STRINGS;
  }

  async execute(data, message) {
    const { args } = data;
    const isAdm = await chattools.isAdm(message);

    if (!isAdm) {
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

      chat.sendMessage(this.strings.defaultMessage, {
        // eslint-disable-next-line no-underscore-dangle
        quotedMessageId: quotedMessage.id._serialized,
        mentions: participants,
      });
      return;
    }

    throw new Error('No message was replied.');
  }
}

module.exports = Everyone;
