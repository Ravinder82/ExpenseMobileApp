import 'react-native';

declare module 'react-native' {
  namespace Animated {
    interface Animated {
      // Add any missing Animated methods or properties here
    }
    
    // Add View type if missing
    const View: React.ComponentType<any>;
  }
}
