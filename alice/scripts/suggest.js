const parse = require('./utils/parse');
const random = require('./utils/random');

module.exports = (data, message, client) => {
  const defaultMessage = `
uso: _!suggest [--flag] [descrição]_

argumentos:
  _--feature  algo novo que deseja que criemos_
  _--change  o que deve ser mudado_ 
  _--remove  aquilo que devemos remover_ 

⚠️ *o uso indevido dessa função resultará em ban de 3 dias* ⚠️
    `;

  const responses = [
    'sua solicitação será analisada e discutida pela administração',
    'veremos o que podemos fazer',
    'obrigado pela colaboração',
    'discutiremos assim que possivel',
    'obrigado. chame novamente caso queira continuar a contribuir',
  ];

  const myID = parse.userID('+55 11 96734-3809');

  if (data.args.length === 0 && data.text) {
    return 'nenhuma flag foi fornecida';
  }
  if (data.args.length > 0 && !data.text) {
    return 'nenhuma descrição foi fornecida';
  }
  if (data.args.includes('feature')) {
    const text = `⚠️ *feature suggestion* ⚠️\n\n${data.text}`;
    client.sendMessage(myID, text);
    return random.choice(responses);
  }
  if (data.args.includes('change')) {
    const text = `⚠️ *change suggestion* ⚠️\n\n${data.text}`;
    client.sendMessage(myID, text);
    return random.choice(responses);
  }
  if (data.args.includes('remove')) {
    const text = `⚠️ *remove suggestion* ⚠️\n\n${data.text}`;
    client.sendMessage(myID, text);
    return random.choice(responses);
  }
  return defaultMessage.trim();
};
