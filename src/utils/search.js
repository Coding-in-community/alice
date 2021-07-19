const googleIt = require('google-it');

async function google(query, target = '', limit = null) {
  const result = await googleIt({
    query,
    includeSites: target,
  });

  if (limit) {
    return result.slice(0, limit);
  }

  return result;
}

module.exports = {
  google,
};
