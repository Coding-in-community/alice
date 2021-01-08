async function getAdminUsers(chat) {
    let members = await chat.participants

    admins = members.filter(elem => elem.isAdmin)
    adminsUsers = admins.map(elem => elem.id._serialized)

    return adminsUsers
}

module.exports = async function(_, message) {
    let chat = await message.getChat()
    let admins = await getAdminUsers(chat)

    if (admins.includes(message.author)) {
        let mentions = await message.getMentions()
        
        let participants = mentions.map(elem => elem.id._serialized)

        await chat.removeParticipants(participants)
    }

    else {
        message.reply('you are not an adm')
    }
}