import { DateTime } from "luxon";

const formatStringToReadableTime = (inputDateString: string): string => {
  const TORONTO_TIMEZONE = "America/Toronto";

  const torontoTime = DateTime.fromFormat(
    inputDateString,
    "yyyy-MM-dd HH:mm:ss z",
    { zone: "utc" }
  ).setZone(TORONTO_TIMEZONE);

  return torontoTime.toFormat("h:mm a");
};

export { formatStringToReadableTime };
