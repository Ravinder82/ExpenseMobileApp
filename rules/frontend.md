# Frontend Architecture - AI Expense Tracker

## 🎯 Tech Stack Overview

### Core Technologies
```
Frontend: React Native 0.72+ (Cross-platform)
State Management: Redux Toolkit + RTK Query
Navigation: React Navigation 6
Styling: Styled Components + NativeWind (Tailwind)
Animations: Reanimated 3 + Moti
Charts: Victory Native + React Native SVG
Camera: React Native Vision Camera
ML/OCR: TensorFlow Lite + ML Kit
Storage: MMKV + WatermelonDB
```

### Development Environment
```
Node: 18.x LTS
Package Manager: Yarn 3.x
IDE: VS Code + React Native Tools
Debugger: Flipper + React DevTools
Testing: Jest + Detox + Storybook
CI/CD: GitHub Actions + EAS Build
```

## 🏗️ Project Architecture

### Folder Structure
```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Icon/
│   │   └── Typography/
│   ├── molecules/
│   │   ├── ExpenseCard/
│   │   ├── BudgetProgress/
│   │   ├── CategoryChip/
│   │   └── VoiceRecorder/
│   ├── organisms/
│   │   ├── DashboardHeader/
│   │   ├── ExpenseList/
│   │   ├── ChatInterface/
│   │   └── ReceiptScanner/
│   └── templates/
│       ├── OnboardingTemplate/
│       ├── DashboardTemplate/
│       └── SettingsTemplate/
├── screens/
│   ├── Auth/
│   ├── Dashboard/
│   ├── Expense/
│   ├── Budget/
│   └── Settings/
├── navigation/
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── linking.ts
├── services/
│   ├── api/
│   ├── storage/
│   ├── ml/
│   └── notifications/
├── store/
│   ├── slices/
│   ├── api/
│   └── middleware/
├── utils/
│   ├── constants/
│   ├── helpers/
│   └── hooks/
└── types/
    ├── models/
    ├── navigation/
    └── api/
```

## 🔄 State Management Architecture

### Redux Toolkit Setup
```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/query/react';
import { expenseApi } from './api/expenseApi';
import expenseSlice from './slices/expenseSlice';
import budgetSlice from './slices/budgetSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [expenseApi.reducerPath]: expenseApi.reducer,
    expense: expenseSlice,
    budget: budgetSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(expenseApi.middleware),
});

setupListeners(store.dispatch);
```

### RTK Query API Slices
```typescript
// services/api/expenseApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { Expense } from '../../types/models';

export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  baseQuery: async (args) => {
    // Offline-first implementation
    return { data: await localDb.getExpenses() };
  },
  tagTypes: ['Expense'],
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => 'expenses',
      providesTags: ['Expense'],
    }),
    addExpense: builder.mutation<Expense, Partial<Expense>>({
      query: (expense) => ({
        url: 'expenses',
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
});
```

## 🎨 Design System Implementation

### Theme Configuration
```typescript
// theme/index.ts
import { createTheme } from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: '#4CAF50',
    secondary: '#2196F3',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    error: '#F44336',
    warning: '#FF9800',
    success: '#8BC34A',
  },
  darkColors: {
    primary: '#4CAF50',
    secondary: '#2196F3',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    warning: '#FFB74D',
    success: '#81C784',
  },
  components: {
    Button: {
      raised: false,
      containerStyle: {
        borderRadius: 8,
      },
    },
  },
});
```

### Component Architecture
```typescript
// components/atoms/Button/Button.tsx
import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const StyledPressable = styled.Pressable<{ variant: string; size: string }>`
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return 'transparent';
      case 'danger': return theme.colors.error;
      default: return theme.colors.primary;
    }
  }};
  padding: ${({ size }) => {
    switch (size) {
      case 'small': return '8px 16px';
      case 'medium': return '12px 24px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  size = 'medium',
}) => {
  return (
    <StyledPressable
      variant={variant}
      size={size}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={{ color: 'white', fontSize: 16 }}>{title}</Text>
      )}
    </StyledPressable>
  );
};
```

## 🤖 AI/ML Integration

### TensorFlow Lite Setup
```typescript
// services/ml/tfjs.ts
import * as tf from '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

