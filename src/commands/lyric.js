const axios = require('axios');
const JSSoup = require('jssoup').default;
const { search, Command } = require('../utils');

const STRINGS = {
  help: Command.helper({
    description: 'Retorna a letra de uma música.',
    usage: '!lyric [--args] music_name',
    args: {
      help: 'mostra esta mensagem.',
    },
  }),
};

async function makeSoup(url) {
  const { data } = await axios.get(url);
  return new JSSoup(data);
}

function removeBr(raw) {
  const html = raw
    .prettify()
    .split('\n')
    .filter((e) => !e.match(/<br[\s]*[\/]?>/))
    .map((e) => e.trim())
    .join('\n');
  return new JSSoup(html);
}

class Lyric {
  constructor() {
    this.name = 'lyric';
    this.strings = STRINGS;
  }

  async execute(data, message) {
    const { text, args } = data;

    if (args.includes('help')) {
      message.reply(this.strings.help);
      return;
    }

    if (!text) {
      throw new Error('Nenhum nome foi passado');
    }

    const results = await search(text, 'https://www.letras.mus.br');
    const { link } = results[0];
    const soup = await makeSoup(link);
    const title = soup.find('div', { class: 'cnt-head_title' }).find('h1');
    const lyrics = soup
      .find('div', { class: 'cnt-letra' })
      .findAll('p')
      .map((p) => removeBr(p).text)
      .join('');
    const output = `*${title.text}*\n\n${lyrics}\n\n_${link}_`;

    message.reply(output);
  }
}

module.exports = Lyric;
