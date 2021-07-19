const events = require('events');
const chattools = require('./utils/chattools');
const time = require('./utils/time');

const emitter = new events.EventEmitter();
let threads = [];
let counter = 0;

function Thread(id, text, message, timer) {
  this.id = id;
  this.description = text.slice(0, 30);
  this.intervalRef = null;
  this.text = text;

  this.start = emitter.on(`start-cron${this.id}`, () => {
    this.intervalRef = setInterval(() => message.reply(this.text), timer);
  });
  this.stop = emitter.on(`stop-cron${this.id}`, () => {
    clearInterval(this.intervalRef);
  });
}

function toPositiveNumber(value) {
  const number = Number.parseFloat(value);

  if (number >= 0) {
    return number;
  }
  if (Number.isNaN(number)) {
    return 0;
  }

  return -number;
}

class Cron {
  constructor(data, message) {
    this.data = data;
    this.text = data.text;
    this.message = message;

    const seconds = toPositiveNumber(data.kwargs.s);
    const minutes = toPositiveNumber(data.kwargs.m);
    const hours = toPositiveNumber(data.kwargs.h);
    const days = toPositiveNumber(data.kwargs.d);

    this.timer = time.timer(seconds, minutes, hours, days);
  }

  async init() {
    const { args } = this.data;
    const isAdm = await chattools.isAdm(this.message);

    if (isAdm) {
      return this.runsArg(args);
    }

    return 'staff only.';
  }

  create() {
    if (!(this.timer > 0)) {
      return 'you must add a valid time';
    }

    counter++;
    const { message, text, timer } = this;
    const thread = new Thread(counter, text, message, timer);
    threads.push(thread);

    return `thread created using id: ${thread.id}`;
  }

  destroy() {
    if (!Cron.isIdValid(this.text)) {
      return 'thread not found';
    }

    const thread = threads.find((t) => t.id === Number(this.text));
    this.stop();

    emitter.removeAllListeners(`start-cron${this.text}`, thread.start);
    emitter.removeAllListeners(`stop-cron${this.text}`, thread.stop);

    threads = threads.filter((t) => !(t.id === Number(this.text)));
    return 'thread destroyed successfully';
  }

  start() {
    if (Cron.isIdValid(this.text)) {
      emitter.emit(`start-cron${this.text}`);
      return `starting thread ${this.text}`;
    }

    return 'thread not found';
  }

  stop() {
    if (Cron.isIdValid(this.text)) {
      emitter.emit(`stop-cron${this.text}`);
      return `stopping thread ${this.text}`;
    }

    return 'thread not found';
  }

  static log() {
    let output = '';

    if (threads.length === 0) {
      output += 'thread not open';
    } else {
      output += 'threads open:\n\n';
    }

    threads.forEach((thread) => {
      const id = `id: ${thread.id}\n`;
      const description = `desc: ${thread.description}\n`;
      output += `${id}${description}\n`;
    });

    return output.trim();
  }

  static killall() {
    return null;
  }

  runsArg(args) {
    const seila = {
      log: () => Cron.log(),
      killall: () => 'sorry, this function is not done yet',
      create: () => this.create(),
      destroy: () => this.destroy(),
      start: () => this.start(),
      stop: () => this.stop(),
    };

    if (seila[args[0]]) {
      return seila[args[0]]();
    }

    return Cron.default();
  }

  static isIdValid(id) {
    return threads.some((t) => t.id === Number(id));
  }

  static default() {
    return `
*criação*: _!cron --create --[time]=<int>_
*outros*: _!cron [--flag] [<int>]_

*argumentos*:
_--create -> cria uma nova thread_
_--destroy -> apaga uma thread_
_--start -> inicia uma thread_
_--stop -> para uma thread_ 
_--s -> define um intervalor de segundos_ 
_--m -> define um intervalor de minutos_ 
_--h -> define um intervalor de horas_ 
_--d  -> define um intervalor de dias_ 

⚠️ *o uso indevido dessa função resultará em ban de 3 dias* ⚠️
`.trim();
  }
}

module.exports = async (data, message) => {
  const cron = new Cron(data, message);
  return cron.init();
};
