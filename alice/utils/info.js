/*
informações relevantes:
  - autor
  - chat
  - é um grupo?
  - mensagem marcada
  - menções
*/

exports.Info = class {
    constructor(message) {
        this.chat = await message.getChat()
    }

    get isGroup() { 
    }

    get id() {
    }
}
