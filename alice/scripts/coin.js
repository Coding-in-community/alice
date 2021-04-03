const axios = require('axios')
const cheerio = require('cheerio')


async function loadCheerio(url) {
    try {
        let response = await axios.get(url)
        let html = response.data
        
        return cheerio.load(html)
    }
    
    catch (err) {
        console.log('error', err.response.status)
        
        return null
    }
}

async function getData(url) {
    let $ = await loadCheerio(url)
    if (typeof $ === 'function') {
        let priceStatistics = $('.sc-AxhCb.gsRRvB.container___E9axz')
        let priceStatisticsTable = priceStatistics.find('table')
        let priceStatisticsTableBody = priceStatisticsTable.find('tbody')
        let priceStatisticsTableRow = priceStatisticsTableBody.find('tr')
    
        let data = []
        priceStatisticsTableRow.each(function() {
            let elem = $(this)
            
            let key = elem.find('th').text()
            
            let value = elem.find('td')
            if (value.find('span.sc-1v2ivon-0.gClTFY').text()) {
                value = value.find('span').first().text() 
                    + ' || ' +
                    value.find('span.sc-1v2ivon-0.gClTFY').text()
            }

            else {
                value = value.text()
            }

            console.log(value)

            if (value !== 'No Data' || value !== 'Sem Dados') {
                let object = Object.fromEntries([[key, value]])
                data.push(object)
            }
        })
    
        return data
    }

    return null
}

let _default = `
uso: *!coin* [--flag] name
_--all -> mostra todas as informações disponiveis_  

a flag _all_ pode retornar dados em excesso, sua utilização repetida será considera spam
`

module.exports = async function(data) {
    let BASE_URL = 'https://coinmarketcap.com/currencies/'

    if (data.args.includes('brl')) {
        BASE_URL = 'https://coinmarketcap.com/pt-br/currencies/'
    }
    
    if (data.text) {
        let text = data.text.replace(/\s/g, '-').toLowerCase()
        let url = BASE_URL + text
        let coinData = await getData(url)

        if (coinData) {
            if (!data.args.includes('all'))
                coinData = coinData.slice(0, 3)
            
            let coinDataString = ''
            coinData.forEach(elem => {
                let [key, value] = Object.entries(elem)[0] 
                
                let string = `*_${key}_*:\n - ${value}\n\n`
                coinDataString += string
            })

            return coinDataString.trim()
        }

        else {
            return 'moeda não encontrada'
        }
    }

    else {
        return _default.trim()
    }
}