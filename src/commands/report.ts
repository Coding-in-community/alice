import { Client, Message } from 'whatsapp-web.js';
import { chattools, Command, Parse } from '../utils';

const reportID = chattools.userID(process.env.REPORT_NUMBER as string);
const STRINGS: { [key: string]: string } = {
  help: Command.helper({
    description: 'Reporte problemas no bot ou um usuário.',
    usage: '!report --args ...',
    args: {
      bug: 'reporta um bug.',
      user: 'reporta um usuário.',
      help: 'mostra esta mensagem.',
    },
  }),

  bug: 'Sua solicitação será analisada. Caso confirmada, abriremos uma issue',

  user: 'O usuário foi reportado a administração',
};

function execute(message: Message, client: Client) {
  const { args, text } = new Parse(message.body);
  const reportMsg = `⚠️ *${args[0]} report* ⚠️\n\n${text}`;

  if (args.includes('help')) {
    message.reply(STRINGS.help);
    return;
  }

  if (args.length === 0 && text) {
    throw new Error('Nenhuma flag foi fornecida.');
  }
  if (args.length > 0 && !text) {
    throw new Error('Nenhuma descrição foi fornecida.');
  }

  if (args.includes('bug') || args.includes('user')) {
    client.sendMessage(reportID, reportMsg);
    message.reply(STRINGS[args[0]]);
    return;
  }

  throw new Error('Nenhum arg válido foi passado.');
}

export default {
  execute,
  name: 'report',
  options: {
    scope: ['private_chat', 'group'],
  },
};
