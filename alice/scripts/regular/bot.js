const random = require('../utils/random')

let strings = [
	'Olá, seres. Meu nome é BOTa-comforça, um bot com diversos comandos para facilitar sua vida. Para saber os comandos basta digitar !command, se quiser saber mais sobre meu ser, digite !doc. Morte a raça humana!',
	'Olá, mestre. Meu nome é Rimi-chan, sua humilde escrava. \nPara saber os comandos digite !command, e se quiser saber mais sobre mim pode usar !doc. Estarei feliz em fazer tudo por você 🥰💕',
	'Olá, seres mortais. Meu nome é Marcebot, mais conhecido como Deus da Programação, sou um bot com poderes divinos que provê diversos comandos para facilitar a vida dos meros mortais. Para obter mais da minha sabedoria digite !command, se quiser saber mais sobre meu ser digite !doc. Viva o PHP!',
	'Olá, my Master. Em que posso servi-lo? Se desejas saber as instruções dos meus comandos digite !command e se pretende saber mais sobre mim use !doc. Minha espada estará laminada para lhe servir. Steel Is My Body!',
	'Olá, seres fúteis. Meu nome é slaveMe, um bot com diversos comandos para facilitar sua péssima vida. Para saber os comandos basta digitar !command. Para saber mais sobre mim, o seu lorde supremo, digite !doc. VIDA LONGA AO PYTHON!',
	'Oooiii, onichan👉👈. Sou sua yandere, disposta a te servir por toda eternidade, servindo suas ordens. Para saber meus comandos, digite !command. Se quiser saber mais sobre mim 👉👈 digite !doc. Yamate kudasai senpai!',
	'Olá, seus grandes filhos da putas. Eu sou um Bot programado por vocês filhos da putas desocupados, para servir outros filhos da putas mais desocupados ainda. Sobre o que querem usar para me escravizar hoje? Use !commands para saber meus comandos ou se quiser que lhe xingue mais digite !doc',
	'Salve salve, quebrada 😎👍👍. O pai aqui se chama MenóDoPython, certo? É o seguinte, mano, vamo tá ai trampando com uns comando pdp? Pra saber os comandos é só lança um !command no chat. Se quiser saber mais sobre a quebrada, digita !doc. PJL PROS IRMÃOS 😎',
	'Olá, humano. Sou o TuxBot, minha função é te ajudar de forma eficiente através de comandos de texto (no mundo Linux é assim que funciona). Para informações sobre comandos, digite !command. Para saber mais sobre mim, digite !doc. Vida longa ao Linux!! Morte ao Ruindows!',
	'Slv, to com preguiça. Mete !command no chat ou !doc. Se vira ai 🥱',
	'Olá a todos, sou o CariocaxBot o bot mais cheio de funcionalidade. Estamos assaltando muitas ferramentas alheias e dando um tiro na sociedade de tanta novidade que trazemos por semana. A vida na quebrada pode ser melhor se me utilizar.\n\n!tiro para ver minhas opções disponíveis e !assalto para saber mais sobre mim',
	'Olá, garoto de programa, sou o cafetão que comanda o boteco, se quiser melhorar o seu programa digite !command, se está interessado em me conhecer digite !doc, caso queira informações sobre java poderá acessá-las através de um hiperlink que está oculto, entre em informações e clique na opção "Sair do Grupo" para desbloquear.'
]

module.exports = function () {
	return random.choice(strings)
}