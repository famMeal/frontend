import { TORONTO_TIMEZONE } from "constants/timezones";
import { DateTime } from "luxon";

export const formatTimeToUTC = (time: string, timezone?: string) => {
  const torontoDateTime = DateTime.now()
    .setZone(timezone ?? TORONTO_TIMEZONE)
    .startOf("day")
    .plus({
      hours: DateTime.fromFormat(time, "h:mm a").hour,
      minutes: DateTime.fromFormat(time, "h:mm a").minute,
    });

  const utcDateTime = torontoDateTime.toUTC();

  return utcDateTime.toISO();
};