export class ExpenseMLService {
  private model: tf.LayersModel | null = null;

  async initialize() {
    await tf.ready();
    this.model = await tf.loadLayersModel(
      bundleResourceIO(modelJson, modelWeights)
    );
  }

  async predictCategory(text: string): Promise<string> {
    if (!this.model) return 'Other';
    
    const input = this.preprocessText(text);
    const prediction = this.model.predict(input) as tf.Tensor;
    const category = await this.decodePrediction(prediction);
    return category;
  }

  private preprocessText(text: string): tf.Tensor {
    // Text vectorization logic
    return tf.tensor2d([/* vectorized text */]);
  }

  private async decodePrediction(prediction: tf.Tensor): Promise<string> {
    const values = await prediction.argMax(-1).data();
    return CATEGORIES[values[0]];
  }
}
```

### OCR Implementation
```typescript
// services/ml/ocr.ts
import { MLKit } from 'react-native-mlkit';

export class ReceiptOCRService {
  async processImage(imagePath: string): Promise<ReceiptData> {
    const result = await MLKit.textRecognition(imagePath);
    
    return {
      vendor: this.extractVendor(result.text),
      amount: this.extractAmount(result.text),
      date: this.extractDate(result.text),
      items: this.extractItems(result.text),
      gst: this.extractGST(result.text),
    };
  }

  private extractAmount(text: string): number {
    const amountRegex = /(?:total|amount|₹)\s*(\d+(?:\.\d{2})?)/i;
    const match = text.match(amountRegex);
    return match ? parseFloat(match[1]) : 0;
  }

  private extractVendor(text: string): string {
    // Vendor name extraction logic
    return text.split('\n')[0] || 'Unknown';
  }

  private extractDate(text: string): Date {
    // Date extraction logic
    return new Date();
  }

  private extractItems(text: string): ReceiptItem[] {
    // Item extraction logic
    return [];
  }

  private extractGST(text: string): number {
    const gstRegex = /(?:gst|tax)\s*(\d+(?:\.\d{2})?)/i;
    const match = text.match(gstRegex);
    return match ? parseFloat(match[1]) : 0;
  }
}
```

## 📊 Charts & Visualization

### Victory Chart Setup
```typescript
// components/organisms/Charts/ExpenseChart.tsx
import React from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';

interface ExpenseChartProps {
  data: Array<{ x: string; y: number }>;
  type: 'line' | 'bar' | 'pie';
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ data, type }) => {
  const chartTheme = {
    ...VictoryTheme.material,
    axis: {
      ...VictoryTheme.material.axis,
      style: {
        ...VictoryTheme.material.axis.style,
        tickLabels: { fontSize: 12, fill: '#666' },
      },
    },
  };

  return (
    <View style={{ height: 200 }}>
      <VictoryChart theme={chartTheme}>
        <VictoryAxis dependentAxis />
        <VictoryAxis />
        {type === 'line' && <VictoryLine data={data} />}
        {/* Additional chart types */}
      </VictoryChart>
    </View>
  );
};
```

## 📱 Navigation Architecture

### Stack Navigator Setup
```typescript
// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

### Deep Linking Configuration
```typescript
// navigation/linking.ts
export const linking = {
  prefixes: ['expensetracker://'],
  config: {
    screens: {
      Dashboard: 'dashboard',
      AddExpense: 'add',
      Budget: 'budget',
      Chat: 'chat',
      Settings: 'settings',
    },
  },
};
```

## 💾 Storage & Database

