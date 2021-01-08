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

	static call(componentName, text) {
		if (Register.get().includes(componentName)) {
			return registeredMethods[componentName](text)
		}
		else {
			console.log('E o erro cadê?')
			throw new Error(`${componentName} is not registered`)
		}
	}
}

module.exports = Register