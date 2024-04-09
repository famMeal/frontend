import { TORONTO_TIMEZONE } from "constants/timezones";
import { DateTime } from "luxon";

export const formatTimeForDisplay = (date: Date, timezone?: string) => {
  return DateTime.fromJSDate(date)
    .setZone(timezone ?? TORONTO_TIMEZONE)
    .toLocaleString(DateTime.TIME_SIMPLE);
};
