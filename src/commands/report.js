const { chattools } = require('../utils');

const strings = {
  defaultMessage: `
uso: _!report [--flag] [descrição]_

argumentos:
  _--bug  descreva um problema no bot_
  _--user  denuncie um usuário_ 

⚠️ *o uso indevido dessa função resultará em ban de 3 dias* ⚠️`,
  bug: 'sua solicitação será analisada. caso confirmada, abriremos uma issue',
  user: 'o usuário foi reportado a administração',
};

class Report {
  constructor() {
    this.name = 'report';
    this.reportID = chattools.userID(process.env.REPORT_NUMBER);
    this.strings = strings;
  }

  execute(data, message, client) {
    const { args, text } = data;
    const reportMsg = `⚠️ *${args[0]} report* ⚠️\n\n${text}`;

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

    message.reply(this.strings.defaultMessage.trim());
  }
}

module.exports = Report;
