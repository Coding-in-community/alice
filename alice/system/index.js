const auth = require('./auth')
const builder = require('./builder')
const parser = require('./parser')

const session = new auth.Session()
const components = new builder.Components()

class Alice {
    constructor(objectArray) {
        this.options = {
            trigger: 'message'
        }

        for (let [name, object] of objectArray) {
            components.set(name, object)
        }
    }

    initialize() {
        // create or resume session
        if (session.exists)
            session.load()
        else
            session.save()

        // start session
        session.start()

        // call method over a trigger event
        session.on(this.options.trigger, async (message) => {
            let content = new parser.Content(message)

            if (components.methods.includes(content.method)) {
                components.call(
                    content.method,
                    content.text,
                    content.args,
                    message,
                    session
                )
            }
        })
    }
}

module.exports = Alice
