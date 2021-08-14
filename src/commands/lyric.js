const axios = require('axios');
const cheerio = require('cheerio');
const { search, Command, Parse } = require('../utils');

const STRINGS = {
  help: Command.helper({
    description: 'Retorna a letra de uma música.',
    usage: '!lyric [--args] music_name',
    args: {
      help: 'mostra esta mensagem.',
    },
  }),
};

async function loadCheerio(url) {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch {
    return null;
  }
}

function removeTags(raw) {
  const html = cheerio
    .load(raw)
    .html()
    .replace(/<br[\s]*[/]?>/g, '\n');
  return cheerio.load(html).text();
}

async function execute(message) {
  const { text, args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  if (!text) {
    throw new Error('Nenhum nome foi passado');
  }

  const results = await search(text, 'https://www.letras.mus.br');
  const { link } = results[0];
  const $ = await loadCheerio(link);
  const title = $('div.cnt-head_title h1').text();
  let lyrics = [];
  $('div.cnt-letra p').each((_, p) => {
    lyrics.push(removeTags(p));
  });
  lyrics = lyrics.join('\n\n');

  message.reply(`*${title}*\n\n${lyrics}\n\n_${link}_`);
}

module.exports = {
  name: 'lyric',
  execute,
};
