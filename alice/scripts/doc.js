module.exports = (data) => {
  const defaultMessage = `
Esse bot foi criado utilizando a biblioteca whatsapp-web.js como base sob licença Apache 2.0 
Para saber mais, entre em _https://github.com/pedroslopez/whatsapp-web.js/_

Caso queira a documentação sobre determinada função, utilize o comando doc com a flag de seu nome, ex: !doc --lyric. Se não souber o que escrever, use !commands 
`;

  const bot = `
comando: *!bot*
descrição: chama a interface básica de boas-vindas
`;

  const commands = `
comando: *!commands*
descrição: lista todos os comandos disponiveis
`;

  const cron = `
comando: *!cron*
args: --create, --destroy, --start, --stop
kwargs: --s, --m, --h, --d
descrição: repete uma mensagem a cada determinado periodo de tempo
`;

  const dice = `
comando: *!dice*
descrição: lanca um dado de rpg e retorna seu valor
`;

  const doc = `
comando: *!doc*
descrição: documentação do bot
`;

  const github = `
comando: *!github*
descrição: link da ultima versão estável do sistema
`;

  const links = `
comando: *!links*
descrição: url de todos os grupos coding
`;

  const lyric = `
comando: *!lyric*
descrição: retorna a letra de uma musica pesquisada
`;

  const report = `
comando: *!report*
args: --bug, --user
descrição: utilize para reportar problemas no bot ou grupo
    `;

  const search = `
comando: *!search*
descrição: retorna o primeiro resultado de uma pesquisa no google
`;

  const suggest = `
comando: *!suggest*
args: --feature, --change, --remove
descrição: retorna o primeiro resultado de uma pesquisa no google
`;

  const wiki = `
comando: *!wiki*
descrição: retorna o primeiro resultado de uma pesquisa na wikipedia
`;

  if (data.args.includes('bot')) return bot.trim();
  if (data.args.includes('commands')) return commands.trim();
  if (data.args.includes('cron')) return cron.trim();
  if (data.args.includes('dice')) return dice.trim();
  if (data.args.includes('doc')) return doc.trim();
  if (data.args.includes('github')) return github.trim();
  if (data.args.includes('links')) return links.trim();
  if (data.args.includes('lyric')) return lyric.trim();
  if (data.args.includes('report')) return report.trim();
  if (data.args.includes('search')) return search.trim();
  if (data.args.includes('suggest')) return suggest.trim();
  if (data.args.includes('wiki')) return wiki.trim();
  return defaultMessage;
};
