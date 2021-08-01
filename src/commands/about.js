const STRINGS = {
  help: `
Mostra informações sobre o bot.

*uso:* \`\`\`!about [--args]\`\`\`

*args válidos:* 
  \`\`\`--help\`\`\` -> _mostra esta mensagem._
  `.trim(),

  about: `
Alice foi criada utilizando a biblioteca \`\`\`whatsapp-web.js\`\`\` como base sob licença Apache 2.0. Saiba mais em _https://github.com/pedroslopez/whatsapp-web.js_

Não sabe como usar um comando? Use a flag help, ex: \`\`\`!lyric --help\`\`\`. Se não conhece os comandos, use \`\`\`!commands\`\`\`

_Quer contribuir? Então dá uma olhada em https://github.com/Coding-in-community/alice_
  `.trim(),
};

class About {
  constructor() {
    this.name = 'about';
    this.strings = STRINGS;
  }

  execute(data, message) {
    const { args } = data;

    if (args.includes('help')) {
      message.reply(this.strings.help);
      return;
    }

    message.reply(this.strings.about);
  }
}

module.exports = About;
