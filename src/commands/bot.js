class Bot {
  constructor() {
    this.name = 'bot';
    this.defaultMessage =
      'Olá, eu sou a Alice. Quer saber mais sobre mim? use o comando !doc';
  }

  execute(_, message) {
    message.reply(this.defaultMessage);
  }
}

module.exports = Bot;
