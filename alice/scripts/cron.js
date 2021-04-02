const events = require('events')
const chattools = require('./utils/chattools')
const time = require('./utils/time')

let emitter = new events.EventEmitter()


function toPositiveNumber(value) {
    let number = Number.parseFloat(value)
    
    if (number >= 0) {
        return number
    }
    
    else if (Number.isNaN(number)) {
        return 0
    }
    
    else {
        return -number
    }
}


let threads = [] 
let counter = 0
class Cron {
    constructor(data, message) {
        this.data = data
        this.text = data.text
        this.message = message

        let seconds = toPositiveNumber(data.kwargs.s)
        let minutes = toPositiveNumber(data.kwargs.m)
        let hours = toPositiveNumber(data.kwargs.h)
        let days = toPositiveNumber(data.kwargs.d)

        this.timer = time.timer(seconds, minutes, hours, days)
    }

    _create() {         
        // check time 
        if (this.timer > 0) {
            // id increment
            counter++
            
            // create thread info
            let thread = {}
            thread._id = counter
            thread.description = this.text.slice(0, 30) 
            
            // add event emitter  
            let interval = null

            // NÂO MEXER 
            // DO NOT TOUCH 
            // NE TOUCHEZ PAS
            // NON TOCCARE
            // 만지지 마십시오
            // 触れないでください
            let message = this.message 
            let text = this.text
            let timer = this.timer

            thread.start = emitter.on('start-cron' + thread._id, function() {
                interval = setInterval(() => message.reply(text), timer)
            })
            
            thread.stop = emitter.on('stop-cron' + thread._id, function() {
                clearInterval(interval)
            })
    
            // save thread info
            threads.push(thread)

            return `thread created using id: ${thread._id}`
        }

        return 'you must add a valid time' 
    }
    
    _destroy() {
        // check if is a valid id
        if (threads.some(elem => (elem._id === Number(this.text)))) {
            // call thread saved
            let thread = threads.find(elem => elem._id === Number(this.text))
            
            // stop threads
            this._stop()
            
            // remove threads emitters
            emitter.removeAllListeners('start-cron' + this.text, thread.start)
            emitter.removeAllListeners('stop-cron' + this.text, thread.stop)

            // remove thread from array
            threads = threads.filter(elem => !(elem._id === Number(this.text)))

            return 'thread destroyed successfully'
        }

        return 'thread not found'
    }
    
    _start() {
        // check if is a valid id
        if (threads.some(elem => elem._id === Number(this.text))) {
            emitter.emit('start-cron' + this.text)
        
            return `starting thread ${this.text}`
        }
        
        return 'thread not found'
    }
    
    _stop() {
        // check if is a valid id
        if (threads.some(elem => (elem._id === Number(this.text)))) {
            emitter.emit('stop-cron' + this.text)
            
            return `stopping thread ${this.text}`
        }
        
        return 'thread not found'
    }

    _log() {
        let output = ''

        if (threads.length === 0 )
            output += 'thread not open'
        else if (threads.length === 1)
            output += 'thread open:\n\n'
        else 
            output += 'threads open:\n\n'

        for (let thread of threads) {
            console.log(thread)

            let id = 'id: ' + thread._id + '\n'
            let description = 'desc: ' + thread.description + '\n'

            output += id + description + '\n'
        }

        return output.trim()
    }

    _killall() {
        // loop for all threads
        for (let thread in threads) {
            

            return 'all threads where killed'
        }

        return 'something went wrong...'
    }

    _default() {
        return `
*criação*: _!cron --create --[time]=<int>_
*outros*: _!cron [--flag] [<int>]_

*argumentos*:
_--create -> cria uma nova thread_
_--destroy -> apaga uma thread_
_--start -> inicia uma thread_
_--stop -> para uma thread_ 
_--s -> define um intervalor de segundos_ 
_--m -> define um intervalor de minutos_ 
_--h -> define um intervalor de horas_ 
_--d  -> define um intervalor de dias_ 
        
⚠️ *o uso indevido dessa função resultará em ban de 3 dias* ⚠️
`.trim()
    }

    code() {
        if (this.data.args.includes('log')) 
            return this._log()
        
        else if (this.data.args.includes('killall')) 
            // return this._killall()
            return 'sorry, this function is not done yet'

        else if (this.data.args.includes('create'))
            return this._create()

        else if (this.data.args.includes('destroy')) 
            return this._destroy()

        else if (this.data.args.includes('start'))
            return this._start()

        else if (this.data.args.includes('stop')) 
            return this._stop()

        else 
            return this._default()
    }

    main() {
        if (chattools.isAdm(this.message)) {
            return this.code()
        }

        return 'staff only'
    }
}

module.exports = async function(data, message) {
    let cron = new Cron(data, message)

    return cron.main()
}

// create ==> automaticamente inicia
// destroy ==> automaticamente para
// start ==> inicia
// stop ==> para
// log ==> mostra todas as threads ativas

