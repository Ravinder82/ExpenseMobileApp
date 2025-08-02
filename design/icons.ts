// Premium Icon System - Unique & Cool Icons
export const Icons = {
  // Category Icons (Premium)
  food: '🍕',
  transport: '🚗',
  shopping: '🛍️',
  entertainment: '🎬',
  bills: '💡',
  other: '📦',
  
  // Action Icons
  add: '➕',
  delete: '🗑️',
  edit: '✏️',
  save: '💾',
  cancel: '❌',
  confirm: '✅',
  
  // AI & Tech Icons
  ai: '🤖',
  robot: '🦾',
  brain: '🧠',
  sparkles: '✨',
  magic: '🪄',
  
  // Money & Finance Icons
  money: '💰',
  coin: '🪙',
  bank: '🏦',
  card: '💳',
  chart: '📊',
  
  // UI Icons
  home: '🏠',
  settings: '⚙️',
  search: '🔍',
  filter: '🔽',
  sort: '📋',
  
  // Status Icons
  success: '🎉',
  warning: '⚠️',
  error: '🚨',
  info: 'ℹ️',
  loading: '⏳',
  
  // Navigation Icons
  arrowUp: '⬆️',
  arrowDown: '⬇️',
  arrowLeft: '⬅️',
  arrowRight: '➡️',
  chevronUp: '🔼',
  chevronDown: '🔽',
  
  // Time Icons
  clock: '🕐',
  calendar: '📅',
  timer: '⏱️',
  
  // Social Icons
  share: '📤',
  link: '🔗',
  bookmark: '🔖',
  heart: '❤️',
  star: '⭐',
  
  // Special Effects Icons
  fire: '🔥',
  lightning: '⚡',
  diamond: '💎',
  crown: '👑',
  trophy: '🏆',
  
  // Weather & Nature Icons
  sun: '☀️',
  moon: '🌙',
  cloud: '☁️',
  star_weather: '⭐',
  rainbow: '🌈',
  
  // Decorative Icons
  sparkle: '✨',
  heart_decorative: '💖',
  flower: '🌸',
  leaf: '🍃',
  crystal: '🔮',
};

// Icon Categories for Easy Access
export const IconCategories = {
  actions: [Icons.add, Icons.delete, Icons.edit, Icons.save, Icons.cancel],
  ai: [Icons.ai, Icons.robot, Icons.brain, Icons.sparkles, Icons.magic],
  finance: [Icons.money, Icons.coin, Icons.bank, Icons.card, Icons.chart],
  navigation: [Icons.arrowUp, Icons.arrowDown, Icons.arrowLeft, Icons.arrowRight],
  status: [Icons.success, Icons.warning, Icons.error, Icons.info, Icons.loading],
  decorative: [Icons.sparkle, Icons.heart, Icons.diamond, Icons.crown, Icons.trophy],
};

// Icon Utility Functions
export const getRandomIcon = (category?: string) => {
  if (category && IconCategories[category as keyof typeof IconCategories]) {
    const icons = IconCategories[category as keyof typeof IconCategories];
    return icons[Math.floor(Math.random() * icons.length)];
  }
  
  const allIcons = Object.values(Icons);
  return allIcons[Math.floor(Math.random() * allIcons.length)];
};

export const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, string> = {
    food: '🍕',
    transport: '🚗',
    shopping: '🛍️',
    entertainment: '🎬',
    bills: '💡',
    other: '📦',
  };
  
  return iconMap[category.toLowerCase()] || Icons.other;
};

export const getAnimatedIcon = (icon: string) => {
  return `✨${icon}✨`;
};
