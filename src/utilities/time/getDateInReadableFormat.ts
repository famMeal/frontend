import { TORONTO_TIMEZONE } from "constants/timezones";
import { DateTime } from "luxon";

export const getDateInReadableFormat = (
  date: string,
  timezone?: string
): string => {
  const torontoInputDate = DateTime.fromFormat(date, "yyyy-MM-dd HH:mm:ss z", {
    zone: "utc",
  }).setZone(timezone ?? TORONTO_TIMEZONE);
  const localNow = DateTime.now().setZone(timezone ?? TORONTO_TIMEZONE);

  if (localNow.hasSame(torontoInputDate, "day")) {
    return "Today";
  } else if (localNow.plus({ days: 1 }).hasSame(torontoInputDate, "day")) {
    return "Tomorrow";
  } else {
    return torontoInputDate.toFormat("cccc, MMMM d");
  }
};
