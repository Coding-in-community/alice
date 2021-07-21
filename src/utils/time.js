/**
 * Suspends (waits) execution of the current thread for a given number of seconds.
 * @param {number} seconds
 * @returns {Promise}
 */
function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/**
 * Converts a given set of seconds, minutes, hours and days in miliseconds.
 * @param {number} [secs=0]
 * @param {number} [mins=0]
 * @param {number} [hours=0]
 * @param {number} [days=0]
 * @returns {number} Total time in miliseconds.
 */
function timer(secs = 0, mins = 0, hours = 0, days = 0) {
  const secsInMS = secs * 1000;
  const minsInMS = mins * 60 * 1000;
  const hoursInMS = hours * 60 * 60 * 1000;
  const daysInMS = days * 24 * 60 * 60 * 1000;
  const timeInMS = secsInMS + minsInMS + hoursInMS + daysInMS;
  return timeInMS;
}

module.exports = {
  timer,
  sleep,
};
