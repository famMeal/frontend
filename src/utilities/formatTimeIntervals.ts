const formatTimeIntervals = (intervals: string[][]): string[] => {
  return intervals.map(([startTime, endTime]) => {
    return `${startTime} & ${endTime}`;
  });
};

export { formatTimeIntervals };
