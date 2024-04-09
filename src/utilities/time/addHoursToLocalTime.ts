import { TORONTO_TIMEZONE } from "constants/timezones";
import { DateTime } from "luxon";

const addHoursToLocalTime = (hours: number, timezone?: string) => {
  return DateTime.now()
    .setZone(timezone ?? TORONTO_TIMEZONE)
    .plus({ hours })
    .toJSDate();
};

export { addHoursToLocalTime };
