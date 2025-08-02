export interface NotificationMessage {
  title: string;
  body: string;
}

const MESSAGES: NotificationMessage[] = [
  {
    title: '💰 Expense Check-in!',
    body: 'Hey there! Ready to track today\'s spending? Your future self will thank you!',
  },
  {
    title: '📱 Quick Update?',
    body: 'Just a nudge to log today\'s expenses. It only takes a minute!',
  },
  {
    title: '✨ Budget Buddy Here!',
    body: 'How\'s your spending looking today? Let\'s keep those financial goals on track!',
  },
  {
    title: '💡 Smart Spending Tip',
    body: 'Remember to log small expenses too - they add up faster than you think!',
  },
  {
    title: '🎯 Financial Goals',
    body: 'Every expense tracked is a step closer to your financial freedom!',
  },
];

export const getRandomMessage = (): NotificationMessage => {
  const randomIndex = Math.floor(Math.random() * MESSAGES.length);
  return MESSAGES[randomIndex];
};
