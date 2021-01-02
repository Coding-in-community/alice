import express from 'express'
import axios from 'axios'

export function startServer() {
    const app = express()
    const port = process.env.PORT || 3000

    app.get('/', (req, res) => {
        res.send('hello world')
    })
    app.listen(port)
}


export function pingServer() {
    setInterval(() => {
        axios.get('http://aliceclient.herokuapp.com/')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, 30*1000);
}
