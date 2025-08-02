# Screens - AI Expense Tracker

## 🎯 Design System Overview
- **Design Language**: Material Design 3 with Indian context
- **Color Palette**: Green (success), Blue (primary), Orange (warnings), Red (overspend)
- **Typography**: Roboto for body, Product Sans for headers
- **Icons**: Material Icons with custom expense category icons
- **Accessibility**: WCAG 2.1 AA compliant, Hindi language support

## 📱 Screen Catalog

### 1. Launch & Onboarding Screens

#### 1.1 Splash Screen
```
Purpose: Brand recognition, quick load
Elements:
- App logo (animated rupee symbol)
- Tagline: "Your money, your privacy"
- Loading indicator
- Version number (discreet)
```

#### 1.2 Welcome Screen
```
Purpose: First impression, privacy emphasis
Layout: Single scroll view
Sections:
- Hero illustration (secure vault concept)
- "100% Private" badge (animated)
- 3 key features (animated cards)
- "Get Started" CTA (green button)
- "Restore from backup" link
```

#### 1.3 Privacy Consent Screen
```
Purpose: Transparent data handling
Design: Card-based layout
Elements:
- "Your data never leaves your phone"
- Permission explanations (denied by default)
- "Continue without permissions" option
- Privacy policy link
- "I understand" checkbox
```

#### 1.4 Profile Setup Screen
```
Purpose: Personalization
Fields:
- Name (optional)
- Currency (auto-detect ₹)
- Language (English/Hindi)
- Daily reminder time (9 PM default)
- Income range (for budget suggestions)
```

### 2. Home Dashboard Screens

#### 2.1 Main Dashboard
```
Layout: Card-based dashboard
Sections:
- **Top Section**:
  - Greeting ("Good evening, Asha")
  - Today's spend (₹820)
  - Budget status ("₹180 remaining")
  - Streak counter (7 days 🔥)

- **Quick Actions** (horizontal scroll):
  - "Add Expense" (+)
  - "Scan Receipt" (camera)
  - "Voice Log" (mic)
  - "View Trends" (chart)

- **Recent Expenses**:
  - Last 3 transactions
  - Swipe actions (edit/delete)
  - Category icons

- **AI Suggestions**:
  - "Log your lunch?"
  - "Rent due tomorrow"
  - "Weekend budget alert"
```

#### 2.2 Empty State Dashboard
```
Purpose: First-time user guidance
Elements:
- Friendly illustration
- "Log your first expense" CTA
- Tutorial video (30 sec)
- "Need help?" tooltip
```

### 3. Expense Logging Screens

#### 3.1 Smart Input Screen
```
Layout: Bottom sheet modal
Components:
- **Input Field**: Natural language support
- **AI Suggestions**: Dropdown with predictions
- **Quick Amounts**: ₹50, ₹100, ₹500 buttons
- **Category Chips**: Smart pre-selection
- **Voice Toggle**: Mic button
- **Camera Toggle**: Receipt scan

**Smart Features**:
- Auto-complete vendors ("swig" → "Swiggy")
- Amount detection from text
- Category prediction ("coffee" → Food)
- Duplicate detection warning
```

#### 3.2 Voice Input Screen
```
Design: Full screen with waveform
Elements:
- Real-time speech visualization
- "Listening..." indicator
- Transcript preview
- Retry button
- Language toggle (English/Hindi)
- Background noise warning
```

#### 3.3 Receipt Scanner Screen
```
Layout: Camera interface
Features:
- Live preview with edge detection
- Auto-capture when steady
- Manual crop tool
- Multiple receipt support
- Flash toggle
- Gallery import option

**Processing Screen**:
- OCR progress indicator
- Item-wise breakdown preview
- GST detection toggle
- Manual correction option
```

### 4. Budget & Goals Screens

#### 4.1 Budget Overview Screen
```
Layout: Circular progress indicators
Sections:
- **Monthly Overview**:
  - Total budget vs spent
  - Category-wise breakdown
  - Days remaining counter

- **Category Cards**:
  - Food: ₹2,300/₹3,000 (77%)
  - Transport: ₹800/₹1,000 (80%)
  - Shopping: ₹0/₹2,000 (0%)

- **AI Insights**:
  - "You're spending 20% more on food"
  - "₹500 remaining for 5 days"
```

#### 4.2 Goal Setting Screen
```
Layout: Step-by-step wizard
Steps:
1. Category selection (with icons)
2. Amount input (with AI suggestions)
3. Time period (monthly/weekly)
4. Alert preferences (push/email)
5. Confirmation screen
```

#### 4.3 Overspend Alert Screen
```
Design: Warning modal
Elements:
- Red warning banner
- "₹200 over budget" message
- Options: Ignore/Adjust/Find alternatives
- AI suggestions ("Try cooking at home")
```

### 5. Insights & Trends Screens

#### 5.1 Trends Dashboard
```
Layout: Scrollable analytics
Charts:
- **Daily spend line chart**
- **Category pie chart**
- **Weekday comparison**
- **Month-over-month growth**

Interactive Elements:
- Tap to see details
- Pinch to zoom
- Swipe between time periods
- Share chart option
```

#### 5.2 Monthly Report Screen
```
Design: Magazine-style layout
Sections:
- **Cover**: "Your March Spending Story"
- **Highlights**: Biggest expense, most saved category
- **AI Insights**: Personalized recommendations
- **Achievements**: Badges earned
- **Next Month**: Predictions and goals

Export Options:
- PDF download
- Share to WhatsApp
- Print-friendly version
```

