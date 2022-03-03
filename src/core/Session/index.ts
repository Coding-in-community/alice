import path from 'path';
// @ts-ignore
import qrcode from 'qrcode-terminal';
import { Client, ClientOptions, LocalAuth } from 'whatsapp-web.js';

const CLIENT_DEFAULT_OPTIONS: ClientOptions = {
  authStrategy: new LocalAuth({
    dataPath: path.join(__dirname, 'sessions'),
  }),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
};

class Session extends Client {
  constructor() {
    super(CLIENT_DEFAULT_OPTIONS);
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

export default Session;
