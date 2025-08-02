## 🔧 App Name: AI Expense Tracker

**Tagline**: “AI-powered, privacy-first expense logging with super-fast UX and intelligent nudges.”

---

## 🎨 1. Global Design System & Style Guide (Dark Mode)

| Element            | Spec                                                          |
| ------------------ | ------------------------------------------------------------- |
| **Primary BG**     | `#121212`                                                     |
| **Card Surface**   | `#1E1E1E`                                                     |
| **Primary Accent** | `#FF6B00` (used for highlights, buttons, toggles)             |
| **Text Primary**   | `#EAEAEA`                                                     |
| **Text Secondary** | `#A0A0A0`                                                     |
| **Success Color**  | `#4CAF50`                                                     |
| **Danger Color**   | `#FF3B30`                                                     |
| **Glow Effect**    | `box-shadow: 0px 0px 16px 4px rgba(255,107,0,0.25)`           |
| **Radius**         | `16px` for cards, `24px` for buttons                          |
| **Spacing Unit**   | `8pt spacing grid (standard Apple Human Interface Guideline)` |
| **Font**           | Inter / SF Pro / Roboto — fallback stack                      |

---

## 📱 2. Screen-by-Screen Technical UI Breakdown

### 🏠 2.1 Home Screen (DashboardView)

#### 2.1.1 Screen Header

| Attribute        | Value                                                                               |
| ---------------- | ----------------------------------------------------------------------------------- |
| Title Text       | “💰 Expense Tracker” (fontSize: `28pt`, weight: `600`)                              |
| Subtitle Text    | “AI-Powered Expense Management” (fontSize: `14pt`, weight: `400`, color: `#A0A0A0`) |
| Layout           | `HStack` or `ZStack` (SwiftUI) / `View + FlexRow` (React Native)                    |
| Icons (optional) | Bell icon (`Feather`, size: `24px`, inactive color: `#A0A0A0`)                      |

#### 2.1.2 Smart Expense Input Card

| Component                                                        | Spec                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------ |
| **Card BG**                                                      | `#1E1E1E` with `16px` radius and `12px` padding        |
| **Input Field 1**                                                | Placeholder: “Describe your expense (e.g. lunch Uber)” |
| FontSize: `16pt`, weight: `500`, text color: `#EAEAEA`           |                                                        |
| BG: `#2A2A2A`, Border radius: `12px`, Padding: `10px`            |                                                        |
| **Input Field 2**                                                | Placeholder: `Amount (₹)`                              |
| Same style as above                                              |                                                        |
| **Chip Selector**                                                | Horizontal ScrollView of Chips:                        |
| Rounded pill (`20px` radius), padding `6px 16px`, spacing `8pt`. |                                                        |
| Colors: Selected → `#FF6B00`, white text.                        |                                                        |
| Unselected → `#2A2A2A`, gray text                                |                                                        |
| **CTA Button**                                                   | Label: `Add Smart Expense`                             |
| Font: `16pt`, bold, white                                        |                                                        |
| BG: `#FF6B00` with glow.                                         |                                                        |
| Height: `50pt`, radius: `25pt`, horizontal padding: `16pt`       |                                                        |

#### 2.1.3 Total Expenses Card

| Attribute     | Spec                                                          |
| ------------- | ------------------------------------------------------------- |
| Card Size     | Height: `100pt`                                               |
| Top Label     | “📊 Total Expenses” — `fontSize: 14pt`, `#A0A0A0`             |
| Amount        | ₹0.00 — `fontSize: 26pt`, `fontWeight: 700`, color: `#FF6B00` |
| Border Radius | `16px`                                                        |
| Shadow        | `rgba(255,107,0,0.1) 0px 0px 10px`                            |

#### 2.1.4 Statistics Summary Card

| Text   | Value                                                |
| ------ | ---------------------------------------------------- |
| Label  | ✨ Statistics (font: `14pt`, gray)                    |
| Value  | `0 Expenses` (font: `18pt`, orange)                  |
| Layout | `VStack`, Card: `16px` padding, background `#1E1E1E` |

