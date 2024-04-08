const primary = "#CA752B";
const accent = "#1E463F";
const light = "#F9F9F9";
const white = "#FFF";
const error = "#cc0000";

export const COLOURS = {
  primary,
  accent,
  light,
  white,
  error,
} as const;

export type ColourTheme = keyof typeof COLOURS;
