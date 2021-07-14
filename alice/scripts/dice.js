const help = `Para chamar o dado você deve digitar !dice seguido do seu valor. 

Ele deve ser escrito na forma <multiplicador>d<quantidade de lados>+<valor adicional>, sendo o valor adicional um atributo opcional. 
Caso seja passado o valor adicional, ele deve ser escrito sem espaços, ou será considerado nulo.
Ex: 
  - !dice 1d10 + 4 // Joga um dado de dez lados mas *não* faz a soma.
`;

module.exports = (data) => {
  const { text } = data;
  const regexp = /(\d+)d(\d+)([-|+]\d+)?/;
  const match = text.match(regexp);

  if (text && match) {
    const multiplier = Number(match[1]);
    const value = Math.ceil(Math.random() * Number(match[2]));
    const adder = Number(match[3]) || 0;

    const result = `Resultado: ${value}\nMultiplicador: ${multiplier}\nAdicional: ${adder}\nTotal: ${
      multiplier * value + adder
    }\n`;

    return result;
  }
  if (text) {
    return 'Não foi possivel achar o valor, use !dice para mais informações.';
  }
  return help;
};
