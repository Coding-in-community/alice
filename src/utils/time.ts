/**
 * Suspends (waits) execution of the current thread for a given number of seconds.
 */
function sleep(secs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, secs * 1000));
}

/**
 * Converts a given set of seconds, minutes, hours and days to milliseconds.
 */
function timer(
  secs: number = 0,
  mins: number = 0,
  hours: number = 0,
  days: number = 0
): number {
  const secsInMS = secs * 1000;
  const minsInMS = mins * 60 * 1000;
  const hoursInMS = hours * 60 * 60 * 1000;
  const daysInMS = days * 24 * 60 * 60 * 1000;
  const totalTimeInMS = secsInMS + minsInMS + hoursInMS + daysInMS;

  return totalTimeInMS;
}

export default { sleep, timer };
