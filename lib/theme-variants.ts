// src/themes/theme-variants.ts
import { ThemeColors } from './theme-types';

// Dune theme - inspired by the desert planet Arrakis
export const duneTheme: ThemeColors = {
  name: "Dune",
  id: "dune",
  background: {
    primary: "#2d2114", // Dark sand
    secondary: "#3d2e1b", // Darker sand
    card: "rgba(61, 46, 27, 0.7)", // Semi-transparent sand
    header: "rgba(45, 33, 20, 0.8)", // Semi-transparent dark sand
    footer: "rgba(45, 33, 20, 0.8)", // Semi-transparent dark sand
  },
  text: {
    primary: "#e6d2b5", // Light sand
    secondary: "#c4a775", // Medium sand
    accent: "#e8b923", // Spice color (golden)
    muted: "#a89070", // Muted sand
  },
  border: {
    primary: "rgba(196, 167, 117, 0.3)", // Transparent medium sand
    secondary: "rgba(232, 185, 35, 0.3)", // Transparent spice color
    focus: "#e8b923", // Spice color (golden)
  },
  visualization: {
    primary: "#e8b923", // Spice color (golden)
    secondary: "#c4a775", // Medium sand
    tertiary: "#a35231", // Rust/red sand
    accent: "#e6d2b5", // Light sand
    grid: "rgba(196, 167, 117, 0.2)", // Very transparent medium sand
    point: "#e8b923", // Spice color (golden)
    line: "#c4a775", // Medium sand
    area: "rgba(163, 82, 49, 0.5)", // Semi-transparent rust/red
  },
  button: {
    primary: {
      background: "#a35231", // Rust/red sand
      hover: "#b86a45", // Lighter rust/red
      text: "#e6d2b5", // Light sand
    },
    secondary: {
      background: "#3d2e1b", // Darker sand
      hover: "#4e3b24", // Slightly lighter dark sand
      text: "#e6d2b5", // Light sand
    },
    outline: {
      border: "#c4a775", // Medium sand
      hover: "rgba(196, 167, 117, 0.2)", // Very transparent medium sand
      text: "#c4a775", // Medium sand
    },
  },
};

// Tron theme - inspired by the digital world of Tron
export const tronTheme: ThemeColors = {
  name: "Tron",
  id: "tron",
  background: {
    primary: "#0c141f", // Dark blue-black
    secondary: "#0f1c2d", // Slightly lighter dark blue
    card: "rgba(15, 28, 45, 0.7)", // Semi-transparent dark blue
    header: "rgba(12, 20, 31, 0.8)", // Semi-transparent darker blue
    footer: "rgba(12, 20, 31, 0.8)", // Semi-transparent darker blue
  },
  text: {
    primary: "#7fdbff", // Bright cyan
    secondary: "#0abdc6", // Medium cyan
    accent: "#ff00a0", // Magenta accent
    muted: "#4b6a8a", // Muted blue
  },
  border: {
    primary: "rgba(10, 189, 198, 0.3)", // Transparent medium cyan
    secondary: "rgba(127, 219, 255, 0.3)", // Transparent bright cyan
    focus: "#7fdbff", // Bright cyan
  },
  visualization: {
    primary: "#7fdbff", // Bright cyan
    secondary: "#0abdc6", // Medium cyan
    tertiary: "#ff00a0", // Magenta accent
    accent: "#ffffff", // White
    grid: "rgba(10, 189, 198, 0.2)", // Very transparent medium cyan
    point: "#ff00a0", // Magenta accent
    line: "#7fdbff", // Bright cyan
    area: "rgba(10, 189, 198, 0.5)", // Semi-transparent medium cyan
  },
  button: {
    primary: {
      background: "#0abdc6", // Medium cyan
      hover: "#7fdbff", // Bright cyan
      text: "#0c141f", // Dark blue-black
    },
    secondary: {
      background: "#0f1c2d", // Slightly lighter dark blue
      hover: "#1a3050", // Even lighter dark blue
      text: "#7fdbff", // Bright cyan
    },
    outline: {
      border: "#0abdc6", // Medium cyan
      hover: "rgba(10, 189, 198, 0.2)", // Very transparent medium cyan
      text: "#0abdc6", // Medium cyan
    },
  },
};

