let parse = require('./utils/parse');
let random = require('./utils/random');

module.exports = function (data, message, client) {
  let _default = `
uso: _!suggest [--flag] [descrição]_

argumentos:
  _--feature  algo novo que deseja que criemos_
  _--change  o que deve ser mudado_ 
  _--remove  aquilo que devemos remover_ 

⚠️ *o uso indevido dessa função resultará em ban de 3 dias* ⚠️
    `;

  let _responses = [
    'sua solicitação será analisada e discutida pela administração',
    'veremos o que podemos fazer',
    'obrigado pela colaboração',
    'discutiremos assim que possivel',
    'obrigado. chame novamente caso queira continuar a contribuir',
  ];

  let _myID = parse.userID('+55 11 96734-3809');

  if (data.args.length == 0 && data.text) {
    return 'nenhuma flag foi fornecida';
  } else if (data.args.length > 0 && !data.text) {
    return 'nenhuma descrição foi fornecida';
  } else if (data.args.includes('feature')) {
    let _text = '⚠️ *feature suggestion* ⚠️\n\n' + data.text;
    client.sendMessage(_myID, _text);
    return random.choice(_responses);
  } else if (data.args.includes('change')) {
    let _text = '⚠️ *change suggestion* ⚠️\n\n' + data.text;
    client.sendMessage(_myID, _text);
    return random.choice(_responses);
  } else if (data.args.includes('remove')) {
    let _text = '⚠️ *remove suggestion* ⚠️\n\n' + data.text;
    client.sendMessage(_myID, _text);
    return random.choice(_responses);
  } else {
    return _default.trim();
  }
};
