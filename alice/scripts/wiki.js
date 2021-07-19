const wikijs = require('wikijs').default;

module.exports = async (data) => {
  const { text, args } = data;
  const wiki = wikijs({ apiUrl: 'https://pt.wikipedia.org/w/api.php' });
  let output;

  if (args.includes('search')) {
    const { results } = await wiki.search(text, 10);
    output = '*Resultados encontrados:*\n\n';
    output += results.join('\n');
    return output;
  }

  const page = await wiki.page(text);
  const { title, canonicalurl: url } = page.raw;
  const summary = await page.summary();
  output = `*${title}*\n\n${summary}\n\n_${url}_`;
  return output;
};
