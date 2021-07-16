const wiki = require('wikijs').default;

module.exports = async (data) => {
  const { text, args } = data;

  const response = await wiki({ apiUrl: 'https://pt.wikipedia.org/w/api.php' });

  let output;
  if (args.includes('search')) {
    const search = await response.search(text);

    output = '*Resultados encontrados: *\n\n';
    output += search.results.join('\n');
  } else {
    const page = await response.page(text);

    const { title } = page.raw;
    const summary = await page.summary();
    const url = await page.url();

    output = `*${title}*\n\n`;
    output += `${summary}\n`;
    output += `_${url}_`;
  }

  return output;
};
