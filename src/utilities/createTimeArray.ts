const createTimeArray = (
  startTime?: string | null,
  endTime?: string | null
): string[][] => {
  const intervals: string[][] = [];

  const startTimeWithoutUTC = startTime?.replace(" UTC", "");
  const endTimeWithoutUTC = endTime?.replace(" UTC", "");

  if (startTimeWithoutUTC && endTimeWithoutUTC) {
    const start = new Date(startTimeWithoutUTC);
    const end = new Date(endTimeWithoutUTC);

    const interval = 15 * 60 * 1000; // 15 minutes in milliseconds

    let current = new Date(start);

    while (current <= end) {
      const startTime = current.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });

      current = new Date(current.getTime() + interval);

      const endTime = current.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });

      intervals.push([startTime, endTime]);
    }
  }

  return intervals;
};

export { createTimeArray };
