import axios from 'axios'
import fs from 'fs'
import whatsapp from 'whatsapp-web.js'
import express from 'express'
import { loadPreviousSession, startCurrentSession } from './auth.mjs'
import { parseBody } from './parse.mjs'
import { startServer, pingServer } from './ping.mjs'

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