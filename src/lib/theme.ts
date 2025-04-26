
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme colors to match cosmic theme with light/dark variants
export const themeColors = {
  cosmic: {
    dark: {
      primary: "#33C3F0", // Bright blue
      background: "#0A1929", // Dark background
      sidebar: "#091422", // Dark sidebar
      text: "#FFFFFF", // White text
      secondaryText: "#B9BBBE", // Secondary text
      hover: "#1EAEDB", // Button hover
      card: "rgba(26, 31, 44, 0.7)", // Card background
      border: "rgba(155, 135, 245, 0.1)", // Border color
    },
    light: {
      primary: "#0EA5E9", // Bright blue for light mode
      background: "#E6F4FF", // Light blue background
      sidebar: "#F0F8FF", // Light sidebar
      text: "#0A1929", // Dark text for light mode
      secondaryText: "#5A6A80", // Light mode secondary text
      hover: "#0284C7", // Light mode button hover
      card: "rgba(255, 255, 255, 0.7)", // Light card background
      border: "rgba(155, 175, 245, 0.2)", // Light border color
    },
  },
};
