let parse = require('./utils/parse');

module.exports = function (data, message, client) {
  let _default = `
uso: _!report [--flag] [descrição]_

argumentos:
  _--bug  descreva um problema no bot_
  _--user  denuncie um usuário_ 

⚠️ *o uso indevido dessa função resultará em ban de 3 dias* ⚠️
    `;

  let _bug = `
sua solicitação será analisada. caso confirmada, abriremos uma issue      
`;

  let _user = `
o usuário foi reportado a administração
`;

  let _myID = parse.userID('+55 11 96734-3809');

  if (data.args.length == 0 && data.text) {
    return 'nenhuma flag foi fornecida';
  } else if (data.args.length > 0 && !data.text) {
    return 'nenhuma descrição foi fornecida';
  } else if (data.args.includes('bug')) {
    let _text = '⚠️ *bug report* ⚠️\n\n' + data.text;
    client.sendMessage(_myID, _text);
    return _bug.trim();
  } else if (data.args.includes('user')) {
    let _text = '⚠️ *user report* ⚠️\n\n' + data.text;
    client.sendMessage(_myID, _text);
    return _user.trim();
  } else {
    return _default.trim();
  }
};
