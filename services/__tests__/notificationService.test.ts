import { NotificationService } from '../notificationService';
import notifee from '@notifee/react-native';

// Mock the notifee module
jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn(),
  createTriggerNotification: jest.fn(),
  requestPermission: jest.fn(),
  cancelAllNotifications: jest.fn(),
  getTriggerNotifications: jest.fn(),
  AndroidImportance: {
    HIGH: 4,
  },
  AndroidStyle: {
    BIGTEXT: 1,
  },
  TimestampTrigger: jest.fn(),
  TriggerType: {
    TIMESTAMP: 1,
  },
  RepeatFrequency: {
    WEEKLY: 1,
  },
}));

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    notificationService = new NotificationService();
  });

  describe('scheduleDailyReminder', () => {
    it('should schedule a daily notification at the specified time', async () => {
      const testTime = new Date('2023-01-01T09:00:00');
      
      await notificationService.scheduleDailyReminder(testTime);

      // Verify createChannel was called with correct parameters
      expect(notifee.createChannel).toHaveBeenCalledWith(expect.objectContaining({
        id: 'daily-reminder',
        name: expect.any(String),
        importance: 4, // HIGH
      }));

      // Verify createTriggerNotification was called
      expect(notifee.createTriggerNotification).toHaveBeenCalled();
      
      // Get the arguments passed to createTriggerNotification
      const notificationCall = (notifee.createTriggerNotification as jest.Mock).mock.calls[0][0];
      
      // Verify notification content
      expect(notificationCall).toMatchObject({
        title: expect.any(String),
        body: expect.any(String),
        android: {
          channelId: 'daily-reminder',
          pressAction: {
            id: 'open-app',
          },
        },
      });
    });
  });

  describe('scheduleWeeklySummary', () => {
    it('should schedule a weekly notification', async () => {
      await notificationService.scheduleWeeklySummary(5, 18); // Friday at 6 PM

      // Verify createChannel was called with correct parameters
      expect(notifee.createChannel).toHaveBeenCalledWith(expect.objectContaining({
        id: 'weekly-summary',
        name: expect.any(String),
        importance: 4, // HIGH
      }));

      // Verify createTriggerNotification was called
      expect(notifee.createTriggerNotification).toHaveBeenCalled();
      
      // Verify TimestampTrigger was created with correct parameters
      expect(notifee.createTriggerNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.any(String),
          body: expect.any(String),
        }),
        expect.any(Object) // Trigger object
      );
    });
  });

  describe('requestNotificationPermission', () => {
    it('should request notification permission', async () => {
      (notifee.requestPermission as jest.Mock).mockResolvedValue({ authorizationStatus: 1 });
      
      const result = await notificationService.requestNotificationPermission();
      
      expect(notifee.requestPermission).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ authorizationStatus: 1 }));
    });

    it('should handle permission denied', async () => {
      (notifee.requestPermission as jest.Mock).mockResolvedValue({ authorizationStatus: 0 });
      
      const result = await notificationService.requestNotificationPermission();
      
      expect(notifee.requestPermission).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ authorizationStatus: 0 }));
    });
  });

  describe('cancelAllNotifications', () => {
    it('should cancel all notifications', async () => {
      await notificationService.cancelAllNotifications();
      
      expect(notifee.cancelAllNotifications).toHaveBeenCalled();
    });
  });
});
