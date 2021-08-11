const { Command } = require('../utils');

const STRINGS = {
  help: Command.helper({
    description: 'Lista todos os comandos disponíveis.',
    usage: '!commands [--args]',
    args: {
      help: 'mostra esta mensagem.',
    },
  }),

  availableCommands: Command.message`
  Os seguintes comandos estão disponiveis:
  - !about
  - !coin
  - !commands
  - !cron
  - !everyone
  - !links
  - !lyric
  - !report
  - !search
  - !suggest
  - !wiki
  `,
};

class Commands {
  constructor() {
    this.name = 'commands';
    this.strings = STRINGS;
  }

  execute(data, message) {
    const { args } = data;

    if (args.includes('help')) {
      message.reply(this.strings.help);
      return;
    }

    message.reply(this.strings.availableCommands);
  }
}

module.exports = Commands;
