const Alice = require('./system')
const { component } = require('./system/utils')

let alice = new Alice([
    component('banhammer', require('./scripts/kick')),
    component('_example', require('./scripts/_example'))
])

alice.init()