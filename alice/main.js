const Alice = require('./system')
const { component } = require('./system/utils')

let alice = new Alice([
    component('banhammer', require('./scripts/kick'))
])

alice.init()