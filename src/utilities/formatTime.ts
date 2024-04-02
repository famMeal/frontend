const formatTime = <T extends string | null | undefined>(
  time: T
): string | null => {
  if (!time) {
    return null;
  }

  const [unusedTime, timePart] = time.split(" ");
  const [hour, minute] = timePart.split(":");

  const date = new Date();

  date.setUTCHours(Number(hour), Number(minute), 0);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

export { formatTime };
