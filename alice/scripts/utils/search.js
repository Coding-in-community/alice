const googleIt = require('google-it');

async function google(query, target = '', limit = null) {
  try {
    let result = await googleIt({
      query: query,
      includeSites: target,
    });

    if (limit) {
      return result.slice(0, limit);
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  google,
};
