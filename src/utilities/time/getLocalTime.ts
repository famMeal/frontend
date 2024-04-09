import { TORONTO_TIMEZONE } from "constants/timezones";
import { DateTime } from "luxon";

export const getLocalTime = (timezone?: string) =>
  DateTime.now()
    .setZone(timezone ?? TORONTO_TIMEZONE)
    .toJSDate();
