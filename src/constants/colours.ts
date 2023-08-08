const primary = "#CA752B";
const accent = "#1E463F";
const light = "#F9F9F9";
const white = "#FFF";

export const COLOURS = {
  primary,
  accent,
  light,
  white,
} as const;

export type ColourTheme = keyof typeof COLOURS;
