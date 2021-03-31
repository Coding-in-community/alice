const events = require('events')

let emitter = new events.EventEmitter()

let time = require('./utils/time')

let id = 0
let idList = []

module.exports = async function cron(data, message) {
    let seconds = Number(data.kwargs.s) || 0
    let minutes = Number(data.kwargs.m) || 0
    let hours = Number(data.kwargs.h) || 0
    let days = Number(data.kwargs.d) || 0
    let timer = time.timer(seconds, minutes, hours, days)

    if (data.args.includes('create')) {
        if (timer > 0) {
            id++
            idList.push(id)
    
            let interval
            emitter.on('start_cron' + id, () => {
                interval = setInterval(() => {
                    message.reply(data.text)
                }, timer)
            })
    
            emitter.on('stop_cron' + id, () => {
                clearInterval(interval)
            })
    
            message.reply(`thread created using id: ${id}`)
        }

        else {
            message.reply('you must add time')
        }
    }

    if (data.args.includes('start')) {
        if (idList.includes(Number(data.text))) {
            emitter.emit('start_cron' + data.text)
            message.reply(`starting thread ${data.text}`)
        }
        else {
            message.reply('thread not found')
        }
    }

    if (data.args.includes('stop')) {
        if (idList.includes(Number(data.text))) {
            emitter.emit('stop_cron' + data.text)
            message.reply(`stopping thread ${data.text}`)
        }
        else {
            message.reply('thread not found')
        }
    }

    if (data.args.includes('destroy')) {
        if (idList.includes(Number(data.text))) {
            emitter.emit('stop_cron' + data.text)
            message.reply(`stopping thread ${data.text}`)

            emitter.off('start_cron' + data.text)
            emitter.off('stop_cron' + data.text)
            idList.splice(
                idList.indexOf(data.text),
                1
            )

            message.reply(`destroying thread ${data.text}`)
        }

        else {
            message.reply('thread not found')
        }
    }

    if (data.args.includes('log')) {
        let msg = 'the following services are open: '
        msg += idList.join(', ')

        message.reply(msg)
    }
}

// create ==> automaticamente inicia
// destroy ==> automaticamente para
// start ==> inicia
// stop ==> para
// log ==> mostra todas as threads ativas

