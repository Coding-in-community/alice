module.exports = async function(_, _, message) {
    let chat = await message.getChat()
    
    try {
        let invitation = await chat.getInviteCode()
        return 'https://chat.whatsapp.com/' + invitation
    }

    catch {
        return 'I\'m not allowed to share the link. Could you give me adm, senpai? 🥺💕'
    }
 
}