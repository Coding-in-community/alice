const whatsapp = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

const FILE_NAME = 'session.json';

class Session extends whatsapp.Client {
  constructor() {
    super({
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    this.SESSION_FILE_PATH = path.join(__dirname, FILE_NAME);
  }

  get exists() {
    return fs.existsSync(this.SESSION_FILE_PATH);
  }

  create() {
    this.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });
    this.on('authenticated', this.save);
  }

  save(session) {
    fs.writeFileSync(this.SESSION_FILE_PATH, JSON.stringify(session));
    console.log('⚠ The current session has been saved ⚠');
  }

  load() {
    if (!this.exists) {
      throw Error(`session data does not exist in ${this.SESSION_FILE_PATH}`);
    }

    const raw = fs.readFileSync(this.SESSION_FILE_PATH);
    const data = JSON.parse(raw);
    this.options.session = data;

    console.log('⚠ The previous session was loaded ⚠');
  }

  start() {
    this.on('ready', () => {
      console.log('Client is ready!');
    });

    this.initialize();
  }
}

module.exports = {
  Session,
};
