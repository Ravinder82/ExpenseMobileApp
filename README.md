# Expense Tracker App

A modern, cross-platform mobile application built with React Native and Expo for tracking personal expenses with a beautiful UI and powerful features.

![Expense Tracker App](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📱 Features

- **Expense Tracking**: Add, edit, and delete expenses with categories
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Analytics**: Visualize your spending with interactive charts
- **Notifications**: Daily reminders and weekly summaries
- **Receipt Scanning**: Scan receipts to automatically add expenses (coming soon)
- **Cross-Platform**: Works on both iOS and Android

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or a physical device with Expo Go)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ravinder82/ExpenseMobileApp.git
   cd ExpenseMobileApp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your device:
   - Scan the QR code with the Expo Go app (iOS/Android)
   - Or press `i` for iOS Simulator / `a` for Android Emulator

## 🛠️ Tech Stack

- **Frontend**: React Native, TypeScript
- **UI Components**: React Native Reanimated, React Native Gesture Handler
- **Navigation**: React Navigation
- **State Management**: React Context API
- **Notifications**: Expo Notifications
- **Styling**: React Native StyleSheet
- **Build Tool**: Expo CLI

## 📂 Project Structure

```
ExpenseMobileApp/
├── assets/            # Images, fonts, and other static files
├── components/        # Reusable UI components
│   ├── BentoGrid.tsx  # Grid layout component
│   ├── BentoCard.tsx  # Card component for expenses
│   └── GradientCard.tsx # Gradient-styled card component
├── services/          # Business logic and API calls
│   └── notificationService.ts # Notification handling
├── design/            # Design system (colors, typography, etc.)
├── App.tsx            # Main application component
└── package.json       # Project dependencies and scripts
```

## 🔧 Configuration

Create a `.env` file in the root directory with the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_URL=your_gemini_api_url
```

## 📝 Scripts

- `start`: Start the development server
- `android`: Run on Android
- `ios`: Run on iOS
- `web`: Run on web
- `test`: Run tests
- `lint`: Run ESLint
- `type-check`: Run TypeScript type checking

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development experience
- [React Native](https://reactnative.dev/) for cross-platform development
- All contributors who have helped improve this project
