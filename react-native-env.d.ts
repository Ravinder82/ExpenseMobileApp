/// <reference types="react" />
/// <reference types="react-native" />

declare module 'react-native' {
  import * as React from 'react';
  
  export const View: React.ComponentType<any>;
  export const Text: React.ComponentType<any>;
  export const TextInput: React.ComponentType<any>;
  export const StyleSheet: any;
  export const SafeAreaView: React.ComponentType<any>;
  export const ScrollView: React.ComponentType<any>;
  export const TouchableOpacity: React.ComponentType<any>;
  export const ActivityIndicator: React.ComponentType<any>;
  export const Modal: React.ComponentType<any>;
  
  export namespace Animated {
    export const View: React.ComponentType<any>;
    export const Text: React.ComponentType<any>;
    export const Image: React.ComponentType<any>;
    export const ScrollView: React.ComponentType<any>;
    
    export interface AnimatedInterpolation {
      interpolate(config: {
        inputRange: number[];
        outputRange: number[] | string[];
        extrapolate?: 'extend' | 'clamp' | 'identity';
      }): AnimatedInterpolation;
    }
    
    export class Value implements AnimatedInterpolation {
      constructor(value: number);
      setValue(value: number): void;
      setOffset(offset: number): void;
      flattenOffset(): void;
      addListener(callback: (value: { value: number }) => void): string;
      removeListener(id: string): void;
      removeAllListeners(): void;
      stopAnimation(callback?: (value: number) => void): void;
      resetAnimation(callback?: (value: number) => void): void;
      interpolate(config: {
        inputRange: number[];
        outputRange: number[] | string[];
        extrapolate?: 'extend' | 'clamp' | 'identity';
      }): AnimatedInterpolation;
    }
    
    export class AnimatedValue extends Value {
      setValue(value: number): void;
      interpolate(config: {
        inputRange: number[];
        outputRange: number[] | string[];
        extrapolate?: 'extend' | 'clamp' | 'identity';
      }): AnimatedInterpolation;
    }
    
    export class AnimatedValueXY {
      x: AnimatedValue;
      y: AnimatedValue;
      setValue(value: { x: number; y: number }): void;
      setOffset(offset: { x: number; y: number }): void;
      flattenOffset(): void;
      stopAnimation(callback?: (value: { x: number; y: number }) => void): void;
      addListener(callback: (value: { x: number; y: number }) => void): string;
      removeListener(id: string): void;
      getLayout(): { [key: string]: AnimatedValue };
      getTranslateTransform(): Array<{ [key: string]: AnimatedValue }>;
      interpolate(config: {
        inputRange: number[];
        outputRange: number[] | string[];
        extrapolate?: 'extend' | 'clamp' | 'identity';
      }): AnimatedInterpolation;
    }
    
    export interface TimingAnimationConfig {
      toValue: number | AnimatedValue;
      duration: number;
      easing?: (value: number) => number;
      useNativeDriver?: boolean;
    }
    
    export function timing(
      value: AnimatedValue | AnimatedValueXY,
      config: TimingAnimationConfig
    ): CompositeAnimation;
    
    export interface CompositeAnimation {
      start: (callback?: (result: { finished: boolean }) => void) => void;
      stop: () => void;
      reset: () => void;
    }
  }
}

declare module 'react' {
  export const useState: <T>(initialState: T | (() => T)) => [T, (newState: T | ((prevState: T) => T)) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  export const useRef: <T>(initialValue: T) => { current: T };
  
  // Fix for FC type
  export type FC<P = {}> = React.FunctionComponent<P>;
}
