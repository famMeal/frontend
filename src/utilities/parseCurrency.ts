export const parseCurrency = (input: string) =>
  parseFloat(input?.replace(/[^0-9.-]+/g, ""));
