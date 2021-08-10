const STRINGS = {
  help: `
Lista todos os comandos disponíveis.

*uso:* \`\`\`!commands [--args]\`\`\`

*args válidos:* 
  \`\`\`--help\`\`\` -> _mostra esta mensagem._
  `.trim(),

  availableCommands: `
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
  `.trim(),
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
