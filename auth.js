const qrcode = require('qrcode-terminal')
const fs = require('fs')

// path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// load the session data if it has been previously saved
function loadPreviousSession() {
	if (fs.existsSync(SESSION_FILE_PATH)) {
		let raw = fs.readFileSync('./session.json')
		let data = JSON.parse(raw)

		return data
	}
}

// save session values to the file upon successful auth
function startCurrentSession(client, sessionData) {
	// generate and scan this code with your phone
	client.on('qr', (qr) => {
		qrcode.generate(qr, { small: true });
	});

	// when authenticate saves the session
	client.on('authenticated', (session) => {
		sessionData = session;
		fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => { if (err) console.error(err); })
	})

	// check if ready
	client.on('ready', () => {
		console.log('Client is ready!');
	});

	client.initialize();
}

exports.loadPreviousSession = loadPreviousSession
exports.startCurrentSession = startCurrentSession