export const formatDate = (input: string): string => {
  const [datePart, timePart] = input.split(" ");
  const utcDate = new Date(datePart + "T" + timePart + "Z");

  const now = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isTomorrow = (d: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    return isSameDay(d, tomorrow);
  };

  const formatTime = (d: Date) =>
    `${d.getHours() % 12 || 12}:${d.getMinutes().toString().padStart(2, "0")} ${
      d.getHours() >= 12 ? "PM" : "AM"
    }`;

  if (isSameDay(utcDate, now)) {
    return `Today ${formatTime(utcDate)}`;
  } else if (isTomorrow(utcDate)) {
    return `Tomorrow ${formatTime(utcDate)}`;
  } else {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${weekdays[utcDate.getDay()]} ${formatTime(utcDate)}`;
  }
};

export const formatTimeRange = (
  pickupStartTime: string,
  pickupEndTime: string,
): string => {
  const parseTime = (timeString: string) => {
    const [date, time] = timeString.split(" ");
    return { date, time };
  };

  const { date: startDate, time: startTime } = parseTime(pickupStartTime);
  const { time: endTime } = parseTime(pickupEndTime);

  const utcDate = new Date(startDate + "T00:00:00Z");
  const now = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isTomorrow = (d: Date) => {
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    return isSameDay(d, tomorrow);
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hoursInt = parseInt(hours, 10);
    return `${hoursInt % 12 || 12}:${minutes.padStart(2, "0")} ${
      hoursInt >= 12 ? "PM" : "AM"
    }`;
  };

  if (isSameDay(utcDate, now)) {
    return `Today between ${formatTime(startTime)} and ${formatTime(endTime)}`;
  } else if (isTomorrow(utcDate)) {
    return `Tomorrow between ${formatTime(startTime)} and ${formatTime(
      endTime,
    )}`;
  } else {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${weekdays[utcDate.getDay()]} between ${formatTime(
      startTime,
    )} and ${formatTime(endTime)}`;
  }
};
