import { Client, Message } from 'whatsapp-web.js';
import { chattools, Command, Parse } from '../utils';

const reportID = chattools.userID(process.env.REPORT_NUMBER as string);
const STRINGS = {
  help: Command.helper({
    description: 'Sugira algo com este comando.',
    usage: '!suggest --args ...',
    args: {
      feature: 'sugira algo novo.',
      remove: 'sugira remoções.',
      change: 'sugira mudanças.',
      help: 'mostra esta mensagem.',
    },
  }),
};

function execute(message: Message, client: Client) {
  const { args, text } = new Parse(message.body);
  const reportMsg = `⚠️ *${args[0]} suggestion* ⚠️\n\n${text}`;

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  if (args.length === 0 && text) {
    throw new Error('Nenhuma flag foi fornecida.');
  }
  if (args.length > 0 && !text) {
    throw new Error('Nenhuma sugestão foi fornecida.');
  }

  if (
    args.includes('feature') ||
    args.includes('remove') ||
    args.includes('change')
  ) {
    client.sendMessage(reportID, reportMsg);
    message.reply('Obrigado pela colaboração!');
    return;
  }

  throw new Error('Nenhum arg válido foi passado.');
}

export default {
  execute,
  name: 'suggest',
  options: {
    scope: ['private_chat', 'group'],
  },
};
