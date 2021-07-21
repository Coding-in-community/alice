const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

const FILE_NAME = 'session.json';

/**
 * Starting point for interacting with the WhatsApp Web API.
 * @param {string} SESSION_FILE_PATH - Path to `session.json` file.
 * @see https://docs.wwebjs.dev/Client.html
 * @extends {Client}
 */
class Session extends Client {
  constructor() {
    super({
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    this.SESSION_FILE_PATH = path.join(__dirname, FILE_NAME);
  }

  /**
   * Checks if the `session.json` file already exists.
   * @returns {boolean} - `True` if exists, `False` if not.
   */
  get exists() {
    return fs.existsSync(this.SESSION_FILE_PATH);
  }

  /**
   * Throws the QR-Code to authenticate the session. When the QR-Code is read, the session file is written.
   */
  create() {
    this.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });
    this.on('authenticated', this.save);
  }

  /**
   * Writes the session in a .json file (`this.SESSION_FILE_PATH`)
   * @param {object} session - The session file returned in the authentication.
   */
  save(session) {
    fs.writeFileSync(this.SESSION_FILE_PATH, JSON.stringify(session));
    console.log('⚠ The current session has been saved ⚠');
  }

  /**
   * Loads the saved session file.
   */
  load() {
    if (!this.exists) {
      throw Error(`session data does not exist in ${this.SESSION_FILE_PATH}`);
    }

    const raw = fs.readFileSync(this.SESSION_FILE_PATH);
    const data = JSON.parse(raw);
    this.options.session = data;

    console.log('⚠ The previous session was loaded ⚠');
  }

  /**
   * Starts the session.
   */
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
