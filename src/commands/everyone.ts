import { GroupChat, Message } from 'whatsapp-web.js';
import { Command, Parse } from '../utils';

const STRINGS = {
  help: Command.helper({
    description: 'Marca todos os membros do grupo na mensagem citada',
    usage: '!everyone [--args]',
    args: {
      help: 'mostra esta mensagem.',
    },
  }),

  defaultMessage: Command.message`@everyone`,
};

async function execute(message: Message) {
  const { args } = new Parse(message.body);

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  const chat = (await message.getChat()) as GroupChat;
  const { participants } = chat;

  if (message.hasQuotedMsg) {
    const quotedMessage = await message.getQuotedMessage();
    quotedMessage.reply(STRINGS.defaultMessage, undefined, {
      // @ts-ignore
      mentions: participants,
    });
    return;
  }

  throw new Error('No message was replied.');
}

export default {
  execute,
  name: 'everyone',
  options: {
    scope: ['group'],
    isAdmOnly: true,
  },
};
