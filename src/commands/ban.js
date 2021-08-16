const { Command, Parse, Time } = require('../utils');

const STRINGS = {
  help: Command.helper({
    description: 'Remove do grupo os usuários mencionados.',
    usage: '!ban [--args] @user1 @user2... ',
    args: { help: 'mostra esta mensagem.' },
  }),
};

async function execute(message) {
  const { args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  const contacts = await message.getMentions();
  const chat = await message.getChat();

  contacts.forEach(async (c) => {
    // eslint-disable-next-line no-underscore-dangle
    await chat.removeParticipants([c.id._serialized]);
    await Time.sleep(0.5);
  });
}

module.exports = {
  execute,
  name: 'ban',
  options: {
    isAdmOnly: true,
    scope: ['group'],
  },
};
