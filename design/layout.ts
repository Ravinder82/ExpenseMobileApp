// Premium Layout System - Bento Grid
export const Layout = {
  // Grid System
  columns: 12,
  gap: 16,
  padding: 24,

  // Spacing Scale
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // Responsive Breakpoints
  breakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },

  // Border Radius
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  // Shadows & Depth
  shadows: {
    sm: {
      shadowColor: '#FF6B35',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    md: {
      shadowColor: '#FF6B35',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    lg: {
      shadowColor: '#FF6B35',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 10,
    },
    xl: {
      shadowColor: '#FF6B35',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.25,
      shadowRadius: 32,
      elevation: 15,
    },
  },

  // Grid Layout Presets
  grid: {
    container: {
      flex: 1,
      backgroundColor: '#1A1A1A',
    },
    bentoGrid: {
      padding: 24,
      gap: 16,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    vStack: {
      flexDirection: 'column',
      gap: 16,
    },
    hStack: {
      flexDirection: 'row',
      gap: 16,
    },
  },

  // Card Styles & Sizes
  card: {
    sizes: {
      small: { width: 140, height: 140 },
      medium: { width: 220, height: 220 },
      large: { width: 300, height: 300 },
      wide: { width: 340, height: 180 },
      tall: { width: 180, height: 340 },
      auto: { width: 'auto', height: 'auto' },
    },
    styles: {
      base: {
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
      gradient: {
        borderRadius: 16,
        overflow: 'hidden',
      },
    },
  },
};
