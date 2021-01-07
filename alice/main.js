const whatsapp = require('whatsapp-web.js')

const { loadPreviousSession, startCurrentSession } = require('./auth')
const { Parse } = require('./utils')
const system = require('./system')
const { response } = require('express')

// constants
const sessionData = loadPreviousSession()
const client = new whatsapp.Client({
	session: sessionData, puppeteer: {
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	}
})

client.on('message', async (message) => {
  let content = new Parse(message)

  let response = system.call(content.method, content.text)
  if (response) {
    console.log(response)
    message.reply(String(response))
  }
})

startCurrentSession(client, sessionData)