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

	static async call(componentName, text, message, client) {
		if (Register.get().includes(componentName)) {
			return await registeredMethods[componentName](text, message, client)
		}
		else {
			console.log('E o erro cadê?')
			throw new Error(`${componentName} is not registered`)
		}
	}
}

module.exports = Register