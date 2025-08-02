# Backend Architecture - AI Expense Tracker

## 🎯 Backend Philosophy
100% offline-first, privacy-first architecture with optional cloud sync. All AI processing happens on-device using TensorFlow Lite models.

## 🏗️ Architecture Overview

### Core Principles
- **Offline-First**: All data stored locally
- **Privacy-First**: No data sent to external servers
- **AI-On-Device**: TensorFlow Lite models run locally
- **Optional Sync**: Encrypted cloud backup only
- **Zero-Trust**: Assume no internet connectivity

### System Architecture
```
┌─────────────────────────────────────────┐
│           Mobile App                    │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐  │
│  │   Redux     │  │   TensorFlow    │  │
│  │   Store     │  │   Lite Models   │  │
│  └─────────────┘  └─────────────────┘  │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐  │
│  │ Watermelon  │  │   MMKV Storage  │  │
│  │   Database  │  │   (Encrypted)   │  │
│  └─────────────┘  └─────────────────┘  │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐  │
│  │   Local     │  │   Optional      │  │
│  │   Models    │  │   Cloud Sync    │  │
│  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────┘
```

## 💾 Database Design

### WatermelonDB Schema

#### Expense Model
```typescript
// models/Expense.ts
import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';

export class Expense extends Model {
  static table = 'expenses';

  @field('amount') amount: number;
  @field('description') description: string;
  @field('category_id') categoryId: string;
  @field('vendor') vendor: string;
  @field('payment_method') paymentMethod: string;
  @field('currency') currency: string;
  @field('is_recurring') isRecurring: boolean;
  @field('recurring_pattern') recurringPattern: string;
  @field('location') location: string;
  @field('receipt_path') receiptPath: string;
  @field('tags') tags: string;
  @field('notes') notes: string;
  @field('confidence_score') confidenceScore: number;
  @field('ai_category_prediction') aiCategoryPrediction: string;
  @field('ai_vendor_prediction') aiVendorPrediction: string;
  @field('is_ai_confirmed') isAiConfirmed: boolean;
  
  @date('created_at') createdAt: Date;
  @date('updated_at') updatedAt: Date;
  @date('expense_date') expenseDate: Date;
  
  @relation('categories', 'category_id') category: Category;
}
```

#### Category Model
```typescript
// models/Category.ts
export class Category extends Model {
  static table = 'categories';

  @field('name') name: string;
  @field('icon') icon: string;
  @field('color') color: string;
  @field('parent_id') parentId: string;
  @field('is_system') isSystem: boolean;
  @field('user_defined') userDefined: boolean;
  @field('ai_confidence') aiConfidence: number;
  @field('usage_count') usageCount: number;
  @field('average_amount') averageAmount: number;
  
  @field('ml_keywords') mlKeywords: string[];
  @field('vendor_mappings') vendorMappings: string[];
  
  @date('created_at') createdAt: Date;
  @date('updated_at') updatedAt: Date;
}
```

#### Budget Model
```typescript
// models/Budget.ts
export class Budget extends Model {
  static table = 'budgets';

  @field('category_id') categoryId: string;
  @field('amount') amount: number;
  @field('period') period: string; // 'weekly', 'monthly', 'yearly'
  @field('start_date') startDate: Date;
  @field('end_date') endDate: Date;
  @field('alert_threshold') alertThreshold: number;
  @field('is_active') isActive: boolean;
  @field('rollover') rollover: boolean;
  
  @field('ai_suggested') aiSuggested: boolean;
  @field('ai_reason') aiReason: string;
  
  @date('created_at') createdAt: Date;
  @date('updated_at') updatedAt: Date;
}
```

#### User Preferences Model
```typescript
// models/UserPreferences.ts
export class UserPreferences extends Model {
  static table = 'user_preferences';

  @field('currency') currency: string;
  @field('language') language: string;
  @field('theme') theme: string;
  @field('daily_reminder_time') dailyReminderTime: string;
  @field('weekly_reminder_day') weeklyReminderDay: string;
  @field('monthly_reminder_date') monthlyReminderDate: number;
  
  @field('ai_learning_enabled') aiLearningEnabled: boolean;
  @field('voice_enabled') voiceEnabled: boolean;
  @field('ocr_enabled') ocrEnabled: boolean;
  @field('location_tracking') locationTracking: boolean;
  
  @field('privacy_level') privacyLevel: string; // 'strict', 'balanced', 'relaxed'
  @field('backup_enabled') backupEnabled: boolean;
  @field('backup_frequency') backupFrequency: string;
  
  @date('created_at') createdAt: Date;
  @date('updated_at') updatedAt: Date;
}
```

## 🤖 AI Model Architecture

### On-Device ML Models

