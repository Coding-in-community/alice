const axios = require('axios');
const cheerio = require('cheerio');

const STRINGS = {
  help: `
Retorna dados de uma moeda disponível no CoinMarketCap (https://coinmarketcap.com).

*uso:* \`\`\`!coin [--args] coin_name\`\`\`

*args válidos:* 
  \`\`\`--all\`\`\` -> _retorna todos os dados disponíveis._
  \`\`\`--help\`\`\` -> _mostra essa mensagem._
  `.trim(),
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

class Coin {
  constructor() {
    this.name = 'coin';
    this.BASE_URL = 'https://coinmarketcap.com/currencies/';
    this.strings = STRINGS;
  }

  async execute(data, message) {
    const { args, text } = data;

    if (args.includes('help')) {
      message.reply(this.strings.help, undefined, { linkPreview: false });
      return;
    }

    const url = this.getUrl(text);
    let coinStats = await getCoinStats(url);

    if (!args.includes('all')) {
      coinStats = coinStats.slice(0, 3);
    }

    const output = Coin.formatStats(coinStats);
    message.reply(output);
  }

  getUrl(text) {
    if (!text) {
      throw new Error('Nenhuma moeda foi passada.');
    }

    const path = text.replace(/\s/g, '-').toLowerCase();
    return this.BASE_URL + path;
  }

  static formatStats(coinStats) {
    let output = '';

    coinStats.forEach((s) => {
      const [key, value] = Object.entries(s)[0];
      const string = `*_${key}_*:\n - ${value}\n\n`;
      output += string;
    });

    return output.trim();
  }
}

module.exports = Coin;
