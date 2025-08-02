import * as Notifications from 'expo-notifications';

// Type for notification handler response
type NotificationHandlerResponse = {
  shouldShowAlert: boolean;
  shouldPlaySound: boolean;
  shouldSetBadge: boolean;
  shouldShowBanner: boolean;
  shouldShowList: boolean;
};

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<NotificationHandlerResponse> => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true
  }),
});

type NotificationMessage = {
  title: string;
  body: string;
};

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

const getRandomMessage = (): NotificationMessage => {
  const randomIndex = Math.floor(Math.random() * MESSAGES.length);
  return MESSAGES[randomIndex];
};

export class NotificationService {
  async scheduleDailyReminder(time: Date) {
    const message = getRandomMessage();
    
    // Request permissions (required for iOS)
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    // Cancel any existing daily reminders
    await Notifications.cancelScheduledNotificationAsync('daily-reminder');

    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      identifier: 'daily-reminder',
      content: {
        title: message.title,
        body: message.body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        type: 'calendar',
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      } as Notifications.NotificationTriggerInput,
    });
  }

  async scheduleWeeklySummary(day: number, hour: number) {
    // Request permissions (required for iOS)
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    // Cancel any existing weekly summaries
    await Notifications.cancelScheduledNotificationAsync('weekly-summary');

    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      identifier: 'weekly-summary',
      content: {
        title: '📊 Weekly Expense Summary',
        body: 'Your weekly spending summary is ready! Tap to view your insights.',
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        type: 'calendar',
        weekday: day,
        hour: hour,
        minute: 0,
        repeats: true,
      } as Notifications.NotificationTriggerInput,
    });
  }

  async requestNotificationPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
}
