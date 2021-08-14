const chattools = require('./chattools');

/**
 * @see https://docs.wwebjs.dev/Message.html
 * @param {object} options
 * @param {object} options.isAdmOnly
 * @param {object} options.scope
 * @param {Message} message
 * @returns {boolean} `true` if the command/module should be inhibited, `false` if not.
 */
async function inhibitor(options, message) {
  const { isAdmOnly, scope = [] } = options;
  const chat = await message.getChat();

  if (
    (chat.isGroup && !scope.includes('group')) ||
    (!chat.isGroup && !scope.includes('private_chat'))
  ) {
    return true;
  }

  if (isAdmOnly && !(await chattools.isFromAdm(message))) {
    return true;
  }

  return false;
}

module.exports = inhibitor;
