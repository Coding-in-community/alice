/**
 * Get serialized phone number from a given array of users.
 * @param {Contact[]} users - Whatsapp users.
 * @see https://docs.wwebjs.dev/Contact.html
 * @returns {string[]} - Serialized phone numbers.
 */
function getSerialList(users) {
  // eslint-disable-next-line no-underscore-dangle
  const serialList = users.map((u) => u.id._serialized);
  return serialList;
}

/**
 * Get serialized phone number of all members from a given group.
 * @param {Chat} chat - A whatsapp chat.
 * @see https://docs.wwebjs.dev/Chat.html
 * @returns {string[]} - Serialized phone numbers of all members.
 */
async function getMembersList(chat) {
  const members = await chat.participants;
  const membersSerialList = getSerialList(members);
  return membersSerialList;
}

/**
 * Get serialized phone number of all administrators from a given group.
 * @param {Chat} chat - A whatsapp chat.
 * @see https://docs.wwebjs.dev/Chat.html
 * @returns {string[]} - Serialized phone numbers of all administrators.
 */
async function getAdmsList(chat) {
  const members = await chat.participants;
  const admsIdList = members.filter((id) => id.isAdmin);
  const admsSerialList = getSerialList(admsIdList);
  return admsSerialList;
}

/**
 * Checks if a message is from an ADM.
 * @param {Message} message - Message to check if is from an ADM.
 * @see https://docs.wwebjs.dev/Message.html
 * @returns {boolean}
 */
async function isAdm(message) {
  const chat = await message.getChat();
  const admList = await getAdmsList(chat);
  const { author } = message;
  return admList.includes(author);
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
  getAdmsList,
  getMembersList,
  getSerialList,
  isAdm,
  userID,
};
