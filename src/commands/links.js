const { Command } = require('../utils');

const STRINGS = {
  help: Command.message`
  Lista links para os grupos coding.

  *uso:* \`\`\`!links [--args]\`\`\`

  *args válidos:* 
  \`\`\`--help\`\`\` -> _mostra esta mensagem._
  `,

  groupsLinks: Command.message`
  Coding in python:
  https://chat.whatsapp.com/I4IpHC0YFPQLUcGHJeqYdF

  Coding in C/C++:
  https://chat.whatsapp.com/Csn56Bpj8hVIQ3FiZoxBKh

  Coding in Javascript:
  https://chat.whatsapp.com/IUXcqbAPdJC2IuNfd7aaF5

  Coding in PHP:
  https://chat.whatsapp.com/C6wcXZhyT869Q29PIL1J20

  Coding in Java:
  https://chat.whatsapp.com/KDjc7IoCAYWAjCAwNEJ5cF

  Coding on Linux:
  https://chat.whatsapp.com/D37sPPhUsiT5LZ8PQeqg4t

  Coding in Taberna:
  https://chat.whatsapp.com/GOXnIXSXEFH7wHvO9aTuFs

  Speaking in English:
  https://chat.whatsapp.com/EOirNapuFe3CVunBqbwj1Z
  `,
};

class Links {
  constructor() {
    this.name = 'links';
    this.strings = STRINGS;
  }

  execute(data, message) {
    const { args } = data;

    if (args.includes('help')) {
      message.reply(this.strings.help);
      return;
    }

    message.reply(this.strings.groupsLinks);
  }
}

module.exports = Links;