---

### 📜 2.2 Recent Expenses View (RecentExpensesView)

| Component                                 | Spec                                                |
| ----------------------------------------- | --------------------------------------------------- |
| Card Height                               | `70pt`                                              |
| Left Icon                                 | Circle avatar with category icon (e.g., food → 🍽️) |
| Center Text Block                         | Title: “Lunch at office” — bold, `16pt`             |
| Subtext: “2 Aug 2025” — `12pt`, `#A0A0A0` |                                                     |
| Right Amount                              | ₹180, bold, `#FF6B00`, `18pt`                       |
| Divider                                   | 1px `#2D2D2D`                                       |
| Layout                                    | `HStack` with padding `12pt`                        |

---

### 📊 2.3 Analytics Screen (AnalyticsView)

#### 2.3.1 Budget Progress Bars

| Component             | Spec                                                |
| --------------------- | --------------------------------------------------- |
| Header Text           | “This Month’s Takeout Budget” — `fontSize: 14pt`    |
| Bar                   | Height: `16pt`, width: full, radius: `8pt`          |
| Filled %: Orange      |                                                     |
| Background: `#2A2A2A` |                                                     |
| Status Text           | “₹1,800 of ₹2,000 used” — right aligned, `#A0A0A0`  |
| Alert                 | Red text when budget is exceeded: “⚠️ Over budget!” |

#### 2.3.2 Chart Card

| Chart Type | Bar Chart                                                                    |
| ---------- | ---------------------------------------------------------------------------- |
| Bars       | 5-7 bars, width `18pt`, height `dynamic`, rounded top                        |
| Active     | Filled Orange (`#FF6B00`)                                                    |
| Inactive   | `#2D2D2D`                                                                    |
| Labels     | Day of week below each bar                                                   |
| Caption    | “You spent 20% more than last week on Food” — `fontSize: 12pt`, italic, gray |

#### 2.3.3 AI Tips Card

\| Text Block | “💡 Tip: Switch to meal kits for ₹800/month savings” |
\| Button     | Label: “Set Weekly Food Goal” — height: `44pt`, width: auto, pill-shaped |

---

### 🎙️ 2.4 Voice + OCR Input Screen

| Component                       | Spec                                  |
| ------------------------------- | ------------------------------------- |
| Mic Button                      | Size: `80pt`, circle, center screen   |
| Glow on record (shadow: orange) |                                       |
| Receipt Camera                  | IconButton with camera icon           |
| Takes photo → preview modal     |                                       |
| Modal Card                      | Extracted info: “₹560, Swiggy, 2 Aug” |
| Edit fields inline              |                                       |
| Button: “✅ Add Entry”           |                                       |

---

## 🔄 3. Tab Bar

| Tab      | Icon                                                           | Style |
| -------- | -------------------------------------------------------------- | ----- |
| Home     | 🏠 (Filled if active), white, orange bg pill                   |       |
| Insights | 📊 Gray if inactive                                            |       |
| Add FAB  | ➕ (center) — glowing orange button, `60pt`, floating above tab |       |
| Chat     | 💬                                                             |       |
| Profile  | 👤                                                             |       |

---

## 📦 4. Component Naming & Structure (SwiftUI)

| Feature        | SwiftUI File               |
| -------------- | -------------------------- |
| Dashboard      | `DashboardView.swift`      |
| Input Card     | `SmartExpenseCard.swift`   |
| Analytics      | `InsightsView.swift`       |
| Bar Chart      | `ExpenseBarChart.swift`    |
| Progress Bars  | `BudgetProgressCard.swift` |
| Expense List   | `ExpenseTile.swift`        |
| Receipt Parser | `ReceiptOCRView.swift`     |
| Voice Logger   | `VoiceInputView.swift`     |
| Chat           | `BudgetChatView.swift`     |

---

## ✅ Summary

This spec gives you:

* **Exact spacing, padding, font sizes**
* **Precise colors and layout rules**
* **Component names for code organization**
* **Behavioral triggers (e.g., glow, confetti)**
