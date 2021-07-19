const axios = require('axios');
const cheerio = require('cheerio');

const defaultMessage = `
uso: *!coin* [--flag] name
_--all -> mostra todas as informações disponiveis_  

a flag _all_ pode retornar dados em excesso, sua utilização repetida será considera spam
`;

async function loadCheerio(url) {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch {
    return null;
  }
}

async function getData(url) {
  const $ = await loadCheerio(url);

  if (!(typeof $ === 'function')) {
    return null;
  }

  const priceStatistics = $('.sc-16r8icm-0.nds9rn-0.dAxhCK')
    .find('table')
    .find('tbody')
    .find('tr');
  const statsArray = [];

  priceStatistics.each(function () {
    const tr = $(this);
    const key = tr.find('th').text();
    let value = tr.find('td');

    if (value.find('.sc-15yy2pl-0.hzgCfk').text()) {
      const valueInCash = value.find('span').first().text();
      const valueInPerc = value.find('.sc-15yy2pl-0.hzgCfk').text();
      value = `${valueInCash} || ${valueInPerc}`;
    } else {
      value = value.text();
    }

    if (value !== 'No Data' || value !== 'Sem Dados') {
      const object = Object.fromEntries([[key, value]]);
      statsArray.push(object);
    }
  });

  return statsArray;
}

function getUrl(args, text) {
  let baseURL = 'https://coinmarketcap.com/currencies/';
  const path = text.replace(/\s/g, '-').toLowerCase();

  if (args.includes('brl')) {
    baseURL = 'https://coinmarketcap.com/pt-br/currencies/';
  }

  return baseURL + path;
}

module.exports = async (data) => {
  const { args, text } = data;

  if (!text) {
    return defaultMessage.trim();
  }

  const url = getUrl(args, text);
  let coinStats = await getData(url);

  if (!coinStats) {
    return 'moeda não encontrada';
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

  return output.trim();
};
