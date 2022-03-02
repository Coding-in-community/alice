const path = require('path');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

/**
 * Starting point for interacting with the WhatsApp Web API.
 * @extends {Client}
 * @see https://docs.wwebjs.dev/Client.html
 */
class Session extends Client {
  constructor() {
    super({
      authStrategy: new LocalAuth({
        dataPath: path.join(__dirname, 'sessions'),
      }),
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });
  }

  start() {
    this.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.on('ready', () => {
      console.log('Client is ready!');
    });
    this.initialize();
  }
}

module.exports = Session;
