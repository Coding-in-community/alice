const { chattools, Command } = require('../utils');

const STRINGS = {
  help: Command.helper({
    description: 'Reporte problemas no bot ou um usuário.',
    usage: '!report --args ...',
    args: {
      bug: 'reporta um bug.',
      user: 'reporta um usuário.',
      help: 'mostra esta mensagem.',
    },
  }),

  bug: 'sua solicitação será analisada. caso confirmada, abriremos uma issue',

  user: 'o usuário foi reportado a administração',
};

class Report {
  constructor() {
    this.name = 'report';
    this.reportID = chattools.userID(process.env.REPORT_NUMBER);
    this.strings = STRINGS;
  }

  execute(data, message, client) {
    const { args, text } = data;
    const reportMsg = `⚠️ *${args[0]} report* ⚠️\n\n${text}`;

    if (args.includes('help')) {
      message.reply(this.strings.help);
      return;
    }

    if (args.length === 0 && text) {
      throw new Error('Nenhuma flag foi fornecida.');
    }
    if (args.length > 0 && !text) {
      throw new Error('Nenhuma descrição foi fornecida.');
    }

    if (args.includes('bug') || args.includes('user')) {
      client.sendMessage(this.reportID, reportMsg);
      message.reply(this.strings[args[0]]);
      return;
    }

    throw new Error('Nenhum arg válido foi passado.');
  }
}

module.exports = Report;
