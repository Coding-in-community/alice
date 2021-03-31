module.exports = function (data) {
    let _default = `
Esse bot foi criado utilizando a biblioteca whatsapp-web.js como base sob licença Apache 2.0 
Para saber mais, entre em _https://github.com/pedroslopez/whatsapp-web.js/_

Caso queira a doc sobre determinada função, utilize o comando doc com a flag de seu nome, ex: !doc --lyric
`

    let _bot = `
comando: *!bot*
descrição: chama a interface básica de boas-vindas
`.trim()

    let _commands = `
comando: *!commands*
descrição: lista todos os comandos disponiveis
`.trim()

    let _cron = `
comando: *!cron*
args: --create, --destroy, --start, --stop
kwargs: --s, --m, --h, --d
descrição: repete uma mensagem a cada determinado periodo de tempo
`.trim()

    let _dice = `
comando: *!dice*
descrição: lanca um dado de rpg e retorna seu valor
`.trim()

    let _doc = `
comando: *!doc*
descrição: documentação do bot
`.trim()

    let _github = `
comando: *!github*
descrição: link da ultima versão estável do sistema
`.trim()

    let _links = `
comando: *!links*
descrição: url de todos os grupos coding
`.trim()

    let _lyric = `
comando: *!lyric*
descrição: retorna a letra de uma musica pesquisada
`.trim()

    let _search = `
comando: *!search*
descrição: retorna o primeiro resultado de uma pesquisa no google
`.trim()

    let _wiki = `
comando: *!wiki*
descrição: retorna o primeiro resultado de uma pesquisa na wikipedia
`.trim()

    if (data.args.includes('bot'))
        return _bot

    else if(data.args.includes('commands'))
        return _commands

    else if(data.args.includes('cron'))
        return _cron

    else if(data.args.includes('dice'))
        return _dice

    else if(data.args.includes('doc'))
        return _doc

    else if(data.args.includes('github'))
        return _github

    else if(data.args.includes('links'))
        return _links
    
    else if(data.args.includes('lyric'))
        return _lyric

    else if(data.args.includes('search'))
        return _search

    else if(data.args.includes('wiki'))
        return _wiki

    else 
        return _default
}