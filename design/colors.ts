const palette = {
  primaryAccent: '#FF6B00',
  success: '#4CAF50',
  danger: '#FF3B30',
  white: '#FFFFFF',
  // Lighter orange for gradients
  orangeLight: '#FF8A65',
  // Other status colors
  warning: '#FFC107',
  info: '#2196F3',
};

export const themes = {
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    textPrimary: '#EAEAEA',
    textSecondary: '#A0A0A0',
    textMuted: '#6E6E73',
    accent: palette.primaryAccent,
    accentText: palette.white,
    border: '#2D2D2D',
    shadow: 'rgba(255, 107, 0, 0.25)',
    success: palette.success,
    danger: palette.danger,
    glass: 'rgba(30, 30, 30, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    gradient: [palette.primaryAccent, palette.orangeLight],
    status: {
      success: palette.success,
      warning: palette.warning,
      error: palette.danger,
      info: palette.info,
    },
  },
  // Light theme can be updated later if needed
  light: {
    background: '#F5F5F7',
    card: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#6E6E73',
    textMuted: '#B8B8B8',
    accent: palette.primaryAccent,
    accentText: palette.white,
    border: '#E8E8E8',
    shadow: 'rgba(0, 0, 0, 0.1)',
    success: palette.success,
    danger: palette.danger,
    glass: 'rgba(255, 255, 255, 0.7)',
    glassBorder: 'rgba(220, 220, 220, 0.9)',
    gradient: [palette.primaryAccent, palette.orangeLight],
    status: {
      success: palette.success,
      warning: palette.warning,
      error: palette.danger,
      info: palette.info,
    },
  },
};

// Set the active theme to dark as per the spec
const activeTheme = 'dark';

export const Colors = themes[activeTheme];
