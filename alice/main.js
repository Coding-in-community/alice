function componentPath(relativePath, alias, wrapper) {
    const BASE_FOLDER = 'scripts'
    const FILE_PATH = path.join(__dirname, BASE_FOLDER, relativePath)

    if (!alias)
        alias = path.parse(FILE_PATH).name

    let genericFunction = require(FILE_PATH)

    return [alias, genericFunction]
}

const Alice = require('./system')
const path = require('path')
const ping = require('./ping')

let alice = new Alice([
    componentPath('regular/bot', alias = 'bot'),
    componentPath('regular/dice', alias = 'dice'),
    componentPath('regular/github', alias = 'github'),
    componentPath('regular/links', alias = 'links'),
    componentPath('regular/log', alias = 'log'),
    componentPath('regular/lyric', alias = 'lyric'),
    componentPath('regular/search', alias = 'search'),
    componentPath('regular/wiki', alias = 'wiki'),
    componentPath('admin/link', alias = 'link'),
    componentPath('admin/remove', alias = 'remove'),
])

alice.initialize()
ping.run()

/*
notas:
- bug no regex quando passa duas ou mais flags
- adicionar role para administradores
- refatorar o componentPath
- deixar as configurações semelhantes ao do vue
*/

/*
configurações
- regex
- alias
- wrapper
*/