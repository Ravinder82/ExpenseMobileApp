// Premium Animation System
export const Animations = {
  // Duration presets (ms)
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
  },
  
  // Easing functions
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Transform presets
  transforms: {
    hover: {
      scale: 1.05,
      translateY: -2,
      shadowOpacity: 0.3,
    },
    active: {
      scale: 0.98,
    },
    press: {
      scale: 0.95,
    },
    fadeIn: {
      opacity: 1,
      translateY: 0,
    },
    slideUp: {
      opacity: 1,
      translateY: 0,
    },
  },
  
  // Animation sequences
  sequences: {
    cardEntry: {
      opacity: [0, 1],
      transform: [{ translateY: 20 }, { translateY: 0 }],
    },
    cardHover: {
      transform: [{ scale: 1 }, { scale: 1.05 }],
      shadowColor: '#FF6B35',
    },
    buttonPress: {
      transform: [{ scale: 1 }, { scale: 0.95 }, { scale: 1 }],
    },
  },
  
  // Spring animations
  spring: {
    tension: 300,
    friction: 10,
  },
  
  // Fade animations
  fade: {
    in: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 300,
    },
    out: {
      from: { opacity: 1 },
      to: { opacity: 0 },
      duration: 200,
    },
  },
  
  // Slide animations
  slide: {
    up: {
      from: { opacity: 0, translateY: 20 },
      to: { opacity: 1, translateY: 0 },
    },
    down: {
      from: { opacity: 0, translateY: -20 },
      to: { opacity: 1, translateY: 0 },
    },
    left: {
      from: { opacity: 0, translateX: -20 },
      to: { opacity: 1, translateX: 0 },
    },
    right: {
      from: { opacity: 0, translateX: 20 },
      to: { opacity: 1, translateX: 0 },
    },
  },
  
  // Scale animations
  scale: {
    in: {
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 },
    },
    out: {
      from: { opacity: 1, scale: 1 },
      to: { opacity: 0, scale: 0.8 },
    },
  },
  
  // Rotation animations
  rotate: {
    subtle: {
      from: { rotate: '0deg' },
      to: { rotate: '5deg' },
    },
    spin: {
      from: { rotate: '0deg' },
      to: { rotate: '360deg' },
    },
  },
};
