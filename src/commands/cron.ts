import { Message } from 'whatsapp-web.js';
import { Time, Command, Parse } from '../utils';

const STRINGS = {
  help: Command.helper({
    description:
      'Repete uma mensagem em um determinado período de tempo. Cada mensagem é representada por uma thread.',
    usage: '!cron --args [--kwargs=<type>] ...',
    args: {
      create: 'cria uma nova thread.',
      destroy: 'para e apaga uma thread.',
      stop: 'para uma thread.',
      start: 'inicia uma thread.',
      log: 'mostra as threads existentes.',
      killall: 'para e apaga todas as threads.',
      help: 'mostra esta mensagem.',
    },
    kwargs: {
      's=<int>': 'define um periodo em segundos.',
      'm=<int>': 'define um periodo em minutos.',
      'h=<int>': 'define um periodo em horas.',
      'd=<int>': 'define um periodo em dias.',
    },
  }),
};

class Thread {
  id: number;
  description: string;
  intervalRef: NodeJS.Timer | null;
  messageRef: Message;
  timer: number;
  text: string;

  constructor(id: number, text: string, message: Message, timer: number) {
    this.id = id;
    this.description = text.slice(0, 30);
    this.intervalRef = null;
    this.messageRef = message;
    this.timer = timer;
    this.text = text;
  }

  start() {
    if (this.intervalRef) {
      throw new Error('Esta thread já está rodando.');
    }

    this.intervalRef = setInterval(
      () => this.messageRef.reply(this.text),
      this.timer
    );
  }

  stop() {
    if (!this.intervalRef) {
      throw new Error('Esta thread não foi iniciada.');
    }

    clearInterval(this.intervalRef);
    this.intervalRef = null;
  }
}

class Cron {
  threads: Thread[];
  strings: {
    [key: string]: string;
  };

  constructor() {
    this.threads = [];
    this.strings = STRINGS;
  }

  execute(message: Message) {
    const data = new Parse(message.body);
    const methods: { [key: string]: () => string } = {
      log: () => this.log(),
      create: () => this.create(data, message),
      destroy: () => this.destroy(Number(data.text)),
      start: () => this.start(Number(data.text)),
      stop: () => this.stop(Number(data.text)),
      help: () => this.strings.help,
      killall: () => this.killall(),
    };

    if (methods[data.args[0]]) {
      message.reply(methods[data.args[0]]());
      return;
    }

    throw new Error('Nenhum arg válido foi passado.');
  }

  create(data: Parse, message: Message) {
    const { kwargs, text } = data;
    const timer = Time.timer(
      Number(kwargs.s),
      Number(kwargs.m),
      Number(kwargs.h),
      Number(kwargs.d)
    );

    if (timer <= 0) {
      throw new Error('Time invalid.');
    }

    const thread = new Thread(this.threads.length, text, message, timer);
    this.threads.push(thread);

    return `Thread criada usando o id ${thread.id}`;
  }

  destroy(id: number) {
    if (!this.isIdValid(id)) {
      return 'Thread não encontrada.';
    }

    this.getThread(id)!.stop();
    this.threads = this.threads.filter((t) => !(t.id === id));

    return 'Thread destruida com sucesso.';
  }

  start(id: number) {
    if (!this.isIdValid(id)) {
      return 'Thread não encontrada.';
    }

    this.getThread(id)!.start();

    return `Iniciando a thread de id ${id}`;
  }

  stop(id: number) {
    if (!this.isIdValid(id)) {
      return 'Thread não encontrada.';
    }

    this.getThread(id)!.stop();

    return `Parando a thread de id ${id}...`;
  }

  log() {
    if (this.threads.length === 0) {
      return 'Nenhuma thread aberta.';
    }

    let output = 'Threads abertas:\n\n';

    this.threads.forEach((t) => {
      output += `id: ${t.id}\ndesc: ${t.description}\n\n`;
    });

    return output.trim();
  }

  killall() {
    this.threads.forEach((t) => this.destroy(t.id));

    return 'Todas as threads foram destruidas.';
  }

  getThread(id: number) {
    const thread = this.threads.find((t) => t.id === id);

    return thread;
  }

  isIdValid(id: number) {
    return this.threads.some((t) => t.id === Number(id));
  }
}

const singleton = new Cron();

export default {
  execute: singleton.execute.bind(singleton),
  name: 'cron',
  options: {
    scope: ['group'],
    isAdmOnly: true,
  },
};
