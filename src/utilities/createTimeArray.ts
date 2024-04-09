import { DateTime } from "luxon";

export const createTimeArray = (
  startTimeStr: string,
  endTimeStr: string,
  intervalMinutes = 15
): string[][] => {
  const TORONTO_TIMEZONE = "America/Toronto";
  let intervals: string[][] = [];

  // Parse input strings and set to Toronto timezone
  let startTime = DateTime.fromFormat(startTimeStr, "yyyy-MM-dd HH:mm:ss z", {
    zone: "utc",
  }).setZone(TORONTO_TIMEZONE);
  let endTime = DateTime.fromFormat(endTimeStr, "yyyy-MM-dd HH:mm:ss z", {
    zone: "utc",
  }).setZone(TORONTO_TIMEZONE);

  while (startTime < endTime) {
    const startInterval = startTime.toFormat("h:mm a");
    startTime = startTime.plus({ minutes: intervalMinutes });
    const endInterval =
      startTime <= endTime
        ? startTime.toFormat("h:mm a")
        : endTime.toFormat("h:mm a");

    intervals.push([startInterval, endInterval]);
  }

  return intervals;
};
