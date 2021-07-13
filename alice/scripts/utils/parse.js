const assert = require('assert');

function userID(targetNumber) {
  assert.strictEqual(
    typeof targetNumber,
    'string',
    'you must pass the number as a string'
  );

  const target = targetNumber.replace(/\D/g, '');

  const regexp = /\d+/;
  const matches = target.match(regexp);
  const pattern = matches[0];

  return `${pattern}@c.us`;
}

module.exports = {
  userID,
};
