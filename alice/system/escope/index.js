class Switcher {
    constructor(message) {
        this.message = message
    }

    case(escope) {
        let chat = this.message.getChat()

        if (escope === 'all') {
            return true
        }

        else if (escope === 'none') {
            return false
        }

        else if (escope === 'group') {
            return chat.isGroup
        }

        else if (escope === 'private') {
            return !chat.isGroup
        }
    }
}

module.exports = { Switcher }