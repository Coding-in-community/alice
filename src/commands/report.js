const { chattools } = require('../utils');

const myID = chattools.userID(process.env.REPORT_NUMBER);
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

module.exports = (data, message, client) => {
  const { args, text } = data;

  if (args.length === 0 && text) {
    return 'nenhuma flag foi fornecida';
  }
  if (args.length > 0 && !text) {
    return 'nenhuma descrição foi fornecida';
  }

  const reportMsg = `⚠️ *${args[0]} report* ⚠️\n\n${text}`;

  if (args.includes('bug') || args.includes('user')) {
    client.sendMessage(myID, reportMsg);
    return strings[args[0]];
  }

  return strings.defaultMessage.trim();
};
