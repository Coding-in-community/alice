import axios from 'axios';
import cheerio from 'cheerio';
import { Message } from 'whatsapp-web.js';
import { Command, Parse } from '../utils';

const BASE_URL = 'https://coinmarketcap.com/currencies/';
const STRINGS = {
  help: Command.helper({
    description:
      'Retorna dados de uma moeda disponível no CoinMarketCap (https://coinmarketcap.com).',
    usage: '!coin [--args] coin_name',
    args: {
      all: 'retorna todos os dados disponíveis.',
      help: 'mostra esta mensagem.',
    },
  }),
};

async function loadCheerio(url: string) {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch {
    return null;
  }
}

async function getCoinStats(url: string) {
  const $ = await loadCheerio(url);

  if (typeof $ !== 'function') {
    throw new Error('Moeda não encontrada.');
  }

  const priceStatistics = $('.sc-16r8icm-0.nds9rn-0.dAxhCK')
    .find('table')
    .find('tbody')
    .find('tr');
  const statsArray: any[] = [];

  priceStatistics.each((_, pS) => {
    const tr = $(pS);
    const valueCell = tr.find('td');
    const key = tr.find('th').text();
    let value: string;

    if (valueCell.find('.sc-15yy2pl-0.hzgCfk').text()) {
      const valueInCash = valueCell.find('span').first().text();
      const valueInPerc = valueCell.find('.sc-15yy2pl-0.hzgCfk').text();
      value = `${valueInCash} || ${valueInPerc}`;
    } else {
      value = valueCell.text();
    }

    if (value !== 'No Data') {
      const object = Object.fromEntries([[key, value]]);
      statsArray.push(object);
    }
  });

  return statsArray;
}

function getUrl(text: string) {
  const path = text.replace(/\s/g, '-').toLowerCase();
  return BASE_URL + path;
}

function formatStats(coinStats: any[]) {
  const output = coinStats.map((s) => {
    const [key, value] = Object.entries(s)[0];
    return `*_${key}_*:\n - ${value}`;
  });

  return output.join('\n\n');
}

async function execute(message: Message) {
  const { args, text } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help, undefined, { linkPreview: false });
    return;
  }

  if (!text) {
    throw new Error('Nenhuma moeda foi passada.');
  }

  const url = getUrl(text);
  let coinStats = await getCoinStats(url);

  if (!args.includes('all')) {
    coinStats = coinStats.slice(0, 3);
  }

  const output = formatStats(coinStats);
  message.reply(output);
}

export default {
  execute,
  name: 'coin',
  options: {
    scope: ['private_chat', 'group'],
  },
};
