const time = require('../utils/time')
const chattools = require('../utils/chattools')

module.exports = async function(_, _, message) {
    let chat = await message.getChat()
    let mentions = await message.getMentions()   
    let mentionsSerialList = chattools.getSerialList(mentions)

    let isAdm = await chattools.isAdm(message)
    let hasMentions = mentions.length > 0

    // se for adm e tiver menções
    if (isAdm && hasMentions) {
        for (let mentionSerial of mentionsSerialList) {
            await chat.removeParticipants([mentionSerial])
            await time.sleep(0.5)
        }
    }

    // se for adm e não tiver menções
    else if (isAdm && !hasMentions) {
        return 'maybe you should mention somebody'
    }

    // se não for adm
    else if (!isAdm) {
        return 'you\'re not and admin'
    }

    // outros erros
    else {
        return 'you should\'ve given me adm first'
    }
}
