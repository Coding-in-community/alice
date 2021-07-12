const axios = require('axios');
const JSSoup = require('jssoup').default;
const search = require('./utils/search');

async function makeSoup(url) {
  let response = await axios.get(url);
  let html = response.data;

  return new JSSoup(html);
}

function removeBr(p) {
  let html;

  html = p.prettify();
  html_array = html.split('\n');
  html_array = html_array.filter((elem) => !elem.match(/<br[\s]*[\/]?>/));
  html_array = html_array.map((elem) => elem.trim());
  html = html_array.join('\n');

  let soup = new JSSoup(html);
  return soup;
}

module.exports = async function (data, message) {
  let text = data.text;

  if (text) {
    let results = await search.google(text, 'https://www.letras.mus.br');

    let url = results[0].link;

    let soup = await makeSoup(url);

    // titulo
    let h1 = soup.find('div', { class: 'cnt-head_title' }).find('h1');

    // letra
    let div = soup.find('div', { class: 'cnt-letra' });
    let p_array = div.findAll('p');

    // monta a mensagem
    let output = `*${h1.text}*\n`;
    for (p of p_array) {
      output += removeBr(p).text;
    }
    output += `\n_${url}_`;

    message.reply(output);
  } else {
    message.reply('please tell me the song name');
  }
};
