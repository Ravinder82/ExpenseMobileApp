# Testing Strategy - AI Expense Tracker

## 🎯 Testing Philosophy
Zero-tolerance for bugs in financial data. Comprehensive testing across all layers with focus on accuracy, privacy, and user experience.

## 🏗️ Testing Architecture

### Testing Pyramid
```
┌─────────────────────────────────────┐
│         E2E Tests (10%)             │  50 test cases
├─────────────────────────────────────┤
│    Integration Tests (30%)          │  200 test cases
├─────────────────────────────────────┤
│      Unit Tests (60%)               │  500 test cases
└─────────────────────────────────────┘
```

## 🧪 Test Categories

### 1. Unit Tests

#### AI Model Tests
```typescript
// __tests__/ai/expenseCategorization.test.ts
describe('Expense Categorization Model', () => {
  const testCases = [
    { input: "150 lunch at office", expected: "Food & Dining" },
    { input: "250 uber to airport", expected: "Transport" },
    { input: "1200 amazon order", expected: "Shopping" },
    { input: "500 groceries big bazaar", expected: "Groceries" },
    { input: "₹50 chai tapri", expected: "Food & Beverage" },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should categorize "${input}" as ${expected}`, async () => {
      const result = await categorizer.predict(input);
      expect(result.category).toBe(expected);
      expect(result.confidence).toBeGreaterThan(0.85);
    });
  });

  it('should handle Hindi text', async () => {
    const result = await categorizer.predict("₹200 खाना ऑफिस में");
    expect(result.category).toBe("Food & Dining");
  });

  it('should handle ambiguous input', async () => {
    const result = await categorizer.predict("100");
    expect(result.category).toBe("Uncategorized");
    expect(result.needsConfirmation).toBe(true);
  });
});
```

#### OCR Accuracy Tests
```typescript
// __tests__/ai/receiptOCR.test.ts
describe('Receipt OCR Service', () => {
  const testReceipts = [
    {
      image: 'grocery_bill.jpg',
      expected: {
        vendor: 'DMart',
        amount: 1250.50,
        items: [
          { name: 'Rice', amount: 200 },
          { name: 'Dal', amount: 150 },
          { name: 'Vegetables', amount: 300 }
        ]
      }
    },
    {
      image: 'restaurant_bill.jpg',
      expected: {
        vendor: 'Starbucks',
        amount: 450.00,
        gst: 40.91
      }
    }
  ];

  testReceipts.forEach(({ image, expected }) => {
    it(`should extract data from ${image}`, async () => {
      const result = await ocrService.process(image);
      expect(result.vendor).toBe(expected.vendor);
      expect(result.amount).toBeCloseTo(expected.amount, 2);
      expect(result.items).toHaveLength(expected.items?.length || 0);
    });
  });
});
```

#### Database Tests
```typescript
// __tests__/database/expenseRepository.test.ts
describe('Expense Repository', () => {
  it('should create expense with all fields', async () => {
    const expense = await expenseRepo.create({
      amount: 150,
      description: 'Lunch',
      categoryId: 'food',
      vendor: 'Office Cafeteria',
      expenseDate: new Date('2024-01-15')
    });

    expect(expense.amount).toBe(150);
    expect(expense.description).toBe('Lunch');
    expect(expense.createdAt).toBeDefined();
  });

  it('should prevent duplicate expenses', async () => {
    const expense1 = await expenseRepo.create({
      amount: 100,
      description: 'Auto',
      vendor: 'Uber',
      expenseDate: new Date('2024-01-15')
    });

    const expense2 = await expenseRepo.create({
      amount: 100,
      description: 'Auto',
      vendor: 'Uber',
      expenseDate: new Date('2024-01-15')
    });

    expect(expense2.id).toBe(expense1.id); // Should update existing
  });

  it('should handle bulk operations efficiently', async () => {
    const expenses = Array.from({ length: 1000 }, (_, i) => ({
      amount: Math.floor(Math.random() * 1000),
      description: `Expense ${i}`,
      expenseDate: new Date()
    }));

    const start = Date.now();
    await expenseRepo.createMany(expenses);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(5000); // Should complete in <5s
  });
});
```

### 2. Integration Tests

#### User Flow Tests
```typescript
// __tests__/integration/expenseFlow.test.ts
describe('Expense Logging Flow', () => {
  it('should complete manual entry flow', async () => {
    const { getByTestId, getByText } = render(<AddExpenseScreen />);

    // Enter amount
    fireEvent.changeText(getByTestId('amount-input'), '150');

    // Enter description
    fireEvent.changeText(getByTestId('description-input'), 'Lunch at office');

    // Select category
    fireEvent.press(getByTestId('category-food'));

    // Save expense
    fireEvent.press(getByTestId('save-button'));

    // Verify expense was created
    await waitFor(() => {
      expect(getByText('₹150')).toBeTruthy();
      expect(getByText('Lunch at office')).toBeTruthy();
    });
  });

  it('should handle voice input flow', async () => {
    const { getByTestId, getByText } = render(<VoiceInputScreen />);

    // Start voice recording
    fireEvent.press(getByTestId('voice-record-button'));

    // Simulate voice input
    mockVoiceRecognition('spent 200 on groceries at big bazaar');

    // Verify parsed data
    await waitFor(() => {
      expect(getByText('₹200')).toBeTruthy();
      expect(getByText('Big Bazaar')).toBeTruthy();
      expect(getByText('Groceries')).toBeTruthy();
    });
  });
});
```

#### Budget Management Tests
```typescript
// __tests__/integration/budgetFlow.test.ts
describe('Budget Management Flow', () => {
  it('should create and track budget', async () => {
    const { getByTestId, getByText } = render(<BudgetScreen />);

    // Create budget
    fireEvent.press(getByTestId('create-budget-button'));
    fireEvent.changeText(getByTestId('budget-amount'), '5000');
    fireEvent.press(getByTestId('save-budget'));

    // Add expenses
    await expenseRepo.create({
      amount: 1000,
      categoryId: 'food',
      expenseDate: new Date()
    });

    // Verify budget tracking
    await waitFor(() => {
      expect(getByText('₹1000 / ₹5000')).toBeTruthy();
      expect(getByText('20% used')).toBeTruthy();
    });
  });

  it('should alert on overspend', async () => {
    const { getByTestId, getByText } = render(<BudgetScreen />);

    // Create budget with low limit
    await budgetRepo.create({
      categoryId: 'food',
      amount: 100,
      period: 'monthly'
    });

    // Add expense exceeding budget
    await expenseRepo.create({
      amount: 150,
      categoryId: 'food',
      expenseDate: new Date()
    });

    // Verify overspend alert
    await waitFor(() => {
      expect(getByText('₹50 over budget')).toBeTruthy();
    });
  });
});
```

### 3. End-to-End Tests

#### Complete User Journey
```typescript
// e2e/userJourney.test.ts
describe('Complete User Journey', () => {
  beforeEach(async () => {
    await device.launchApp({
      permissions: {
        camera: 'YES',
        microphone: 'YES'
      }
    });
  });

  it('should complete onboarding and first expense', async () => {
    // Welcome screen
    await element(by.text('Get Started')).tap();

    // Privacy consent
    await element(by.id('privacy-consent-checkbox')).tap();
    await element(by.text('Continue')).tap();

    // Profile setup
    await element(by.id('name-input')).typeText('Asha');
    await element(by.id('currency-selector')).tap();
    await element(by.text('₹ INR')).tap();
    await element(by.text('Continue')).tap();

    // First expense
    await element(by.id('add-expense-button')).tap();
    await element(by.id('amount-input')).typeText('120');
    await element(by.id('description-input')).typeText('Auto to office');
    await element(by.id('save-expense')).tap();

    // Verify expense appears
    await expect(element(by.text('₹120'))).toBeVisible();
    await expect(element(by.text('Auto to office'))).toBeVisible();
  });

  it('should demonstrate AI learning', async () => {
    // Add multiple similar expenses
    for (let i = 0; i < 5; i++) {
      await element(by.id('add-expense-button')).tap();
      await element(by.id('amount-input')).typeText('150');
      await element(by.id('description-input')).typeText(`Swiggy order ${i+1}`);
      await element(by.id('category-food')).tap();
      await element(by.id('save-expense')).tap();
    }

    // Check AI suggestions
    await element(by.id('add-expense-button')).tap();
    await element(by.id('description-input')).typeText('swiggy dinner');
    
    // Verify AI pre-filled category
    await expect(element(by.id('category-food'))).toBeVisible();
  });
});
```

## 🧪 Test Data Management

### Test Data Factory
```typescript
// factories/expenseFactory.ts
export class ExpenseFactory {
  static create(overrides: Partial<Expense> = {}): Expense {
    return {
      id: faker.string.uuid(),
      amount: faker.number.float({ min: 10, max: 1000, precision: 0.01 }),
      description: faker.lorem.words(3),
      categoryId: faker.helpers.arrayElement(categories),
      vendor: faker.company.name(),
      expenseDate: faker.date.recent(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    };
  }

  static createMany(count: number, overrides: Partial<Expense> = {}): Expense[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}
```

### Mock Data for Testing
```typescript
// mocks/receipts.ts
export const mockReceipts = {
  grocery: {
    text: `
      DMART
      Invoice No: 12345
      Date: 15/01/2024
      
      Rice 5kg          200.00
      Dal 2kg           150.00
      Vegetables        300.00
      
      Subtotal:         650.00
      GST:              58.50
      Total:            708.50
    `,
    expected: {
      vendor: 'DMart',
      amount: 708.50,
      gst: 58.50,
      items: [
        { name: 'Rice', amount: 200 },
        { name: 'Dal', amount: 150 },
        { name: 'Vegetables', amount: 300 }
      ]
    }
  }
};
```

## 🔍 Performance Testing

### Load Testing
```typescript
// performance/loadTest.ts
describe('Performance Tests', () => {
  it('should handle 10,000 expenses efficiently', async () => {
    const expenses = ExpenseFactory.createMany(10000);
    
    const start = Date.now();
    await expenseRepo.createMany(expenses);
    const duration = Date.now() - start;
    
    expect(duration).toBeLessThan(10000); // <10s for 10k records
  });

  it('should search expenses quickly', async () => {
    await expenseRepo.createMany(ExpenseFactory.createMany(1000));
    
    const start = Date.now();
    const results = await expenseRepo.search({
      query: 'swiggy',
      limit: 50
    });
    const duration = Date.now() - start;
    
    expect(duration).toBeLessThan(100); // <100ms
    expect(results).toHaveLength(50);
  });
});
```

### Memory Usage Tests
```typescript
// performance/memoryTest.ts
describe('Memory Usage Tests', () => {
  it('should not leak memory during long sessions', async () => {
    const initialMemory = await getMemoryUsage();
    
    // Simulate 1000 expense operations
    for (let i = 0; i < 1000; i++) {
      await expenseRepo.create(ExpenseFactory.create());
    }
    
    // Force garbage collection
    global.gc();
    
    const finalMemory = await getMemoryUsage();
    const memoryIncrease = finalMemory - initialMemory;
    
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // <50MB
  });
});
```

## 🛡️ Security Testing

### Data Privacy Tests
```typescript
// security/privacy.test.ts
describe('Privacy Tests', () => {
  it('should encrypt sensitive data', async () => {
    const sensitiveData = {
      amount: 1000,
      description: 'Salary',
      vendor: 'Company'
    };
    
    const encrypted = await encryptionService.encrypt(sensitiveData);
    expect(encrypted).not.toContain('1000');
    expect(encrypted).not.toContain('Salary');
    expect(encrypted).not.toContain('Company');
  });

  it('should not send data to external servers', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    
    await expenseRepo.create({
      amount: 100,
      description: 'Test'
    });
    
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
```

### Input Validation Tests
```typescript
// security/inputValidation.test.ts
describe('Input Validation Tests', () => {
  it('should sanitize SQL injection attempts', async () => {
    const maliciousInput = "'; DROP TABLE expenses; --";
    
    await expect(expenseRepo.create({
      description: maliciousInput,
      amount: 100
    })).rejects.toThrow();
  });

  it('should validate amount ranges', async () => {
    await expect(expenseRepo.create({
      amount: -100,
      description: 'Invalid'
    })).rejects.toThrow('Amount must be positive');

    await expect(expenseRepo.create({
      amount: 10000000,
      description: 'Too large'
    })).rejects.toThrow('Amount exceeds maximum');
  });
});
```

## 🎯 Accessibility Testing

### Screen Reader Tests
```typescript
// accessibility/screenReader.test.ts
describe('Screen Reader Tests', () => {
  it('should have proper labels for all interactive elements', async () => {
    const { getByLabelText } = render(<AddExpenseScreen />);
    
    expect(getByLabelText('Enter amount')).toBeTruthy();
    expect(getByLabelText('Enter description')).toBeTruthy();
    expect(getByLabelText('Save expense')).toBeTruthy();
  });

  it('should announce dynamic content changes', async () => {
    const { getByTestId } = render(<BudgetProgress />);
    
    fireEvent.press(getByTestId('increase-budget'));
    
    await waitFor(() => {
      expect(getByTestId('budget-amount')).toHaveTextContent('₹5000');
    });
  });
});
```

## 🔄 Test Automation

### CI/CD Pipeline Tests
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Run unit tests
        run: yarn test:unit
      
      - name: Run integration tests
        run: yarn test:integration
      
      - name: Run E2E tests
        run: yarn test:e2e
      
      - name: Run security tests
        run: yarn test:security
      
      - name: Generate coverage report
        run: yarn test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
```

### Test Reporting
```typescript
// reporting/testReporter.ts
export class TestReporter {
  async generateReport() {
    const results = await this.runAllTests();
    
    return {
      summary: {
        total: results.length,
        passed: results.filter(r => r.status === 'passed').length,
        failed: results.filter(r => r.status === 'failed').length,
        skipped: results.filter(r => r.status === 'skipped').length
      },
      coverage: await this.calculateCoverage(),
      performance: await this.getPerformanceMetrics(),
      security: await this.getSecurityMetrics()
    };
  }
}
```

## 📊 Test Metrics & KPIs

### Quality Gates
- **Unit Test Coverage**: >90%
- **Integration Test Coverage**: >85%
- **E2E Test Coverage**: >80%
- **Security Test Pass Rate**: 100%
- **Performance Test Pass Rate**: 100%
- **Accessibility Test Pass Rate**: 100%

### Performance Benchmarks
- **AI Model Inference**: <200ms
- **Database Query**: <100ms
- **App Launch Time**: <3s
- **Expense Save Time**: <500ms
- **OCR Processing**: <2s

## 🚨 Monitoring & Alerting

### Test Monitoring
```typescript
// monitoring/testMonitoring.ts
export class TestMonitoring {
  async monitor() {
    const metrics = await this.collectMetrics();
    
    if (metrics.testFailureRate > 0.05) {
      await this.sendAlert('High test failure rate detected');
    }
    
    if (metrics.performanceRegression > 0.1) {
      await this.sendAlert('Performance regression detected');
    }
  }
}
```

## 📋 Manual Testing Checklist

### Pre-Release Testing
- [ ] All expense entry methods tested
- [ ] Budget creation and tracking tested
- [ ] AI suggestions accuracy verified
- [ ] OCR functionality tested with various receipts
- [ ] Voice input tested with different accents
- [ ] Offline functionality verified
- [ ] Data backup and restore tested
- [ ] Security tests passed
- [ ] Performance benchmarks met
- [ ] Accessibility tests passed
- [ ] Cross-device sync tested
- [ ] Update scenarios tested

### User Acceptance Testing
- [ ] New user onboarding smooth
- [ ] Daily usage scenarios covered
- [ ] Edge cases handled gracefully
- [ ] Error messages user-friendly
- [ ] Performance acceptable on low-end devices
- [ ] Battery usage reasonable
- [ ] Data privacy respected
- [ ] Localization accurate
