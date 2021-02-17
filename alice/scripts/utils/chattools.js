/**
 * Get serialized number
 * @param {Array<Object>} idList - An array containing objects about user identification.
 * @return {Array<String>} - Contains serialized phone numbers
 */
function getSerialList(idList) {
	let serialList = idList.map(elem => elem.id._serialized)

	return serialList
}

/**
 * Get serialized number of all members in group
 * @param {Object} chat - Object that represents the current chat
 * @return {Array<String>} - Contains serialized phone numbers of all members
 */
async function getMembersList(chat) {
	let members = await chat.participants

	let membersSerialList = getSerialList(members)

	return membersSerialList
}

/**
 * Get serialized number of all administrators in group
 * @param {Object} chat - Object that represents the current chat
 * @return {Array<String>} - Contains serialized phone numbers of all administrators
 */
async function getAdmsList(chat) {
	let members = await chat.participants

	let admsIdList = members.filter(elem => elem.isAdmin)
	let admsSerialList = getSerialList(admsIdList)

	return admsSerialList
}

/**
 * Check if a message if from an adm
 * @param {Object} message - Object that represents the current message
 * @return {Boolean} 
 */
async function isAdm(message) {
	let chat = await message.getChat()

	let admList = await getAdmsList(chat)
	let author = message.author

	console.log(admList, author);
	return admList.includes(author)
}

module.exports = {
	getAdmsList,
	getMembersList,
	getSerialList,
	isAdm
}