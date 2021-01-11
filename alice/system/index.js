const auth = require('./auth')
const session = new auth.Session()

const { Parse, Register } = require('./utils')

class Alice {
	constructor(components) {
		for (let component of components) {
			Register.set(component.name, component.object)
		}
	}

	init() {
		// create or resume session
		if (session.exists)
			session.load()
		else
			session.save()
		
		// show every registered function
		console.log(Register.get())

		session.on('message', async (message) => {
			let content = new Parse(message)
		
			if (content.method) {
				Register.call(content.method, content.text, content.args, message, session)
			}
		
		})
		
		session.start()
	}
}


module.exports = Alice