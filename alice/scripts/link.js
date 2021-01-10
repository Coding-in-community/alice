module.exports = async function(_, _, message) {
    let chat = await message.getChat()
    
    try {
        let invitation = await chat.getInviteCode()
        message.reply('https://chat.whatsapp.com/' + invitation)
    }

    catch (error) {
        message.reply('I\'m not allowed to share the link. Could you give me adm, senpai? 🥺💕')
    }
 
}