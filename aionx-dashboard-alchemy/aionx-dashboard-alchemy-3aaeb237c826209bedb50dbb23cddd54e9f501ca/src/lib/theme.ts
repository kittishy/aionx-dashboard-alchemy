
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme colors to match Discord-like dark theme with modern touches
export const themeColors = {
  discord: {
    dark: {
      primary: "#5865F2", // Discord blurple
      background: "#36393F", // Discord dark background
      sidebar: "#2F3136", // Discord sidebar
      text: "#FFFFFF", // White text
      secondaryText: "#B9BBBE", // Discord secondary text
      hover: "#4752C4", // Discord button hover
    },
    light: {
      primary: "#5865F2", // Discord blurple
      background: "#FFFFFF", // Light mode background
      sidebar: "#F2F3F5", // Light sidebar
      text: "#2E3338", // Dark text for light mode
      secondaryText: "#6A7480", // Light mode secondary text
      hover: "#4752C4", // Discord button hover
    },
  },
};
