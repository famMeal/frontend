export const formatDate = (input: string): string => {
  const [datePart, timePart] = input.split(" ");
  const utcDate = new Date(datePart + "T" + timePart + "Z");

  const formatTime = (d: Date) =>
    `${d.getHours() % 12 || 12}:${d.getMinutes().toString().padStart(2, "0")} ${
      d.getHours() >= 12 ? "PM" : "AM"
    }`;

  return formatTime(utcDate);
};

export const formatTimeRange = (
  pickupStartTime: string,
  pickupEndTime: string
): string => {
  const parseTime = (timeString: string) => {
    const [_, time] = timeString.split(" ");
    return time;
  };

  const startTime = parseTime(pickupStartTime);
  const endTime = parseTime(pickupEndTime);

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hoursInt = parseInt(hours, 10);
    return `${hoursInt % 12 || 12}:${minutes.padStart(2, "0")} ${
      hoursInt >= 12 ? "PM" : "AM"
    }`;
  };

  return `between ${formatTime(startTime)} and ${formatTime(endTime)}`;
};
