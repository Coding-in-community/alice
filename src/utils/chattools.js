/**
 * Get serialized phone number from a given array of users.
 * @see https://docs.wwebjs.dev/Contact.html
 * @param {Contact[]} users - Whatsapp users.
 * @returns {string[]} - Serialized phone numbers.
 */
function getSerials(users) {
  // eslint-disable-next-line no-underscore-dangle
  const serials = users.map((u) => u.id._serialized);
  return serials;
}

/**
 * Get serialized phone number of all members from a given group.
 * @see https://docs.wwebjs.dev/Chat.html
 * @param {Chat} chat - A whatsapp chat.
 * @returns {string[]} - Serialized phone numbers of all members.
 */
async function getMembers(chat) {
  const members = await chat.participants;
  const membersSerials = getSerials(members);
  return membersSerials;
}

/**
 * Get serialized phone number of all administrators from a given group.
 * @see https://docs.wwebjs.dev/Chat.html
 * @param {Chat} chat - A whatsapp chat.
 * @returns {string[]} - Serialized phone numbers of all administrators.
 */
function getAdms(chat) {
  if (!chat.isGroup) {
    throw new Error(`This chat isn't a group.`);
  }

  const { participants } = chat;
  const admsIds = participants.filter((id) => id.isAdmin);
  const admsSerials = getSerials(admsIds);
  return admsSerials;
}

/**
 * Checks if an message is from an ADM.
 * @see https://docs.wwebjs.dev/Message.html
 * @param {Message} message - Message to check if is from an ADM.
 * @returns {boolean}
 */
async function isFromAdm(message) {
  const chat = await message.getChat();
  const adms = getAdms(chat);
  const { author } = message;
  return adms.includes(author);
}

/**
 * Get a whatsapp user id for a given phone number.
 * @param {string} phoneNumber
 * @returns {string}
 */
function userID(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    throw new Error('you must pass the number as a string');
  }

  const target = phoneNumber.replace(/\D/g, '');
  const regexp = /\d+/;
  const matches = target.match(regexp);
  const pattern = matches[0];
  return `${pattern}@c.us`;
}

module.exports = {
  getAdms,
  getMembers,
  getSerials,
  isFromAdm,
  userID,
};
