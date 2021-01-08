const Alice = require('./system')
const { component } = require('./system/utils')

let alice = new Alice([
    component('dolar', require('./scripts/dolar')),
    component('log', require('./scripts/dolar')),
    component('soma', require('./scripts/dolar')),
])

alice.init()