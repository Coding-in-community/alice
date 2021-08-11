const { chattools, Command } = require('../utils');

const STRINGS = {
  help: Command.helper({
    description: 'Sugira algo com este comando.',
    usage: '!suggest --args ...',
    args: {
      feature: 'sugira algo novo.',
      remove: 'sugira remoções.',
      change: 'sugira mudanças.',
      help: 'mostra esta mensagem.',
    },
  }),
};

class Suggest {
  constructor() {
    this.name = 'suggest';
    this.reportID = chattools.userID(process.env.REPORT_NUMBER);
    this.strings = STRINGS;
  }

  execute(data, message, client) {
    const { args, text } = data;
    const reportMsg = `⚠️ *${args[0]} suggestion* ⚠️\n\n${text}`;

    if (args.includes('help')) {
      message.reply(this.strings.help);
      return;
    }

    if (args.length === 0 && text) {
      throw new Error('Nenhuma flag foi fornecida.');
    }
    if (args.length > 0 && !text) {
      throw new Error('Nenhuma sugestão foi fornecida.');
    }

    if (
      args.includes('feature') ||
      args.includes('remove') ||
      args.includes('change')
    ) {
      client.sendMessage(this.reportID, reportMsg);
      message.reply('Obrigado pela colaboração!');
      return;
    }

    throw new Error('Nenhum arg válido foi passado.');
  }
}

module.exports = Suggest;
