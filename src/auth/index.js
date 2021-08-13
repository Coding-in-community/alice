const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

/**
 * Starting point for interacting with the WhatsApp Web API.
 * @extends {Client}
 * @see https://docs.wwebjs.dev/Client.html
 */
class Session extends Client {
  constructor() {
    super({
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    this.SESSION_FILE_PATH = path.join(__dirname, 'session.json');
  }

  /**
   * Checks if the `session.json` file exists.
   * @returns {boolean} - `true` if exists, `false` if not.
   */
  get exists() {
    return fs.existsSync(this.SESSION_FILE_PATH);
  }

  /**
   * Throws the QR-Code to authenticate the session. When the QR-Code is read, the session file is written.
   * @private
   */
  create() {
    this.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });
    this.on('authenticated', this.save);
  }

  /**
   * Writes the session in a .json file (`this.SESSION_FILE_PATH`)
   * @private
   * @param {object} session - The session object.
   */
  save(session) {
    fs.writeFileSync(this.SESSION_FILE_PATH, JSON.stringify(session));
  }

  /**
   * Loads the saved session file.
   * @private
   */
  load() {
    if (!this.exists) {
      throw Error(`session data does not exist in ${this.SESSION_FILE_PATH}`);
    }

    const raw = fs.readFileSync(this.SESSION_FILE_PATH);
    const data = JSON.parse(raw);
    this.options.session = data;
  }

  /**
   * Starts the session (Creates it if doesn't exists).
   */
  start() {
    if (this.exists) {
      this.load();
    } else {
      this.create();
    }

    this.on('ready', () => {
      console.log('Client is ready!');
    });
    this.initialize();
  }
}

module.exports = {
  Session,
};
