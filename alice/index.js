// imports
let src = require('./src')
let build = require('./src/build')

// instance
let path = new build.Path(__dirname)

let alice = new src.Alice([
    path.create('scripts/bot', alias='bot'),
    path.create('scripts/commands', alias='commands'),
    path.create('scripts/cron', alias='cron'),
    path.create('scripts/dice', alias='dice'),
    path.create('scripts/doc', alias='doc'),
    path.create('scripts/doc', alias='help'),
    path.create('scripts/github', alias='github'),
    path.create('scripts/links', alias='links'),
    path.create('scripts/lyric', alias='lyric'),
    path.create('scripts/report', alias='report'),
    path.create('scripts/search', alias='search'),
    path.create('scripts/suggest', alias='suggest'),
    path.create('scripts/wiki', alias='wiki')
])

alice.initialize()