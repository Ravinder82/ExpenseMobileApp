import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../design/colors';
import { Layout } from '../design/layout';

type ViewStyle = any; // Temporary workaround

export interface GradientCardProps {
  children: any; // Temporary workaround for ReactNode type
  style?: ViewStyle;
}

export const GradientCard = ({
  children,
  style,
}: {
  children: any;
  style?: any;
}) => {
  return (
    <View style={[styles.base, style]}>
      <View style={StyleSheet.absoluteFill}>
        {/* @ts-ignore */}
        <LinearGradient 
          colors={Colors.gradient} 
          style={StyleSheet.absoluteFill}
        />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Layout.radius.lg,
    overflow: 'hidden',
    ...Layout.shadows.lg,
    padding: Layout.spacing.lg,
    minHeight: 100,
  },
});
