// @ts-ignore
import googleIt from 'google-it';

/**
 * Searchs for a given string in google.
 */
async function search(query: string, target: string = '', limit: number = 1) {
  const result = await googleIt({
    query,
    includeSites: target,
    disableConsole: true,
    limit,
  });

  return result;
}

export default search;
