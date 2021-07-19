function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function timer(sec = 0, min = 0, hour = 0, day = 0) {
  const secsInMS = sec * 1000;
  const minsInMS = min * 60 * 1000;
  const hoursInMS = hour * 60 * 60 * 1000;
  const daysInMS = day * 24 * 60 * 60 * 1000;
  const timeInMS = secsInMS + minsInMS + hoursInMS + daysInMS;
  return timeInMS;
}

module.exports = {
  timer,
  sleep,
};
