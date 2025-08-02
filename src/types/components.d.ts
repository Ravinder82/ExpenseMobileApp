import React from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
  }
}

declare module '../components/BentoCard' {
  export interface BentoCardProps {
    children: React.ReactNode;
    size: 'small' | 'medium' | 'wide' | 'full';
    variant: 'elevated' | 'glass' | 'gradient';
    style?: React.CSSProperties;
  }
  const BentoCard: React.FC<BentoCardProps>;
  export default BentoCard;
}

declare module '../components/GradientCard' {
  export interface GradientCardProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }
  const GradientCard: React.FC<GradientCardProps>;
  export default GradientCard;
}

declare module '../components/GlassCard' {
  export interface GlassCardProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }
  const GlassCard: React.FC<GlassCardProps>;
  export default GlassCard;
}