### WatermelonDB Setup
```typescript
// services/storage/database.ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schema';
import { Expense, Category, Budget } from './models';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'expense_tracker.db',
});

export const database = new Database({
  adapter,
  modelClasses: [Expense, Category, Budget],
  actionsEnabled: true,
});
```

### MMKV Key-Value Storage
```typescript
// services/storage/mmkv.ts
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'expense-tracker-storage',
  encryptionKey: 'user-generated-key',
});

export const StorageKeys = {
  USER_PREFERENCES: 'user_preferences',
  AUTH_TOKEN: 'auth_token',
  FIRST_LAUNCH: 'first_launch',
  STREAK_COUNT: 'streak_count',
};
```

## 🔔 Push Notifications

### Notification Service
```typescript
// services/notifications/index.ts
import notifee, { AndroidImportance } from '@notifee/react-native';

export class NotificationService {
  async scheduleDailyReminder(time: Date) {
    await notifee.createChannel({
      id: 'daily-reminder',
      name: 'Daily Expense Reminder',
      importance: AndroidImportance.HIGH,
    });

    await notifee.createTriggerNotification(
      {
        title: 'Expense Reminder',
        body: 'Did you spend anything today?',
        android: {
          channelId: 'daily-reminder',
          pressAction: {
            id: 'open-app',
          },
        },
      },
      {
        type: notifee.TriggerType.TIMESTAMP,
        timestamp: time.getTime(),
        repeatFrequency: notifee.RepeatFrequency.DAILY,
      }
    );
  }
}
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// __tests__/expense.test.ts
import { ExpenseService } from '../services/expense';

describe('ExpenseService', () => {
  it('should categorize expense correctly', async () => {
    const service = new ExpenseService();
    const result = await service.categorize('Coffee at Starbucks 150');
    expect(result.category).toBe('Food & Beverage');
    expect(result.amount).toBe(150);
  });

  it('should detect duplicates', async () => {
    const service = new ExpenseService();
    const existing = { amount: 100, vendor: 'Uber', date: new Date() };
    const duplicate = { amount: 100, vendor: 'Uber', date: new Date() };
    
    expect(service.isDuplicate(existing, duplicate)).toBe(true);
  });
});
```

### Integration Tests
```typescript
// e2e/expenseFlow.test.js
describe('Expense Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should add expense successfully', async () => {
    await element(by.id('add-expense-button')).tap();
    await element(by.id('amount-input')).typeText('150');
    await element(by.id('category-food')).tap();
    await element(by.id('save-button')).tap();
    
    await expect(element(by.text('₹150'))).toBeVisible();
  });
});
```

## 🚀 Performance Optimization

### Code Splitting
```typescript
// React.lazy for dynamic imports
const ChatScreen = React.lazy(() => import('./screens/ChatScreen'));

// Bundle analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

if (process.env.ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}
```

### Image Optimization
```typescript
// Fast Image for caching
import FastImage from 'react-native-fast-image';

<FastImage
  source={{
    uri: 'https://example.com/image.jpg',
    priority: FastImage.priority.normal,
  }}
  style={{ width: 100, height: 100 }}
  resizeMode={FastImage.resizeMode.contain}
/>
```

## 📱 Platform-Specific Code

### iOS Specific
```typescript
// ios/RCTCalendarManager.m
#import <React/RCTBridgeModule.h>

@interface CalendarManager : NSObject <RCTBridgeModule>
@end

@implementation CalendarManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  // iOS native calendar integration
}

@end
```

### Android Specific
```typescript
// android/app/src/main/java/com/expensetracker/CalendarModule.java
package com.expensetracker;

import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class CalendarModule extends ReactContextBaseJavaModule {
  @Override
  public String getName() {
    return "CalendarManager";
  }

  @ReactMethod
  public void addEvent(String name, String location, Promise promise) {
    // Android native calendar integration
  }
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: yarn install
      - run: yarn test
      - run: yarn lint
      - run: yarn typescript

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform android
      - run: eas build --platform ios
```
