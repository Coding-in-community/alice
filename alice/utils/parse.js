// se possiu determinado método
// se o método é válido
// se possuiu texto
// se o texto é válido
// se possui argumentos
// se os argumentos são válidos

module.exports = class { 
    constructor(message) {
        this.original = message.body.trim()

        this.method = this._method.name
        this.text = this._text
        this.error = this._method.error
    }

    get _method() {
        let pattern = /!([^\s]+)/
        let matches = this.original.match(pattern)
        
        let found = {pattern: null, name: null, error: null}

        if (matches) {
            found.pattern = matches[0]

            if (this.original.startsWith(found.pattern)) {
                found.name = matches[1]
            }

            else {
                found.error = 'Error: String doesn\'t start with a method'
            }
        }

        else {
            found.error = 'Error: Method not Found'
        }

        return found
    }
    
    get _text() {
        return this.original.replace(this._method.pattern, '').trim()
    }
} 