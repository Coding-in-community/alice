const search = require('./utils/search');

function callback(object) {
  const { title, link, snippet } = object;

  return `
*${title}*

${snippet}

_${link}_
`;
}

module.exports = async (data) => {
  const { text, args } = data;

  let limit;

  if (args.limit && args.limit !== 'none') {
    limit = Number(args.limit);
  } else if (args.limit === 'none') {
    limit = false;
  } else {
    limit = 1;
  }

  let target;
  if (args.target) {
    target = args.target;
  } else {
    target = '';
  }

  const results = await search.google(text, target, limit);

  if (results.length > 0 && text) {
    const stringResult = results
      .map((elem) => callback(elem))
      .join('\n\n')
      .trim();

    return stringResult;
  }
  if (results.length > 0 && !text) {
    return 'I think you should type something to search...';
  }
  return "Gomenasai, goshujin-sama. I can't find your search";
};
