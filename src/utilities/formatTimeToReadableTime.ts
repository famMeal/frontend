export const formatDate = (input: string): string => {
  const [datePart, timePart] = input.split(" ");
  const utcDate = new Date(datePart + "T" + timePart + "Z");

  const formatTime = (d: Date) =>
    `${d.getHours() % 12 || 12}:${d.getMinutes().toString().padStart(2, "0")} ${
      d.getHours() >= 12 ? "PM" : "AM"
    }`;

  return formatTime(utcDate);
};

export const formatReadableDate = (dateString: string): string => {
  // Manually parse the date string
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // Construct a Date object
  const date = new Date(
    Date.UTC(year, month - 1, day, hours, minutes, seconds)
  );

  // Check for Invalid Date
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  // Compare if the date is today
  if (date.toDateString() === now.toDateString()) {
    return `Today, ${formatter.format(date)}`;
  }

  // Format for other dates
  return `${date.toLocaleDateString("en", {
    month: "long",
    day: "numeric",
  })}, ${formatter.format(date)}`;
};

export const formatTimeRange = (
  pickupStartTime: string,
  pickupEndTime: string
): string => {
  const parseTime = (timeString: string) => {
    const [unused, time] = timeString.split(" ");
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
