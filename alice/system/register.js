let registeredMethods = {}

module.exports = {
  /**
   * [registra o componente e faz sua instancia como um método]
   * @param  {[String]} componentName [nome do arquivo onde está o componente]
   * @return {[null]}
  */
  set(filePath, componentName) {
      try {
          registeredMethods[componentName] = require(filePath)
          console.log(filePath)
      }
      catch {
          console.log(`The component in ${filePath} is not found`)
      }
  },


  /**
   * [registra o componente e faz sua instancia como um método]
   * @param  {[String]} componentName [nome do arquivo onde está o componente]
   * @return {[null]}
  */
  get() {
    console.log(registeredMethods)
    return Object.keys(registeredMethods) 
  },


  /**
   * [chama o método registrado]
   * @param  {[String]} componentName [nome do método]
   * @return {[String]} [resposta do método]
  */
  call(method, text) {
      try {
          return registeredMethods[method](text)
      }

      catch {}
  }
}