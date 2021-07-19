const axios = require('axios');
const JSSoup = require('jssoup').default;
const search = require('./utils/search');

async function makeSoup(url) {
  const { data } = await axios.get(url);
  return new JSSoup(data);
}

function removeBr(raw) {
  const html = raw
    .prettify()
    .split('\n')
    .filter((e) => !e.match(/<br[\s]*[\/]?>/))
    .map((e) => e.trim())
    .join('\n');
  return new JSSoup(html);
}

module.exports = async (data, message) => {
  const { text } = data;

  if (!text) {
    message.reply('please tell me the song name');
  }

  const results = await search.google(text, 'https://www.letras.mus.br');
  const { link } = results[0];
  const soup = await makeSoup(link);
  const title = soup.find('div', { class: 'cnt-head_title' }).find('h1');
  const lyricsDiv = soup.find('div', { class: 'cnt-letra' });
  const pArray = lyricsDiv.findAll('p');
  const output = `\
*${title.text}*

${pArray.map((p) => removeBr(p).text).join('')}

_${link}_`;

  message.reply(output);
};
