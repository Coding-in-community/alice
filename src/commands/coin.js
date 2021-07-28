const axios = require('axios');
const cheerio = require('cheerio');

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

  if (!(typeof $ === 'function')) {
    return null;
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

class Coin {
  constructor() {
    this.name = 'coin';
    this.BASE_URL = 'https://coinmarketcap.com/currencies/';
    this.defaultMessage = `
uso: *!coin* [--flag] name
_--all -> mostra todas as informações disponiveis_  

a flag _all_ pode retornar dados em excesso, sua utilização repetida será considera spam
    `.trim();
  }

  async execute(data, message) {
    const { args, text } = data;

    if (!text) {
      message.reply(this.defaultMessage);
      return;
    }

    const url = this.getUrl(text);
    let coinStats = await getCoinStats(url);

    if (!coinStats) {
      message.reply('Moeda não encontrada.');
      return;
    }

    if (!args.includes('all')) {
      coinStats = coinStats.slice(0, 3);
    }

    let output = '';

    coinStats.forEach((s) => {
      const [key, value] = Object.entries(s)[0];
      const string = `*_${key}_*:\n - ${value}\n\n`;
      output += string;
    });

    message.reply(output.trim());
  }

  getUrl(text) {
    const path = text.replace(/\s/g, '-').toLowerCase();
    return this.BASE_URL + path;
  }
}

module.exports = Coin;
