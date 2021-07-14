const events = require('events');
const chattools = require('./utils/chattools');
const time = require('./utils/time');

const emitter = new events.EventEmitter();

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

let threads = [];
let counter = 0;
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

  create() {
    // check time
    if (this.timer > 0) {
      // id increment
      counter++;

      // create thread info
      const thread = {};
      thread.id = counter;
      thread.description = this.text.slice(0, 30);

      // add event emitter
      let interval = null;

      // NÂO MEXER
      // DO NOT TOUCH
      // NE TOUCHEZ PAS
      // NON TOCCARE
      // 만지지 마십시오
      // 触れないでください
      const { message, text, timer } = this;

      thread.start = emitter.on(`start-cron${thread.id}`, () => {
        interval = setInterval(() => message.reply(text), timer);
      });

      thread.stop = emitter.on(`stop-cron${thread.id}`, () => {
        clearInterval(interval);
      });

      // save thread info
      threads.push(thread);

      return `thread created using id: ${thread.id}`;
    }

    return 'you must add a valid time';
  }

  destroy() {
    // check if is a valid id
    if (threads.some((elem) => elem.id === Number(this.text))) {
      // call thread saved
      const thread = threads.find((elem) => elem.id === Number(this.text));

      // stop threads
      this.stop();

      // remove threads emitters
      emitter.removeAllListeners(`start-cron${this.text}`, thread.start);
      emitter.removeAllListeners(`stop-cron${this.text}`, thread.stop);

      // remove thread from array
      threads = threads.filter((elem) => !(elem.id === Number(this.text)));

      return 'thread destroyed successfully';
    }

    return 'thread not found';
  }

  start() {
    // check if is a valid id
    if (threads.some((elem) => elem.id === Number(this.text))) {
      emitter.emit(`start-cron${this.text}`);

      return `starting thread ${this.text}`;
    }

    return 'thread not found';
  }

  stop() {
    // check if is a valid id
    if (threads.some((elem) => elem.id === Number(this.text))) {
      emitter.emit(`stop-cron${this.text}`);

      return `stopping thread ${this.text}`;
    }

    return 'thread not found';
  }

  static log() {
    let output = '';

    if (threads.length === 0) output += 'thread not open';
    else if (threads.length === 1) output += 'thread open:\n\n';
    else output += 'threads open:\n\n';

    threads.forEach((thread) => {
      console.log(thread);

      const id = `id: ${thread.id}\n`;
      const description = `desc: ${thread.description}\n`;

      output += `${id}${description}\n`;
    });

    return output.trim();
  }

  killall() { // eslint-disable-line
    return null;
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

  code() {
    const { args } = this.data;

    if (args.includes('log')) return Cron.log();
    if (args.includes('killall')) return 'sorry, this function is not done yet';
    if (args.includes('create')) return this.create();
    if (args.includes('destroy')) return this.destroy();
    if (args.includes('start')) return this.start();
    if (args.includes('stop')) return this.stop();
    return Cron.default();
  }

  async main() {
    const isAdm = await chattools.isAdm(this.message);
    if (isAdm) {
      return this.code();
    }

    return 'staff only';
  }
}

module.exports = async (data, message) => {
  const cron = new Cron(data, message);

  return cron.main();
};

// create ==> automaticamente inicia
// destroy ==> automaticamente para
// start ==> inicia
// stop ==> para
// log ==> mostra todas as threads ativas
