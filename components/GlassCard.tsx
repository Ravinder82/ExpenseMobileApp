import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../design/colors';
import { Layout } from '../design/layout';

interface GlassCardProps {
  children: React.ReactNode;
  blur?: number;
  opacity?: number;
  style?: ViewStyle;
  borderColor?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  blur = 20,
  opacity = 0.1,
  style,
  borderColor = Colors.glassBorder,
}) => {
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          borderColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    padding: 24,
    overflow: 'hidden',
    ...Layout.shadows.md,
  },
});
