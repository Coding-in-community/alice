const fs = require('fs')
const register = require('./register')

/*
para um componente funcionar ele deve ser criado de acordo com os seguinte critérios:
  - parametros
    a. poderá receber text[string] como primeiro parametro
    b. poderá rebeber arguments[object] como segundo parametro
    c. deverá não receber qualquer outro parametro

  - retorno
    c. deverá retornar um body[object] contendo response[string]
    d. poderá retornar no body[object] um valor help[string] contendo a descrição do uso

  - nomeclatura do arquivo
    e. deverá utilizar _ (sublinhado) no começo do nome de cada arquivo
    f. deverá registrar o componente com o mesmo nome dado ao arquivo
    g. poderá registrar com ou sem extensão .js
    h. recomenda-se utilizar uma nomeclatura que faça sentido
    i. recomenda-se sempre utilizar letras em caixa baixa 
    
  - estrutura do arquivo  
    j. deverá utilizar exports.default na função principal
*/



// REGISTER
let registerData = require('./methods.json')
console.log(registerData)

registerData.map(elem => {
  register.set(
    elem.filePath,
    elem.componentName
  )
})

// EXPORT
exports.get = register.get
exports.set = register.set
exports.call = register.call

// DEBUG
console.log(register.get())