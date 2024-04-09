import { TORONTO_TIMEZONE } from "constants/timezones";
import { DateTime } from "luxon";

export const formatTimeStampToUTCString = (date: Date, timezone?: string) =>
  DateTime.fromJSDate(date)
    .setZone(timezone ?? TORONTO_TIMEZONE)
    .toUTC()
    .toString();
