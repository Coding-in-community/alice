const axios = require('axios');
const JSSoup = require('jssoup').default;
const search = require('./utils/search');

async function makeSoup(url) {
  const response = await axios.get(url);
  const { data: html } = response;

  return new JSSoup(html);
}

function removeBr(p) {
  let html = p.prettify();

  let htmlArray = html.split('\n');
  htmlArray = htmlArray.filter((elem) => !elem.match(/<br[\s]*[\/]?>/));
  htmlArray = htmlArray.map((elem) => elem.trim());
  html = htmlArray.join('\n');

  const soup = new JSSoup(html);
  return soup;
}

module.exports = async (data, message) => {
  const { text } = data;

  if (text) {
    const results = await search.google(text, 'https://www.letras.mus.br');

    const { link: url } = results[0];

    const soup = await makeSoup(url);

    // titulo
    const h1 = soup.find('div', { class: 'cnt-head_title' }).find('h1');

    // letra
    const div = soup.find('div', { class: 'cnt-letra' });
    const pArray = div.findAll('p');

    // monta a mensagem
    let output = `*${h1.text}*\n`;
    pArray.forEach((p) => {
      output += removeBr(p).text;
    });
    output += `\n_${url}_`;

    message.reply(output);
  } else {
    message.reply('please tell me the song name');
  }
};
