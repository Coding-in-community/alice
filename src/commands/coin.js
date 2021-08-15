const axios = require('axios');
const cheerio = require('cheerio');
const { Command, Parse } = require('../utils');

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

async function loadCheerio(url) {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch {
    return null;
  }
}

async function getCoinStats(url) {
  const $ = await loadCheerio(url);

  if (typeof $ !== 'function') {
    throw new Error('Moeda não encontrada.');
  }

  const priceStatistics = $('.sc-16r8icm-0.nds9rn-0.dAxhCK')
    .find('table')
    .find('tbody')
    .find('tr');
  const statsArray = [];

  priceStatistics.each((_, pS) => {
    const tr = $(pS);
    const key = tr.find('th').text();
    let value = tr.find('td');

    if (value.find('.sc-15yy2pl-0.hzgCfk').text()) {
      const valueInCash = value.find('span').first().text();
      const valueInPerc = value.find('.sc-15yy2pl-0.hzgCfk').text();
      value = `${valueInCash} || ${valueInPerc}`;
    } else {
      value = value.text();
    }

    if (value !== 'No Data') {
      const object = Object.fromEntries([[key, value]]);
      statsArray.push(object);
    }
  });

  return statsArray;
}

function getUrl(text) {
  if (!text) {
    throw new Error('Nenhuma moeda foi passada.');
  }

  const path = text.replace(/\s/g, '-').toLowerCase();
  return BASE_URL + path;
}

function formatStats(coinStats) {
  let output = '';

  coinStats.forEach((s) => {
    const [key, value] = Object.entries(s)[0];
    const string = `*_${key}_*:\n - ${value}\n\n`;
    output += string;
  });

  return output.trim();
}

async function execute(message) {
  const { args, text } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help, undefined, { linkPreview: false });
    return;
  }

  const url = getUrl(text);
  let coinStats = await getCoinStats(url);

  if (!args.includes('all')) {
    coinStats = coinStats.slice(0, 3);
  }

  const output = formatStats(coinStats);
  message.reply(output);
}

module.exports = {
  execute,
  name: 'coin',
  options: {
    scope: ['private_chat', 'group'],
  },
};
