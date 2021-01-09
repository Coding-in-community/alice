let registeredMethods = {}

class Register {
	static set(componentName, component) {
		if (typeof component === 'function') {
			registeredMethods[componentName] = component
		}
		else if (!component){
			throw Error(`${componentName} component cannot be empty`)
		}
		else {
			throw Error(`${componentName} must be a function`)
		}
	}

	static get() {
		return Object.keys(registeredMethods)
	}

	static async call(componentName, text, args, message, client) {
		if (Register.get().includes(componentName)) {
			let response = await registeredMethods[componentName](text, args, message, client)
			if (response) console.log(response)
		}
		else {
			console.log(`${componentName} is not registered`)
			throw new Error(`${componentName} is not registered`)
		}
	}
}

module.exports = Register