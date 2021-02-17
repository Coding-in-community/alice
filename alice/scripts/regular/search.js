const search = require('../utils/search')

function callback(object) {
	let title = object.title
	let link = object.link
	let snippet = object.snippet

	return `
*${title}*

${snippet}

_${link}_
`
}

module.exports = async function (text, args, message) {
	let limit

	if (args.limit && args.limit !== 'none') {
		limit = Number(args.limit)
	}
	else if (args.limit === 'none') {
		limit = false
	}
	else {
		limit = 1
	}

	let target
	if (args.target) {
		target = args.target
	}
	else {
		target = ''
	}

	let results = await search.google(text, target, limit)

	if (results.length > 0 && text) {
		let stringResult = results.map(elem => callback(elem))
			.join('\n\n')
			.trim()

		message.reply(stringResult)
	}
	else if (results.length > 0 && !text) {
		message.reply('I think you should type something to search...')
	}
	else {
		message.reply('Gomenasai, goshujin-sama. I can\'t find your search')
	}
}