#### 1. Expense Categorization Model
```typescript
// models/ExpenseCategorizationModel.ts
interface ModelConfig {
  type: 'text_classification';
  architecture: 'transformer';
  size: 'small' | 'medium' | 'large';
  languages: string[];
  accuracy: number;
  inferenceTime: number;
}

const expenseCategorizationModel: ModelConfig = {
  type: 'text_classification',
  architecture: 'transformer',
  size: 'small',
  languages: ['en', 'hi', 'mr', 'ta', 'te'],
  accuracy: 0.92,
  inferenceTime: 150, // ms
};
```

#### 2. Vendor Recognition Model
```typescript
// models/VendorRecognitionModel.ts
interface VendorModelConfig {
  type: 'named_entity_recognition';
  entities: ['vendor', 'location', 'amount', 'date'];
  accuracy: number;
  supportedVendors: string[];
}

const vendorRecognitionModel: VendorModelConfig = {
  type: 'named_entity_recognition',
  entities: ['vendor', 'location', 'amount', 'date'],
  accuracy: 0.89,
  supportedVendors: [
    'swiggy', 'zomato', 'uber', 'ola', 'amazon', 'flipkart',
    'bigbazaar', 'dmart', 'reliance', 'tatacliq', 'myntra'
  ],
};
```

#### 3. Budget Prediction Model
```typescript
// models/BudgetPredictionModel.ts
interface BudgetModelConfig {
  type: 'time_series_forecasting';
  horizon: 'weekly' | 'monthly';
  features: string[];
  accuracy: number;
}

const budgetPredictionModel: BudgetModelConfig = {
  type: 'time_series_forecasting',
  horizon: 'monthly',
  features: [
    'historical_spending',
    'seasonal_patterns',
    'location_data',
    'vendor_frequency',
    'day_of_week',
    'time_of_day'
  ],
  accuracy: 0.85,
};
```

## 🔐 Security Architecture

### Encryption Strategy
```typescript
// security/EncryptionService.ts
export class EncryptionService {
  private key: string;
  
  async initialize() {
    this.key = await this.generateUserKey();
  }
  
  async encrypt(data: any): Promise<string> {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
  }
  
  async decrypt(encrypted: string): Promise<any> {
    const decrypted = CryptoJS.AES.decrypt(encrypted, this.key);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
  
  private async generateUserKey(): Promise<string> {
    // Generate key from device-specific + user-specific factors
    const deviceId = await DeviceInfo.getUniqueId();
    const userPin = await this.getUserPin();
    return CryptoJS.SHA256(deviceId + userPin).toString();
  }
}
```

### Privacy Layers
```typescript
// privacy/PrivacyLayer.ts
export class PrivacyLayer {
  layers = [
    'device_encryption',
    'app_level_encryption',
    'record_level_encryption',
    'field_level_encryption',
    'zero_knowledge_proofs'
  ];
  
  async applyPrivacySettings(level: PrivacyLevel) {
    switch (level) {
      case 'strict':
        return this.applyStrictPrivacy();
      case 'balanced':
        return this.applyBalancedPrivacy();
      case 'relaxed':
        return this.applyRelaxedPrivacy();
    }
  }
}
```

## 🔄 Sync Architecture

### Offline-First Sync Strategy
```typescript
// sync/SyncManager.ts
export class SyncManager {
  private queue: SyncQueue;
  private conflictResolver: ConflictResolver;
  
  async sync() {
    if (!navigator.onLine) {
      return this.handleOffline();
    }
    
    const changes = await this.getLocalChanges();
    const conflicts = await this.detectConflicts(changes);
    
    if (conflicts.length > 0) {
      return this.resolveConflicts(conflicts);
    }
    
    return this.performSync();
  }
  
  private async handleOffline() {
    // Queue changes for later sync
    return this.queue.addToQueue(changes);
  }
  
  private async resolveConflicts(conflicts: Conflict[]) {
    return Promise.all(
      conflicts.map(conflict => this.conflictResolver.resolve(conflict))
    );
  }
}
```

### Encrypted Cloud Backup
```typescript
// sync/CloudBackup.ts
export class CloudBackup {
  private encryption: EncryptionService;
  private compression: CompressionService;
  
  async backup() {
    const data = await this.getAllLocalData();
    const compressed = await this.compression.compress(data);
    const encrypted = await this.encryption.encrypt(compressed);
    
    return this.uploadToCloud(encrypted);
  }
  
  async restore(backupId: string) {
    const encrypted = await this.downloadFromCloud(backupId);
    const decrypted = await this.encryption.decrypt(encrypted);
    const decompressed = await this.compression.decompress(decrypted);
    
    return this.importToLocalDb(decompressed);
  }
}
```

## 📊 Analytics & Metrics

