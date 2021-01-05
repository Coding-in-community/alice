const axios = require('axios')
const whatsapp = require('whatsapp-web.js')
const { loadPreviousSession, startCurrentSession } = require('./auth')
const { parseBody } = require('./utils/parse.js')
const { startServer, pingServer } = require('./utils/ping.js')

// constants
const sessionData = loadPreviousSession()
const client = new whatsapp.Client({
	session: sessionData, puppeteer: {
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	}
})

// não mexer
// startServer()  
// pingServer() 

// messages
client.on('message', async (message) => {
	// let chat = await message.getChat()

	let _callback = async data => {
		try {
			let response = await axios.post('https://aliceserver.herokuapp.com/', {
				text: data.textMsg,
				method: data.pythonMethod,
				arguments: data.methodArguments
			});
			message.reply(response.data);
		}

		catch (err) {
			// console.log(err);
			message.reply('Ocorreu um erro, informe ao administrador.');
		}
	}

	parseBody(message, _callback)
});

startCurrentSession(client, sessionData)