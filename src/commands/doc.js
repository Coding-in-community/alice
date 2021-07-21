const strings = {
  defaultMessage: `
Alice foi criada utilizando a biblioteca \`\`\`whatsapp-web.js\`\`\` como base sob licença Apache 2.0. Saiba mais em _https://github.com/pedroslopez/whatsapp-web.js_

Quer a documentação de um comando especifico? Use o comando \`\`\`!doc\`\`\` com a flag de seu nome, ex: \`\`\`!doc --lyric\`\`\`. Se não conhece os comandos, use \`\`\`!commands\`\`\`

_Quer contribuir? Então dá uma olhada em https://github.com/Coding-in-community/alice_
`,
  bot: `
comando: *!bot*
descrição: chama a interface básica de boas-vindas
`,
  commands: `
comando: *!commands*
descrição: lista todos os comandos disponiveis
`,
  cron: `
comando: *!cron*
args: --create, --destroy, --start, --stop
kwargs: --s, --m, --h, --d
descrição: repete uma mensagem a cada determinado periodo de tempo
`,
  dice: `
comando: *!dice*
descrição: lanca um dado de rpg e retorna seu valor
`,
  doc: `
comando: *!doc*
descrição: documentação do bot
`,
  links: `
comando: *!links*
descrição: url de todos os grupos coding
`,
  lyric: `
comando: *!lyric*
descrição: retorna a letra de uma musica pesquisada
`,
  report: `
comando: *!report*
args: --bug, --user
descrição: utilize para reportar problemas no bot ou grupo
    `,
  search: `
comando: *!search*
descrição: retorna o primeiro resultado de uma pesquisa no google
`,
  suggest: `
comando: *!suggest*
args: --feature, --change, --remove
descrição: retorna o primeiro resultado de uma pesquisa no google
`,
  wiki: `
comando: *!wiki*
descrição: retorna o primeiro resultado de uma pesquisa na wikipedia
`,
};

module.exports = (data) => {
  const { args } = data;

  if (strings[args[0]]) {
    return strings[args[0]].trim();
  }

  return strings.defaultMessage.trim();
};
