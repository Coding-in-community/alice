module.exports = function (data) {
    let _default = `
Esse bot foi criado utilizando a biblioteca whatsapp-web.js como base sob licença Apache 2.0 
Para saber mais, entre em _https://github.com/pedroslopez/whatsapp-web.js/_

Caso queira a documentação sobre determinada função, utilize o comando doc com a flag de seu nome, ex: !doc --lyric. Se não souber o que escrever, use !commands 
`

    let _bot = `
comando: *!bot*
descrição: chama a interface básica de boas-vindas
`

    let _commands = `
comando: *!commands*
descrição: lista todos os comandos disponiveis
`

    let _cron = `
comando: *!cron*
args: --create, --destroy, --start, --stop
kwargs: --s, --m, --h, --d
descrição: repete uma mensagem a cada determinado periodo de tempo
`

    let _dice = `
comando: *!dice*
descrição: lanca um dado de rpg e retorna seu valor
`

    let _doc = `
comando: *!doc*
descrição: documentação do bot
`

    let _github = `
comando: *!github*
descrição: link da ultima versão estável do sistema
`

    let _links = `
comando: *!links*
descrição: url de todos os grupos coding
`

    let _lyric = `
comando: *!lyric*
descrição: retorna a letra de uma musica pesquisada
`

    let _report = `
comando: *!report*
args: --bug, --user
descrição: utilize para reportar problemas no bot ou grupo
    `

    let _search = `
comando: *!search*
descrição: retorna o primeiro resultado de uma pesquisa no google
`

    let _suggest = `
comando: *!suggest*
args: --feature, --change, --remove
descrição: retorna o primeiro resultado de uma pesquisa no google
`

    let _wiki = `
comando: *!wiki*
descrição: retorna o primeiro resultado de uma pesquisa na wikipedia
`

    if (data.args.includes('bot'))
        return _bot.trim()

    else if(data.args.includes('commands'))
        return _commands.trim()

    else if(data.args.includes('cron'))
        return _cron.trim()

    else if(data.args.includes('dice'))
        return _dice.trim()

    else if(data.args.includes('doc'))
        return _doc.trim()

    else if(data.args.includes('github'))
        return _github.trim()

    else if(data.args.includes('links'))
        return _links.trim()

    else if(data.args.includes('lyric'))
        return _lyric.trim()
    
    else if(data.args.includes('report'))
        return _report.trim()

    else if(data.args.includes('search'))
        return _search.trim()

    else if(data.args.includes('suggest'))
        return _suggest.trim()

    else if(data.args.includes('wiki'))
        return _wiki.trim()

    else 
        return _default
}