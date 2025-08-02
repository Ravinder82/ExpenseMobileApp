/// <reference types="react" />
/// <reference types="react-native" />

// Add any missing type declarations here
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add any missing HTML attributes here
    className?: string;
  }
}

declare module 'react-native' {
  import { ComponentType } from 'react';
  
  namespace Animated {
    interface Animated {
      // Add any missing Animated methods or properties here
    }
    
    // Add View type
    const View: ComponentType<any>;
    const Text: ComponentType<any>;
    const Image: ComponentType<any>;
  }
}

// Add any other missing module declarations here
