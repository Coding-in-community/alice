import { Message } from 'whatsapp-web.js';
import { Command, Parse } from '../utils';

const STRINGS = {
  help: Command.helper({
    description: 'Lista links para os grupos coding.',
    usage: '!links [--args]',
    args: {
      help: 'mostra esta mensagem.',
    },
  }),

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

function execute(message: Message): void {
  const { args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  message.reply(STRINGS.groupsLinks);
}

export default {
  execute,
  name: 'links',
  options: {
    scope: ['private_chat', 'group'],
  },
};
