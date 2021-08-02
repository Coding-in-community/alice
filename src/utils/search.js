const googleIt = require('google-it');

/**
 * Searchs for a given string in google.
 * @param {string} query Text that must be searched.
 * @param {string} [target=''] Target site to search in.
 * @param {number} [limit=0] Max number of results that must be returned.
 * @returns {object[]} Array of results found.
 */
async function google(query, target = '', limit = 0) {
  const result = await googleIt({
    query,
    includeSites: target,
    disableConsole: true,
  });

  if (limit) {
    return result.slice(0, limit);
  }

  return result;
}

module.exports = {
  google,
};
