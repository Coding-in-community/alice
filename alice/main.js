const Alice = require('./system')
const { component } = require('./system/utils')

let alice = new Alice([
    component('add', require('./scripts/add')),
    component('demote', require('./scripts/demote')),
    component('github', require('./scripts/github')),
    component('remove', require('./scripts/remove')),
    component('link', require('./scripts/link')),
    component('_example', require('./scripts/_example')),
])

alice.init()