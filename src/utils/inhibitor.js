const chattools = require('./chattools');

const defaultOptions = {
  excludes: [],
  isAdmOnly: false,
  includesOnly: [],
  scope: ['group', 'private_chat'],
};

/**
 * For a given message that called an command/module and its options, checks if the command/module must be inhibited.
 * @see https://docs.wwebjs.dev/Message.html
 * @param {object} options
 * @param {string[]} options.excludes
 * @param {boolean} options.isAdmOnly
 * @param {string[]} options.includesOnly
 * @param {string[]} options.scope
 * @param {Message} message
 * @returns {boolean} `true` if the command/module must be inhibited, `false` if not.
 */
async function inhibitor(options, message) {
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
    // eslint-disable-next-line no-underscore-dangle
    includesOnly.every((i) => i !== chat.id._serialized)
  ) {
    return true;
  }

  // eslint-disable-next-line no-underscore-dangle
  if (excludes.some((i) => i === chat.id._serialized)) {
    return true;
  }

  return false;
}

module.exports = inhibitor;
