const assert = require('assert')

function userID(targetNumber) {
    assert.strictEqual(typeof targetNumber, 'string', 'you must pass the number as a string')

    targetNumber = targetNumber.replace(/\D/g, '')
  
    let regexp = /\d+/
    let matches = targetNumber.match(regexp)
    let pattern = matches[0]

    return pattern + '@c.us'
}

module.exports = {
    userID
}