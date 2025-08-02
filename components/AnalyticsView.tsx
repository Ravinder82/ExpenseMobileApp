import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Colors } from '../design/colors';
import { Typography } from '../design/typography';
import { Layout } from '../design/layout';
import { BentoCard } from './BentoCard';
import { GradientCard } from './GradientCard';

export const AnalyticsView: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [animatedValues] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValues, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  // Enhanced sample data
  const budgetData = [
    { category: 'Food', spent: 450, budget: 500, color: '#FF6B6B', icon: '🍕' },
    { category: 'Transport', spent: 120, budget: 200, color: '#4ECDC4', icon: '🚗' },
    { category: 'Shopping', spent: 380, budget: 300, color: '#45B7D1', icon: '🛍️' },
    { category: 'Entertainment', spent: 150, budget: 250, color: '#96CEB4', icon: '🎬' },
    { category: 'Bills', spent: 890, budget: 900, color: '#FFA726', icon: '💡' },
  ];
  
  const chartData = [
    { day: 'Mon', amount: 45 },
    { day: 'Tue', amount: 78 },
    { day: 'Wed', amount: 32 },
    { day: 'Thu', amount: 95 },
    { day: 'Fri', amount: 67 },
    { day: 'Sat', amount: 123 },
    { day: 'Sun', amount: 89 },
  ];

  const maxAmount = Math.max(...chartData.map(d => d.amount));
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Enhanced Header */}
      <GradientCard style={styles.headerCard}>
        <Text style={styles.headerTitle}>📊 Analytics Dashboard</Text>
        <Text style={styles.subtitle}>Smart insights for better spending</Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${totalSpent.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{((totalSpent / totalBudget) * 100).toFixed(0)}%</Text>
            <Text style={styles.statLabel}>Budget Used</Text>
          </View>
        </View>
      </GradientCard>

      {/* Budget Progress Section */}
      <BentoCard size="wide" variant="elevated" style={styles.budgetCard}>
        <Text style={styles.sectionTitle}>Budget Progress</Text>
        {budgetData.map((item, index) => {
          const percentage = (item.spent / item.budget) * 100;
          const isOverBudget = item.spent > item.budget;
          
          return (
            <Animated.View 
              key={index} 
              style={[
                styles.budgetItem,
                {
                  opacity: animatedValues,
                  transform: [{
                    translateX: animatedValues.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    })
                  }]
                }
              ]}
            >
              <View style={styles.budgetHeader}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryIcon}>{item.icon}</Text>
                  <Text style={styles.budgetCategory}>{item.category}</Text>
                </View>
                <Text style={[styles.budgetAmount, isOverBudget && styles.overBudget]}>
                  ${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}
                </Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <Animated.View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: animatedValues.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', `${Math.min(percentage, 100)}%`],
                      }),
                      backgroundColor: isOverBudget ? Colors.danger : item.color
                    }
                  ]} 
                />
              </View>
              
              <View style={styles.budgetFooter}>
                <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
                {isOverBudget && (
                  <Text style={styles.overBudgetText}>
                    ⚠️ Over by ${(item.spent - item.budget).toLocaleString()}
                  </Text>
                )}
              </View>
            </Animated.View>
          );
        })}
      </BentoCard>

      {/* Bar Chart Section */}
      <BentoCard size="wide" variant="elevated" style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Weekly Spending</Text>
        <View style={styles.chartContainer}>
          {chartData.map((item, index) => {
            const barHeight = (item.amount / maxAmount) * 120;
            
            return (
              <View key={index} style={styles.barContainer}>
                <Text style={styles.amountLabel}>${item.amount}</Text>
                <View style={styles.barWrapper}>
                  <Animated.View 
                    style={[
                      styles.bar,
                      { 
                        height: animatedValues.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, barHeight],
                        }),
                        backgroundColor: Colors.accent
                      }
                    ]}
                  />
                </View>
                <Text style={styles.dayLabel}>{item.day}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.chartCaption}>Daily spending over the past week</Text>
      </BentoCard>

      {/* AI Tips Card */}
      <BentoCard size="wide" variant="glass" style={styles.tipsCard}>
        <Text style={styles.sectionTitle}>🤖 AI Insights</Text>
        <Text style={styles.tipText}>
          You're spending 23% more on food this month. Consider meal planning to reduce costs.
        </Text>
        <TouchableOpacity style={styles.tipButton}>
          <Text style={styles.tipButtonText}>Get More Tips</Text>
        </TouchableOpacity>
      </BentoCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Layout.spacing.lg,
  },
  // Enhanced Header Styles
  headerCard: {
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.xl,
  },
  headerTitle: {
    ...Typography.style.screenTitle,
    color: Colors.textPrimary,
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    ...Typography.style.body,
    color: Colors.textSecondary,
    opacity: 0.9,
    marginBottom: Layout.spacing.lg,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.style.heading,
    color: Colors.textPrimary,
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
  },
  statLabel: {
    ...Typography.style.caption,
    color: Colors.textSecondary,
    marginTop: Layout.spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  // Enhanced Budget Styles
  budgetCard: {
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.lg,
  },
  sectionTitle: {
    ...Typography.style.subheading,
    color: Colors.textPrimary,
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    marginBottom: Layout.spacing.lg,
  },
  budgetItem: {
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: Typography.size.lg,
    marginRight: Layout.spacing.sm,
  },
  budgetCategory: {
    ...Typography.style.body,
    color: Colors.textPrimary,
    fontWeight: Typography.weight.semibold,
  },
  budgetAmount: {
    ...Typography.style.body,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  overBudget: {
    color: Colors.danger,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: Colors.border,
    borderRadius: Layout.radius.md,
    overflow: 'hidden',
    marginBottom: Layout.spacing.sm,
  },
  progressBar: {
    height: '100%',
    borderRadius: Layout.radius.md,
  },
  budgetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentageText: {
    ...Typography.style.caption,
    color: Colors.accent,
    fontWeight: Typography.weight.bold,
  },
  overBudgetText: {
    ...Typography.style.caption,
    color: Colors.danger,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.medium,
  },
  // Enhanced Chart Styles
  chartCard: {
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.lg,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Layout.spacing.xs,
  },
  amountLabel: {
    ...Typography.style.caption,
    color: Colors.textPrimary,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    marginBottom: Layout.spacing.xs,
  },
  barWrapper: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: Layout.spacing.sm,
  },
  bar: {
    width: 24,
    borderRadius: Layout.radius.sm,
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  dayLabel: {
    ...Typography.style.caption,
    color: Colors.textSecondary,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.medium,
  },
  chartCaption: {
    ...Typography.style.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Enhanced Tips Styles
  tipsCard: {
    marginBottom: Layout.spacing.xl,
    padding: Layout.spacing.lg,
  },
  tipText: {
    ...Typography.style.body,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeight.relaxed * Typography.size.base,
    marginBottom: Layout.spacing.lg,
  },
  tipButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.radius.full,
    alignSelf: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  tipButtonText: {
    ...Typography.style.button,
    color: Colors.accentText,
  },
});
