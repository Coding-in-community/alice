/**
 * Get serialized number
 * @param {Array<Object>} idList - An array containing objects about user identification.
 * @return {Array<String>} - Contains serialized phone numbers
 */
function getSerialList(idList) {
  // eslint-disable-next-line no-underscore-dangle
  const serialList = idList.map((id) => id.id._serialized);
  return serialList;
}

/**
 * Get serialized number of all members in group
 * @param {Object} chat - Object that represents the current chat
 * @return {Array<String>} - Contains serialized phone numbers of all members
 */
async function getMembersList(chat) {
  const members = await chat.participants;
  const membersSerialList = getSerialList(members);
  return membersSerialList;
}

/**
 * Get serialized number of all administrators in group
 * @param {Object} chat - Object that represents the current chat
 * @return {Array<String>} - Contains serialized phone numbers of all administrators
 */
async function getAdmsList(chat) {
  const members = await chat.participants;
  const admsIdList = members.filter((id) => id.isAdmin);
  const admsSerialList = getSerialList(admsIdList);
  return admsSerialList;
}

/**
 * Check if a message if from an adm
 * @param {Object} message - Object that represents the current message
 * @return {Boolean}
 */
async function isAdm(message) {
  const chat = await message.getChat();
  const admList = await getAdmsList(chat);
  const { author } = message;
  return admList.includes(author);
}

module.exports = {
  getAdmsList,
  getMembersList,
  getSerialList,
  isAdm,
};