### 6. Chat Interface Screens

#### 6.1 AI Chat Screen
```
Layout: WhatsApp-style interface
Features:
- **Message bubbles**: User vs AI
- **Quick replies**: "This month", "Food", "Compare"
- **Rich cards**: Charts, graphs in chat
- **Voice messages**: Send voice queries
- **Image sharing**: "What's this bill?"

**AI Personality**:
- Friendly, helpful tone
- Emoji usage (limited)
- Hindi/English code-switching
- Proactive suggestions
```

#### 6.2 Query Examples
```
User: "How much did I spend on food?"
AI: Shows ₹3,450 with breakdown chart

User: "Compare with last month"
AI: Side-by-side comparison

User: "Save more money"
AI: Personalized suggestions list
```

### 7. Gamification Screens

#### 7.1 Streak Tracker Screen
```
Design: Game-style interface
Elements:
- **Flame animation**: Growing with streak
- **Calendar view**: Green/red days
- **Milestone rewards**: Unlockable badges
- **Share card**: Instagram story format
```

#### 7.2 Achievements Screen
```
Layout: Trophy cabinet
Categories:
- **Logging**: "7-day streak", "100 expenses"
- **Budgeting**: "Goal achieved", "Overspend avoided"
- **Savings**: "₹1000 saved", "50% budget cut"
- **Sharing**: "Invited friend", "Review written"
```

### 8. Settings Screens

#### 8.1 Settings Main Screen
```
Layout: Grouped list
Sections:
- **Account**: Profile, backup, sync
- **Preferences**: Language, currency, theme
- **Privacy**: Data export, deletion
- **Notifications**: Reminders, alerts
- **Help**: Tutorial, FAQ, support
```

#### 8.2 Privacy Settings Screen
```
Design: Toggle switches
Options:
- **Data storage**: Local only/Encrypted cloud
- **Analytics**: Anonymous usage (on/off)
- **Third-party**: No sharing (locked off)
- **Deletion**: "Delete all my data"
```

### 9. Backup & Sync Screens

#### 9.1 Backup Screen
```
Layout: Card-based options
Methods:
- **Local backup**: Encrypted file
- **Google Drive**: Encrypted sync
- **iCloud**: Apple ecosystem
- **QR Code**: Device transfer
- **CSV Export**: Spreadsheet format
```

#### 9.2 Restore Screen
```
Design: File picker interface
Steps:
1. Choose backup method
2. Authenticate (biometric)
3. Select backup file
4. Preview data
5. Confirm restore
```

## 🎨 Component Library

### Buttons
```
Primary: Green (#4CAF50), rounded, elevation 2dp
Secondary: Outlined, blue text
Destructive: Red with warning icon
Floating: Blue (+) button
```

### Cards
```
Expense Card: White, elevation 1dp, ripple effect
Budget Card: Colored based on status (green/yellow/red)
Insight Card: Gradient background
Achievement Card: Gold accent
```

### Input Fields
```
Smart Input: Rounded corners, hint text
Voice Input: Real-time waveform
Amount Input: Large font, currency symbol
Category Selector: Chips with icons
```

### Charts
```
Pie Chart: Material Design colors
Line Chart: Smooth curves, touch points
Bar Chart: Rounded corners
Progress Ring: Animated, percentage inside
```

## 📱 Responsive Design

### Phone Layout (Portrait)
```
Single column layout
Bottom navigation (5 tabs)
Floating action button
Swipe gestures
One-handed usage
```

### Tablet Layout (Landscape)
```
Two-column layout
Navigation rail
Persistent dashboard
Multi-window support
Drag and drop
```

### Foldable Support
```
Single screen: Phone layout
Dual screen: List-detail view
Hinge-aware layouts
Adaptive navigation
```

## 🌙 Dark Mode

### Color Adaptations
```
Background: Dark grey (#121212)
Surface: Grey (#1E1E1E)
Primary: Green (unchanged)
Text: White/87% opacity
Icons: White/60% opacity
```

### Component Changes
```
Cards: Slightly darker
Charts: High contrast colors
Images: Reduced brightness
Animations: Subtle glow effects
```

## 🎯 Accessibility Features

### Screen Reader Support
```
All images have alt text
Charts have data tables
Buttons have descriptive labels
Navigation has landmarks
```

### Motor Accessibility
```
Large touch targets (48dp minimum)
Gesture alternatives
Voice control support
Switch access compatibility
```

### Cognitive Accessibility
```
Simple language options
Reduced animations toggle
High contrast mode
Focus indicators
```

## 🎨 Brand Guidelines

### Logo Usage
```
Primary: Green rupee symbol
Monochrome: Black/white versions
Minimum size: 24px
Clear space: 2x logo height
```

### Color Palette
```
Primary Green: #4CAF50
Accent Blue: #2196F3
Warning Orange: #FF9800
Error Red: #F44336
Success Green: #8BC34A
```

### Typography Scale
```
Headline 1: 32sp (Roboto Medium)
Headline 2: 28sp (Roboto Regular)
Body 1: 16sp (Roboto Regular)
Body 2: 14sp (Roboto Regular)
Caption: 12sp (Roboto Regular)
```

## 📊 Design Tokens
```
Spacing: 4dp grid system
Elevation: 0, 1, 2, 4, 8 dp
Border radius: 4, 8, 16, 24 dp
Opacity: 87%, 60%, 38%
Animation: 200ms, 300ms, 500ms
```
