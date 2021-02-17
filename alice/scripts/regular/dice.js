let help = `Para chamar o dado você deve digitar !dice seguido do seu valor. 
    
Ele deve ser escrito na forma <multiplicador>d<quantidade de lados>+<valor adicional>, sendo o valor adicional um atributo opcional. 
Caso seja passado o valor adicional, ele deve ser escrito sem espaços, ou será considerado nulo.
Ex: 
  - !dice 1d10 + 4 // Joga um dado de dez lados mas *não* faz a soma.
`

module.exports = function (text) {
	let regexp = /(\d+)d(\d+)([-|+]\d+)?/
	let match = text.match(regexp)

	if (text && match) {
		let pattern = match[0]
		let multiplier = Number(match[1])
		let value = Math.ceil(Math.random() * Number(match[2]))
		let adder = Number(match[3]) || 0

		let result = `Resultado: ${value}\nMultiplicador: ${multiplier}\nAdicional: ${adder}\nTotal: ${(multiplier * value) + adder}\n`

		return result
	}

	else if (text) {
		return 'Não foi possivel achar o valor, use !dice para mais informações.'
	}

	else {
		return help
	}
}