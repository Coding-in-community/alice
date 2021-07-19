const { chattools } = require('../utils');

const myID = chattools.userID('+55 11 96734-3809');
const defaultMessage = `
uso: _!suggest [--flag] [sugestão]_

argumentos:
  _--feature  para sugerir algo novo_
  _--change   para sugerir mudanças_ 
  _--remove   para sugerir remoções_ 

⚠️ *o uso indevido dessa função resultará em ban de 3 dias* ⚠️`;

module.exports = (data, msg, client) => {
  const { args, text } = data;

  const reportMsg = `⚠️ *${args[0]} suggestion* ⚠️\n\n${text}`;

  if (args.length === 0 && text) {
    return 'Nenhuma flag foi fornecida.';
  }
  if (args.length > 0 && !text) {
    return 'Nenhuma sugestão foi fornecida.';
  }

  if (
    args.includes('feature') ||
    args.includes('remove') ||
    args.includes('change')
  ) {
    client.sendMessage(myID, reportMsg);
    return 'obrigado pela colaboração';
  }

  return defaultMessage.trim();
};
