const parse = require('./utils/parse');

module.exports = (data, message, client) => {
  const defaultMessage = `
uso: _!report [--flag] [descrição]_

argumentos:
  _--bug  descreva um problema no bot_
  _--user  denuncie um usuário_ 

⚠️ *o uso indevido dessa função resultará em ban de 3 dias* ⚠️
    `;

  const bug = `
sua solicitação será analisada. caso confirmada, abriremos uma issue      
`;

  const user = `
o usuário foi reportado a administração
`;

  const myID = parse.userID('+55 11 96734-3809');

  if (data.args.length === 0 && data.text) {
    return 'nenhuma flag foi fornecida';
  }
  if (data.args.length > 0 && !data.text) {
    return 'nenhuma descrição foi fornecida';
  }
  if (data.args.includes('bug')) {
    const text = `⚠️ *bug report* ⚠️\n\n${data.text}`;
    client.sendMessage(myID, text);
    return bug.trim();
  }
  if (data.args.includes('user')) {
    const text = `⚠️ *user report* ⚠️\n\n${data.text}`;
    client.sendMessage(myID, text);
    return user.trim();
  }
  return defaultMessage.trim();
};
