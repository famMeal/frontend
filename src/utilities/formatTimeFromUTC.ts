const formatTimeFromUTC = (date: Date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

export { formatTimeFromUTC };
