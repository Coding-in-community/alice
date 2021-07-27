class Links {
  constructor() {
    this.name = 'links';
    this.defaultMessage = `
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
    `.trim();
  }

  execute(_, message) {
    message.reply(this.defaultMessage);
  }
}

module.exports = Links;
