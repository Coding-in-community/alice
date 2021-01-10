// as convetion you should try to use the same module name as always as possible
// it makes easy to find files and errors

/**
 * It is just an example.
 * @param {string} text - The text wrote in whatsapp after method and flags.
 * @param {object} args - The flags passed on original text [NOT IMPLEMENTED YET].
 * @param {object} message - The class which handles all message methods.
 * @param {object} client - The class which handles browser methods.
*/
function _example(text, _, message) {
    let splitString = text.split('')
    let reverseArray = splitString.reverse()
    let joinArray = reverseArray.join('')

    // quote a message and responds 
    message.reply(joinArray)

    // by default if you return something it will trigger console.log
} 

// module.exports is not really needed
module.exports = _example
// but it makes easier to import later