const wiki = require('wikijs').default;

module.exports = async function (data) {
  let text = data.text
  let args = data.args

  let response = await wiki({apiUrl: 'https://pt.wikipedia.org/w/api.php'})

  let output
  if (args.search) {
    let search = await response.search(text)

    output = '*Resultados encontrados: *\n\n'
    output += search.results.join('\n')
  }

  else {
    let page = await response.page(text)

    let title = page.raw.title
    let summary = await page.summary() 
    let url = await page.url()
    
    output = `*${title}*\n\n` 
    output += `${summary}\n` 
    output += `_${url}_` 
  }

  return output
}