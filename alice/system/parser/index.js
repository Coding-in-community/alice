const REGEXP = {
	// example: !some_method
	METHOD: /!([^\s]+)/,

	// example: --some_flag or --some_flag <string>
	ARGS: /--([a-zA-Z]+)(?:\s+"(.+)[^"]")?/g,
}


class Content {
	/**
		 * @param {Object} message - message object from client
		 */
	constructor(message) {
		this.original = message.body.trim();
	};

	/**
		 * get method name from raw message
		 * @returns {string} 
		 */
	get method() {
		let matches = this.original.match(REGEXP.METHOD);
		let _method;

		if (matches) {
			_method = matches[1];
		}

		return _method;
	}

	/**
		 * get arguments from raw message
		 * @returns {string} 
		 */
	get args() {
		let marchesInterator = this.original.matchAll(REGEXP.ARGS);
		let _args = {};

		for (let matches of marchesInterator) {
			let flag = matches[1];
			let argument = matches[2];

			if (argument) _args[flag] = argument;
			else _args[flag] = true;
		}
		
		return _args;
	}

	/**
		 * parse text from raw message
		 * @returns {string} 
		 */
	get text() {
		return this.original
			.replace(REGEXP.METHOD, '')
			.replace(REGEXP.ARGS, '')
			.trim();
	}
}

exports.Content = Content