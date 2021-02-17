function componentPath(relativePath, alias, wrapper) {
    const path = require('path')

    const BASE_FOLDER = 'alice/scripts'
    const FILE_PATH = path.join(__dirname, BASE_FOLDER, relativePath)
    
    if (!alias)
    alias = path.parse(FILE_PATH).name
    
    let genericFunction = require(FILE_PATH)
    
    return [alias, genericFunction]
}

const Alice = require('./alice/system')
const ping = require('./alice/system/ping')

let alice = new Alice([
    componentPath('regular/bot', alias = 'bot'),
    componentPath('regular/dice', alias = 'dice'),
    componentPath('regular/github', alias = 'github'),
    componentPath('regular/links', alias = 'links'),
    componentPath('regular/log', alias = 'log'),
    componentPath('regular/lyric', alias = 'lyric'),
    componentPath('regular/search', alias = 'search'),
    componentPath('regular/wiki', alias = 'wiki')
])

alice.initialize()
ping.run()