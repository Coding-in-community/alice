import { GroupChat, Message } from 'whatsapp-web.js';
import { Command, Parse, Time } from '../utils';

const STRINGS = {
  help: Command.helper({
    description: 'Remove do grupo os usuários mencionados.',
    usage: '!ban [--args] @user1 @user2... ',
    args: { help: 'mostra esta mensagem.' },
  }),
};

async function execute(message: Message) {
  const { args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  const contacts = await message.getMentions();
  const chat = (await message.getChat()) as GroupChat;

  contacts.forEach(async (c) => {
    await chat.removeParticipants([c.id._serialized]);
    await Time.sleep(0.5);
  });
}

export default {
  execute,
  name: 'ban',
  options: {
    isAdmOnly: true,
    scope: ['group'],
  },
};
