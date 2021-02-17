function isFunction(object) {
    return (typeof object === 'function')
}

function isEmpty(object) {
    return (!object || Object.keys(object).length === 0)
}

class Components {
    constructor() {
        this.components = {}
    }

    get methods() {
		return Object.keys(this.components)
    }

    set(name, object) {
        if (isFunction(object)) {
            this.components[name] = object
        }

        else if (isEmpty(object)) {
			throw Error(`${name} component cannot be empty`)
        }

        else {
			throw Error(`${object} must be a function`)
        }
    }

    async call(name, text, args, message, client) {
        if (this.methods.includes(name)) {
            let response = await this.components[name](
                text,
                args,
                message,
                client
            )

            response && message.reply(String(response)) 
        }

        else if (name) {
			throw Error(`${name} is not registered`)
        }

        else {
            throw Error('method call is not found')
        }
    }
}

exports.Components = Components