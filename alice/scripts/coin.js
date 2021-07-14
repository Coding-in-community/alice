const axios = require('axios');
const cheerio = require('cheerio');

async function loadCheerio(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    return cheerio.load(html);
  } catch (err) {
    console.log('error', err.response.status);

    return null;
  }
}

async function getData(url) {
  const $ = await loadCheerio(url);
  if (typeof $ === 'function') {
    const priceStatistics = $('.sc-AxhCb.gsRRvB.container___E9axz');
    const priceStatisticsTable = priceStatistics.find('table');
    const priceStatisticsTableBody = priceStatisticsTable.find('tbody');
    const priceStatisticsTableRow = priceStatisticsTableBody.find('tr');

    const data = [];
    priceStatisticsTableRow.each(function () {
      const elem = $(this);

      const key = elem.find('th').text();

      let value = elem.find('td');
      if (value.find('span.sc-1v2ivon-0.gClTFY').text()) {
        value = `${value.find('span').first().text()} || ${value
          .find('span.sc-1v2ivon-0.gClTFY')
          .text()}`;
      } else {
        value = value.text();
      }

      console.log(value);

      if (value !== 'No Data' || value !== 'Sem Dados') {
        const object = Object.fromEntries([[key, value]]);
        data.push(object);
      }
    });

    return data;
  }

  return null;
}

const defaultMessage = `
uso: *!coin* [--flag] name
_--all -> mostra todas as informações disponiveis_  

a flag _all_ pode retornar dados em excesso, sua utilização repetida será considera spam
`;

module.exports = async (data) => {
  let BASE_URL = 'https://coinmarketcap.com/currencies/';

  if (data.args.includes('brl')) {
    BASE_URL = 'https://coinmarketcap.com/pt-br/currencies/';
  }

  if (data.text) {
    const text = data.text.replace(/\s/g, '-').toLowerCase();
    const url = BASE_URL + text;
    let coinData = await getData(url);

    if (coinData) {
      if (!data.args.includes('all')) coinData = coinData.slice(0, 3);

      let coinDataString = '';
      coinData.forEach((elem) => {
        const [key, value] = Object.entries(elem)[0];

        const string = `*_${key}_*:\n - ${value}\n\n`;
        coinDataString += string;
      });

      return coinDataString.trim();
    }
    return 'moeda não encontrada';
  }
  return defaultMessage.trim();
};
