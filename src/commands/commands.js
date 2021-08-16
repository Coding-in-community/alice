const { Command, Parse } = require('../utils');

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
  - !ban
  - !coin
  - !commands
  - !cron
  - !demote
  - !everyone
  - !links
  - !lyric
  - !promote
  - !report
  - !search
  - !suggest
  - !wiki
  `,
};

function execute(message) {
  const { args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  message.reply(STRINGS.availableCommands);
}

module.exports = {
  execute,
  name: 'commands',
  options: {
    scope: ['private_chat', 'group'],
  },
};
