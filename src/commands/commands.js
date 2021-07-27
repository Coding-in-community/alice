class Commands {
  constructor() {
    this.name = 'commands';
    this.defaultMessage = `
Os seguintes comandos estão disponiveis:
- !bot
- !coin
- !commands
- !cron
- !doc
- !links
- !lyric
- !report
- !search
- !suggest
- !wiki
    `.trim();
  }

  execute(_, message) {
    message.reply(this.defaultMessage);
  }
}

module.exports = Commands;
