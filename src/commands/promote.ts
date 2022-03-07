import { GroupChat, Message } from 'whatsapp-web.js';
import { Command, Parse, Time } from '../utils';

const STRINGS = {
  help: Command.helper({
    description: 'Promove a ADM os usuários mencionados.',
    usage: '!promote [--args] @user1 @user2... ',
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
    await chat.promoteParticipants([c.id._serialized]);
    await Time.sleep(0.5);
  });
}

export default {
  execute,
  name: 'promote',
  options: {
    isAdmOnly: true,
    scope: ['group'],
  },
};
