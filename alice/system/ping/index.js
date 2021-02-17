const axios = require('axios')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

class Trigger {
    constructor() {
        this.loop = false
        this.time = 60
    }

    async _trigger() {
        while (this.loop) {
            await axios.get(`https://aliceclient.herokuapp.com/`);
            await sleep(this.time);
        }
    }

    on() {
        this.loop = true
        this._trigger()
    }

    off() {
        this.loop = false
        this._trigger()
    }
}

exports.run = function () {
    const trigger = new Trigger()

    app.get('/', (req, res) => {
        let state = req.query.state

        if (state === 'open') {
            console.log('state: open')
            trigger.on()
        }

        else if (state === 'close') {
            console.log('state: closed')
            trigger.off()
        }

        else if (!state) {
            console.log('state: ping')
        }

        else {
            console.log('error')
        }

        res.send('success')
    })

    app.listen(port)
}