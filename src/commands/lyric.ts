import axios from 'axios';
import cheerio, { CheerioAPI, Element } from 'cheerio';
import { Message } from 'whatsapp-web.js';
import { Command, Parse, search } from '../utils';

const STRINGS = {
  help: Command.helper({
    description: 'Retorna a letra de uma música.',
    usage: '!lyric [--args] music_name',
    args: {
      help: 'mostra esta mensagem.',
    },
  }),
};

async function loadCheerio(url: string): Promise<CheerioAPI | null> {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch {
    return null;
  }
}

function removeTags(raw: Element) {
  const html = cheerio
    .load(raw)
    .html()
    .replace(/<br[\s]*[/]?>/g, '\n');
  return cheerio.load(html).text();
}

async function execute(message: Message) {
  const { text, args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  if (!text) {
    throw new Error('Nenhum nome foi passado');
  }

  const results = await search(text, 'https://www.letras.mus.br');

  if (!results[0]) {
    message.reply('Letra não encontrada.');
    return;
  }

  const { link } = results[0];
  const $ = await loadCheerio(link);

  if (!$) {
    message.reply('Letra não encontrada.');
    return;
  }

  const title = $('div.cnt-head_title h1').text();
  const lyrics: string[] = [];
  $('div.cnt-letra p').each((_, p) => {
    lyrics.push(removeTags(p));
  });
  const result = lyrics.join('\n\n');

  message.reply(`*${title}*\n\n${result}\n\n_${link}_`);
}

export default {
  execute,
  name: 'lyric',
  options: {
    scope: ['private_chat', 'group'],
  },
};
