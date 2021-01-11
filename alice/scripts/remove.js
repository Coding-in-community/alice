const time = require('./utils/time')

async function getAdminUsers(chat) {
    let members = await chat.participants

    admins = members.filter(elem => elem.isAdmin)
    adminsUsers = admins.map(elem => elem.id._serialized)

    return adminsUsers
}

module.exports = async function(_, _, message) {
    let chat = await message.getChat()
    let admins = await getAdminUsers(chat)

    if (admins.includes(message.author)) {
        let mentions = await message.getMentions()   

        if (mentions) {
            let membersId = mentions.map(elem => elem.id._serialized)
    
            let sleepSeconds = 0.5

            for (let memberId of membersId) {
    
                await chat.removeParticipants([memberId])
                await time.sleep(sleepSeconds)
    
            }
        }

        else {
            message.reply('you must mention at least one member')
        }

    }

    else {
        message.reply('you are not an adm')
    }
}