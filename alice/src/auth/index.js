const whatsapp = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const fs = require('fs');
const path = require('path')

const FILE_NAME = 'session.json'
const SESSION_FILE_PATH = path.join(__dirname, FILE_NAME)

class Session extends whatsapp.Client {
	constructor() {
		super({
			puppeteer: {
				args: ['--no-sandbox', '--disable-setuid-sandbox']
			}
		})

		this.isSavedOrLoaded = false
	}

	get exists() {
		return fs.existsSync(SESSION_FILE_PATH)
	}

	save() {
		this.isSavedOrLoaded = true

		this.on('qr', (qr) => {
			qrcode.generate(qr, { small: true });
		})

		this.on('authenticated', (session) => {
			fs.writeFileSync(
				SESSION_FILE_PATH,
				JSON.stringify(session)
			)

            console.log('⚠ The current session has been saved ⚠')
		})

	}

	load() {
		this.isSavedOrLoaded = true

		try {
			let raw = fs.readFileSync(SESSION_FILE_PATH)
			let data = JSON.parse(raw)

			this.options.session = data

            console.log('⚠ The previous session was loaded ⚠')
		}

		catch {
			throw Error(`session data does not exist in ${SESSION_FILE_PATH}`)
		}
	}

	start() {
		if (this.isSavedOrLoaded = true) {
			this.on('ready', () => {
				console.log('Client is ready!');
			});
	
			this.initialize();
		}

		else {
			throw Error('session wasn\'t saved or loaded')
		}

	}
}

module.exports = {
    Session
}