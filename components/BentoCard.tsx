import * as React from 'react';
import { View, StyleSheet } from 'react-native';
type ViewStyle = any; // Temporary workaround for ViewStyle type
import { Colors } from '../design/colors';
import { Layout } from '../design/layout';

export interface BentoCardProps {
  children: any; // Temporary workaround for ReactNode type
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'full';
  variant?: 'default' | 'glass' | 'elevated';
  style?: ViewStyle;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  size = 'medium',
  variant = 'default',
  style,
}) => {
  const getCardStyle = () => {
    switch (size) {
      case 'small':
        return {
          minHeight: 120,
        };
      case 'medium':
        return {
          minHeight: 160,
        };
      case 'large':
        return {
          minHeight: 200,
        };
      case 'wide':
        return {
          minHeight: 140,
        };
      case 'tall':
        return {
          minHeight: 240,
        };
      case 'full':
        return {
          minHeight: 200,
        };
      default:
        return {
          minHeight: 160,
        };
    }
  };

  const cardStyle = [
    styles.base,
    styles[variant],
    getCardStyle(),
    style,
  ];

  return (
    <View style={cardStyle}>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexShrink: 1,
    borderRadius: Layout.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  default: {
    backgroundColor: Colors.card,
    ...Layout.shadows.sm,
  },
  glass: {
    backgroundColor: Colors.glass,
    borderColor: Colors.glassBorder,
    ...Layout.shadows.sm,
  },
  elevated: {
    backgroundColor: Colors.card,
    ...Layout.shadows.lg,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
  },
});