// Matrix theme - inspired by the digital rain of The Matrix
export const matrixTheme: ThemeColors = {
  name: "Matrix",
  id: "matrix",
  background: {
    primary: "#0d0d0d", // Near black
    secondary: "#121212", // Slightly lighter black
    card: "rgba(18, 18, 18, 0.7)", // Semi-transparent black
    header: "rgba(13, 13, 13, 0.8)", // Semi-transparent near black
    footer: "rgba(13, 13, 13, 0.8)", // Semi-transparent near black
  },
  text: {
    primary: "#00ff41", // Matrix green
    secondary: "#03a062", // Darker green
    accent: "#5cdb95", // Light green accent
    muted: "#2a623d", // Very dark green
  },
  border: {
    primary: "rgba(3, 160, 98, 0.3)", // Transparent darker green
    secondary: "rgba(0, 255, 65, 0.3)", // Transparent matrix green
    focus: "#00ff41", // Matrix green
  },
  visualization: {
    primary: "#00ff41", // Matrix green
    secondary: "#03a062", // Darker green
    tertiary: "#5cdb95", // Light green accent
    accent: "#ffffff", // White
    grid: "rgba(3, 160, 98, 0.2)", // Very transparent darker green
    point: "#5cdb95", // Light green accent
    line: "#00ff41", // Matrix green
    area: "rgba(3, 160, 98, 0.5)", // Semi-transparent darker green
  },
  button: {
    primary: {
      background: "#03a062", // Darker green
      hover: "#00ff41", // Matrix green
      text: "#0d0d0d", // Near black
    },
    secondary: {
      background: "#121212", // Slightly lighter black
      hover: "#1a1a1a", // Even lighter black
      text: "#00ff41", // Matrix green
    },
    outline: {
      border: "#03a062", // Darker green
      hover: "rgba(3, 160, 98, 0.2)", // Very transparent darker green
      text: "#03a062", // Darker green
    },
  },
};

// Scientific theme - clean, professional style for publications
export const scientificTheme: ThemeColors = {
  name: "Scientific",
  id: "scientific",
  background: {
    primary: "#ffffff", // White
    secondary: "#f5f5f5", // Very light gray
    card: "rgba(245, 245, 245, 0.7)", // Semi-transparent light gray
    header: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
    footer: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
  },
  text: {
    primary: "#333333", // Dark gray
    secondary: "#666666", // Medium gray
    accent: "#0066cc", // Blue accent
    muted: "#999999", // Light gray
  },
  border: {
    primary: "rgba(204, 204, 204, 1)", // Light gray
    secondary: "rgba(0, 102, 204, 0.3)", // Transparent blue
    focus: "#0066cc", // Blue accent
  },
  visualization: {
    primary: "#0066cc", // Blue accent
    secondary: "#cc0000", // Red
    tertiary: "#009933", // Green
    accent: "#ff9900", // Orange
    grid: "rgba(204, 204, 204, 0.5)", // Semi-transparent light gray
    point: "#0066cc", // Blue accent
    line: "#333333", // Dark gray
    area: "rgba(0, 102, 204, 0.2)", // Very transparent blue
  },
  button: {
    primary: {
      background: "#0066cc", // Blue accent
      hover: "#0052a3", // Darker blue
      text: "#ffffff", // White
    },
    secondary: {
      background: "#f5f5f5", // Very light gray
      hover: "#e6e6e6", // Slightly darker light gray
      text: "#333333", // Dark gray
    },
    outline: {
      border: "#0066cc", // Blue accent
      hover: "rgba(0, 102, 204, 0.1)", // Very transparent blue
      text: "#0066cc", // Blue accent
    },
  },
};

// Ice Fire theme - contrasting cool blues and warm reds
export const iceFireTheme: ThemeColors = {
  name: "Ice Fire",
  id: "icefire",
  background: {
    primary: "#1a1a2e", // Dark blue-purple
    secondary: "#16213e", // Slightly lighter blue-purple
    card: "rgba(22, 33, 62, 0.7)", // Semi-transparent blue-purple
    header: "rgba(26, 26, 46, 0.8)", // Semi-transparent dark blue-purple
    footer: "rgba(26, 26, 46, 0.8)", // Semi-transparent dark blue-purple
  },
  text: {
    primary: "#e6f1ff", // Ice blue
    secondary: "#a2d2ff", // Light blue
    accent: "#ff6b6b", // Warm red
    muted: "#4a5568", // Muted blue-gray
  },
  border: {
    primary: "rgba(162, 210, 255, 0.3)", // Transparent light blue
    secondary: "rgba(255, 107, 107, 0.3)", // Transparent warm red
    focus: "#a2d2ff", // Light blue
  },
  visualization: {
    primary: "#a2d2ff", // Light blue
    secondary: "#ff6b6b", // Warm red
    tertiary: "#ffd166", // Gold/yellow
    accent: "#e6f1ff", // Ice blue
    grid: "rgba(162, 210, 255, 0.2)", // Very transparent light blue
    point: "#ff6b6b", // Warm red
    line: "#a2d2ff", // Light blue
    area: "rgba(255, 107, 107, 0.3)", // Transparent warm red
  },
  button: {
    primary: {
      background: "#ff6b6b", // Warm red
      hover: "#ff8a8a", // Lighter warm red
      text: "#e6f1ff", // Ice blue
    },
    secondary: {
      background: "#16213e", // Slightly lighter blue-purple
      hover: "#1f2b4d", // Even lighter blue-purple
      text: "#e6f1ff", // Ice blue
    },
    outline: {
      border: "#a2d2ff", // Light blue
      hover: "rgba(162, 210, 255, 0.2)", // Very transparent light blue
      text: "#a2d2ff", // Light blue
    },
  },
};

// Export all themes in an array
export const allThemes: ThemeColors[] = [
  duneTheme,
  tronTheme,
  matrixTheme,
  scientificTheme,
  iceFireTheme
];
