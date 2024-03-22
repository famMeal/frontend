const parseUTCDateString = (dateStr: string): Date => {
  const parts = dateStr.match(
    /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}) UTC/,
  );
  if (!parts) {
    throw new Error("Invalid date format");
  }
  return new Date(
    Date.UTC(
      parseInt(parts[1], 10),
      parseInt(parts[2], 10) - 1, // Month is 0-indexed
      parseInt(parts[3], 10),
      parseInt(parts[4], 10),
      parseInt(parts[5], 10),
      parseInt(parts[6], 10),
    ),
  );
};

export const returnDateInWeekday = (inputDateString: string): string => {
  const inputDate = parseUTCDateString(inputDateString);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  inputDate.setUTCHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  if (inputDate.getTime() === today.getTime()) {
    return "today";
  } else if (inputDate.getTime() === tomorrow.getTime()) {
    return "tomorrow";
  } else {
    return inputDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  }
};
