const Alice = require('./system')
const { component } = require('./system/utils')

let alice = new Alice([
    component('github', require('./scripts/github')),
    component('_example', require('./scripts/_example')),
    // component('add', require('./scripts/add')),
    // component('demote', require('./scripts/demote')),
    // component('remove', require('./scripts/remove')),
    // component('link', require('./scripts/link')),
])

alice.init()