### Local Analytics
```typescript
// analytics/LocalAnalytics.ts
export class LocalAnalytics {
  private db: AnalyticsDatabase;
  
  async trackEvent(event: AnalyticsEvent) {
    return this.db.events.add({
      type: event.type,
      properties: event.properties,
      timestamp: new Date(),
      userId: await this.getUserId(),
      sessionId: await this.getSessionId(),
    });
  }
  
  async getInsights(timeRange: TimeRange): Promise<Insights> {
    const events = await this.db.events.query()
      .where('timestamp', '>=', timeRange.start)
      .where('timestamp', '<=', timeRange.end)
      .fetch();
    
    return this.generateInsights(events);
  }
  
  private generateInsights(events: AnalyticsEvent[]): Insights {
    return {
      spendingPatterns: this.analyzeSpendingPatterns(events),
      categoryUsage: this.analyzeCategoryUsage(events),
      aiAccuracy: this.analyzeAiAccuracy(events),
      userEngagement: this.analyzeUserEngagement(events),
    };
  }
}
```

## 🔧 Local Development Setup

### Database Migrations
```typescript
// migrations/001_initial_schema.ts
export const migration001 = {
  up: async (db: Database) => {
    await db.execute(`
      CREATE TABLE expenses (
        id TEXT PRIMARY KEY,
        amount REAL NOT NULL,
        description TEXT,
        category_id TEXT,
        vendor TEXT,
        payment_method TEXT,
        currency TEXT DEFAULT 'INR',
        expense_date INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        receipt_path TEXT,
        location TEXT,
        tags TEXT,
        notes TEXT,
        confidence_score REAL,
        ai_category_prediction TEXT,
        ai_vendor_prediction TEXT,
        is_ai_confirmed BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);
    
    await db.execute(`
      CREATE TABLE categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        icon TEXT,
        color TEXT,
        parent_id TEXT,
        is_system BOOLEAN DEFAULT FALSE,
        user_defined BOOLEAN DEFAULT TRUE,
        ml_keywords TEXT,
        vendor_mappings TEXT,
        usage_count INTEGER DEFAULT 0,
        average_amount REAL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);
  },
  
  down: async (db: Database) => {
    await db.execute('DROP TABLE expenses');
    await db.execute('DROP TABLE categories');
  }
};
```

### Seed Data
```typescript
// seeds/default_categories.ts
export const defaultCategories = [
  {
    id: 'food',
    name: 'Food & Dining',
    icon: '🍔',
    color: '#FF6B6B',
    ml_keywords: ['food', 'restaurant', 'swiggy', 'zomato', 'lunch', 'dinner'],
    vendor_mappings: ['swiggy', 'zomato', 'uber_eats', 'faasos', 'box8'],
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: '🚗',
    color: '#4ECDC4',
    ml_keywords: ['uber', 'ola', 'auto', 'metro', 'bus', 'train'],
    vendor_mappings: ['uber', 'ola', 'rapido', 'blusmart'],
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    color: '#45B7D1',
    ml_keywords: ['amazon', 'flipkart', 'myntra', 'shopping'],
    vendor_mappings: ['amazon', 'flipkart', 'myntra', 'ajio'],
  },
  // ... more categories
];
```

## 🚀 Performance Optimization

### Database Optimization
```typescript
// optimization/DatabaseOptimization.ts
export class DatabaseOptimization {
  async optimize() {
    await this.createIndexes();
    await this.vacuumDatabase();
    await this.analyzeQueryPerformance();
  }
  
  private async createIndexes() {
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_expense_date ON expenses(expense_date);
      CREATE INDEX IF NOT EXISTS idx_expense_category ON expenses(category_id);
      CREATE INDEX IF NOT EXISTS idx_expense_vendor ON expenses(vendor);
      CREATE INDEX IF NOT EXISTS idx_expense_amount ON expenses(amount);
    `);
  }
  
  private async vacuumDatabase() {
    await db.execute('VACUUM');
  }
}
```

### Model Optimization
```typescript
// optimization/ModelOptimization.ts
export class ModelOptimization {
  async optimizeModels() {
    await this.quantizeModels();
    await this.pruneModels();
    await this.cacheModelOutputs();
  }
  
  private async quantizeModels() {
    // Convert FP32 models to INT8 for smaller size
    return tf.quantization.quantize(this.models, 'int8');
  }
  
  private async cacheModelOutputs() {
    // Cache frequently used predictions
    return this.cache.set('predictions', this.recentPredictions);
  }
}
```

## 📋 Local Development Commands

### Database Commands
```bash
# Reset database
yarn db:reset

# Run migrations
yarn db:migrate

# Seed data
yarn db:seed

# Backup database
yarn db:backup

# Restore database
yarn db:restore
```

### Model Commands
```bash
# Train models
yarn ml:train

# Evaluate models
yarn ml:evaluate

# Optimize models
yarn ml:optimize

# Export models
yarn ml:export
```

### Analytics Commands
```bash
# Generate insights
yarn analytics:generate

# Export reports
yarn analytics:export

# Import data
yarn analytics:import

# Reset analytics
yarn analytics:reset
```
