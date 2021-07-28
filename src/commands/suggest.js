const { chattools } = require('../utils');

class Suggest {
  constructor() {
    this.name = 'suggest';
    this.reportID = chattools.userID(process.env.REPORT_NUMBER);
    this.defaultMessage = `
uso: _!suggest [--flag] [sugestão]_

argumentos:
  _--feature  para sugerir algo novo_
  _--change   para sugerir mudanças_ 
  _--remove   para sugerir remoções_ 

⚠️ *o uso indevido dessa função resultará em ban de 3 dias* ⚠️
    `.trim();
  }

  execute(data, message, client) {
    const { args, text } = data;
    const reportMsg = `⚠️ *${args[0]} suggestion* ⚠️\n\n${text}`;

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

    message.reply(this.defaultMessage.trim());
  }
}

module.exports = Suggest;
