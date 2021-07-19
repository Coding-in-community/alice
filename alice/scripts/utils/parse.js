function userID(targetNumber) {
  if (typeof targetNumber !== 'string') {
    throw new Error('you must pass the number as a string');
  }

  const target = targetNumber.replace(/\D/g, '');
  const regexp = /\d+/;
  const matches = target.match(regexp);
  const pattern = matches[0];
  return `${pattern}@c.us`;
}

module.exports = {
  userID,
};
