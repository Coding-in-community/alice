const { search } = require('../utils');

function callback(object) {
  const { title, link, snippet } = object;
  return `
*${title}*

${snippet}

_${link}_
`;
}

module.exports = async (data) => {
  const { text } = data;

  if (!text) {
    return 'Nenhum texto para pesquisa foi especificado.';
  }

  const results = await search.google(text, undefined, 1);

  if (results.length > 0) {
    const stringResult = results
      .map((r) => callback(r))
      .join('\n\n')
      .trim();
    return stringResult;
  }

  return `Nenhum resultado foi encontrado para: _${text}_`;
};
