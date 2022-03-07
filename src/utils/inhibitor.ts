import { Message } from 'whatsapp-web.js';
import { InhibitorOptions } from '../types';
import chattools from './chattools';

const defaultOptions = {
  excludes: [],
  isAdmOnly: false,
  includesOnly: [],
  scope: ['group', 'private_chat'],
};

/**
 * For a given message that called an command/module and its options, checks if the command/module must be inhibited.
 */
async function inhibitor(
  options: InhibitorOptions | undefined,
  message: Message
): Promise<boolean> {
  const chat = await message.getChat();
  const { isAdmOnly, scope, includesOnly, excludes } = {
    ...defaultOptions,
    ...options,
  };

  if (
    (chat.isGroup && !scope.includes('group')) ||
    (!chat.isGroup && !scope.includes('private_chat'))
  ) {
    return true;
  }

  if (isAdmOnly && !(await chattools.isFromAdm(message))) {
    return true;
  }

  if (
    includesOnly.length > 0 &&
    includesOnly.every((i) => i !== chat.id._serialized)
  ) {
    return true;
  }

  if (excludes.some((i) => i === chat.id._serialized)) {
    return true;
  }

  return false;
}

export default inhibitor;
