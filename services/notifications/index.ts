import notifee, { 
  AndroidImportance, 
  AndroidStyle, 
  TimestampTrigger, 
  TriggerType, 
  RepeatFrequency 
} from '@notifee/react-native';
import { getRandomMessage } from './messages';

export class NotificationService {
  async scheduleDailyReminder(time: Date) {
    await notifee.createChannel({
      id: 'daily-reminder',
      name: 'Expense Buddy Reminders',
      importance: AndroidImportance.HIGH,
      vibration: true,
      lights: true,
    });

    const message = getRandomMessage();

    await notifee.createTriggerNotification(
      {
        title: message.title,
        body: message.body,
        android: {
          channelId: 'daily-reminder',
          pressAction: {
            id: 'open-app',
            launchActivity: 'default',
          },
          style: {
            type: AndroidStyle.BIGTEXT,
            text: message.body,
          },
        },
        ios: {
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: time.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
      }
    );
  }

  async scheduleWeeklySummary(day: number, hour: number) {
    const now = new Date();
    const target = new Date();
    target.setDate(now.getDate() + ((7 - now.getDay() + day) % 7));
    target.setHours(hour, 0, 0, 0);

    await notifee.createTriggerNotification(
      {
        title: '📊 Weekly Expense Report',
        body: 'Your weekly spending summary is ready! Tap to see your financial insights.',
        android: {
          channelId: 'weekly-summary',
          pressAction: {
            id: 'open-analytics',
            launchActivity: 'analytics',
          },
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: target.getTime(),
        repeatFrequency: RepeatFrequency.WEEKLY,
      }
    );
  }

  async requestNotificationPermission() {
    await notifee.requestPermission();
  }

  async cancelAllNotifications() {
    await notifee.cancelAllNotifications();
  }
}
