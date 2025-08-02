// Typography System based on techUI.md
export const Typography = {
  font: {
    primary: 'Inter', // Main font as per spec (fallback to SF Pro, Roboto handled by system)
  },
  size: {
    xs: 12,    // 12pt
    sm: 14,    // 14pt
    base: 16,  // 16pt
    lg: 18,    // 18pt
    xl: 20,
    '2xl': 24,
    amount: 26, // 26pt for Total Expenses
    title: 28,  // 28pt for Screen Header
  },
  weight: {
    light: '300' as const,
    normal: '400' as const, // weight: 400
    medium: '500' as const, // weight: 500
    semibold: '600' as const, // weight: 600
    bold: '700' as const, // weight: 700
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
  style: {
    // Screen Header Title
    screenTitle: {
      fontFamily: 'Inter',
      fontSize: 28,
      fontWeight: '600' as const,
    },
    // Screen Header Subtitle
    screenSubtitle: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400' as const,
    },
    // Total Expenses Amount
    totalAmount: {
      fontFamily: 'Inter',
      fontSize: 26,
      fontWeight: '700' as const,
    },
    // General purpose heading
    heading: {
      fontFamily: 'Inter',
      fontWeight: '700' as const,
      fontSize: 24,
    },
    // General purpose subheading
    subheading: {
      fontFamily: 'Inter',
      fontWeight: '600' as const,
      fontSize: 20,
    },
    // Default body text
    body: {
      fontFamily: 'Inter',
      fontWeight: '400' as const,
      fontSize: 16,
    },
    // Input text
    input: {
      fontFamily: 'Inter',
      fontWeight: '500' as const,
      fontSize: 16,
    },
    // Small text, captions, labels
    caption: {
      fontFamily: 'Inter',
      fontWeight: '400' as const,
      fontSize: 12,
    },
    // Button text
    button: {
      fontFamily: 'Inter',
      fontWeight: '700' as const,
      fontSize: 16,
    },
  },
};
