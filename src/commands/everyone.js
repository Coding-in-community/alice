const { chattools } = require('../utils');

const STRINGS = {
  help: `
Marca todos os membros do grupo.

*uso:* \`\`\`!everyone [--args] [text]\`\`\`

*args válidos:*
  \`\`\`--quoted\`\`\` -> _marca com a mensagem citada._
  \`\`\`--help\`\`\` -> _mostra esta mensagem._
  `.trim(),
  defaultMessage: 'Marcando todo mundo.',
};

class Everyone {
  constructor() {
    this.name = 'everyone';
    this.strings = STRINGS;
  }

  async execute(data, message) {
    const { text, args } = data;
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

    if (args.includes('quoted')) {
      const quotedMessage = await message.getQuotedMessage();
      await chat.sendMessage(quotedMessage.body, {
        mentions: participants,
      });
      return;
    }

    if (text) {
      await chat.sendMessage(text, {
        mentions: participants,
      });
      return;
    }

    await chat.sendMessage(this.strings.defaultMessage, {
      mentions: participants,
    });
  }
}

module.exports = Everyone;
