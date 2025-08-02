import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Colors } from '../design/colors';
import { Layout } from '../design/layout';

interface BentoGridProps {
  children: React.ReactNode;
  style?: any;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  style,
}) => {
  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={styles.grid}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  grid: {
    padding: Layout.spacing.lg,
    gap: Layout.spacing.md,
    alignItems: 'stretch',
  },
});
