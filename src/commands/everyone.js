const { chattools } = require('../utils');

const STRINGS = {
  help: `
Marca todos os membros do grupo com a mensagem citada.

*uso:* \`\`\`!everyone [--args]\`\`\`

*args válidos:*
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

      quotedMessage.reply(this.strings.defaultMessage, undefined, {
        mentions: participants,
      });
      return;
    }

    throw new Error('No message was replied.');
  }
}

module.exports = Everyone;
