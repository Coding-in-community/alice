const { Command } = require('../utils');

const STRINGS = {
  help: Command.message`
  Lista todos os comandos disponíveis.

  *uso:* \`\`\`!commands [--args]\`\`\`

  *args válidos:* 
  \`\`\`--help\`\`\` -> _mostra esta mensagem._
  `,

  availableCommands: Command.message`
  Os seguintes comandos estão disponiveis:
  - !about
  - !coin
  - !commands
  - !cron
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
