const REGEXP = {
	// example: !some_method
	METHOD: /!([^\s]+)/,

	// example: --some_flag
	ARGS: /--([\S]+)(?=\s|$)/g,

    KWARGS: /--([a-zA-Z0-9_-]+)="?([a-z0-9\.]+)"?/g

}

class Content {
    constructor(text) {
        this.originalText = text.trim()
    }

    get method() {
        let matches = this.originalText.match(REGEXP.METHOD)
        
        return matches? matches[1] : ''
    }

    get args() {
        let matchesIter = this.originalText.matchAll(REGEXP.ARGS)
        let matchesArray = [...matchesIter]
        let matches = matchesArray.map(elem => elem[1])

        return matches
    }

    get kwargs() {
        let obj = new Object()

        let matchesIter = this.originalText.matchAll(REGEXP.KWARGS)
        let matchesArray = [...matchesIter]
        let matches = matchesArray.map(elem => {
            Object.assign(obj, {[elem[1]]: elem[2]})
        })

        return obj
    }

    get string() {
        return this.originalText
            .replace(REGEXP.METHOD, '')
            .replace(REGEXP.ARGS, '')
            .replace(REGEXP.KWARGS, '')
            .trim()
    }
}

module.exports = {
    Content
}