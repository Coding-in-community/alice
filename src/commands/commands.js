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

function execute(message) {
  const { args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  message.reply(STRINGS.availableCommands);
}

module.exports = {
  name: 'commands',
  execute,
};
