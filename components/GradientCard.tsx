import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../design/colors';
import { Layout } from '../design/layout';

interface GradientCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  style,
}) => {
  return (
    <LinearGradient colors={Colors.gradient as [string, string]} style={[styles.base, style]}>
      {children}
    </LinearGradient>
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
