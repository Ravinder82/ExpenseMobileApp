import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Animated } from 'react-native';
import SmartExpenseInput from './components/SmartExpenseInput';
import { BentoCard } from './components/BentoCard';
import { BentoGrid } from './components/BentoGrid';
import { GlassCard } from './components/GlassCard';
import { GradientCard } from './components/GradientCard';
import { Colors } from './design/colors';
import { Typography } from './design/typography';
import { Layout } from './design/layout';
import { Icons } from './design/icons';
import { CustomTabBar } from './components/CustomTabBar';
import { AnalyticsView } from './components/AnalyticsView';
import { VoiceOcrInputScreen } from './components/VoiceOcrInputScreen';
import { ChatScreen } from './components/ChatScreen';
import React, { useState, useEffect } from 'react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Lunch at office',
      amount: 120,
      category: 'Food',
      date: new Date(),
    },
    {
      id: '2',
      description: 'Uber ride',
      amount: 80,
      category: 'Transport',
      date: new Date(),
    },
  ]);

  const [activeTab, setActiveTab] = useState('Home');
  const [cardAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(cardAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAddExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <ScrollView 
            style={styles.scrollContainer} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header with Gradient */}
            <Animated.View style={{
              opacity: cardAnimation,
              transform: [{
                translateY: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0]
                })
              }]
            }}>
              <GradientCard style={styles.enhancedHeaderCard}>
                <Text style={styles.enhancedHeaderTitle}>{Icons.money} Expense Tracker</Text>
                <Text style={styles.enhancedSubtitle}>AI-Powered Expense Management</Text>
                <View style={styles.headerStats}>
                  <Text style={styles.headerStatsText}>Today: ${expenses.filter(e => 
                    new Date(e.date).toDateString() === new Date().toDateString()
                  ).reduce((sum, e) => sum + e.amount, 0).toFixed(2)}</Text>
                </View>
              </GradientCard>
            </Animated.View>

            {/* Smart Expense Input with Enhanced Styling */}
            <Animated.View style={{
              opacity: cardAnimation,
              transform: [{
                translateY: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0]
                })
              }]
            }}>
              <BentoCard size="wide" variant="elevated" style={styles.enhancedInputCard}>
                <SmartExpenseInput onAddExpense={handleAddExpense} />
              </BentoCard>
            </Animated.View>

            {/* Dynamic Stats Row */}
            <Animated.View style={{
              opacity: cardAnimation,
              transform: [{
                translateY: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                })
              }]
            }}>
              <View style={styles.statsRow}>
                {/* Total Expenses Card */}
                <BentoCard size="medium" variant="glass" style={styles.enhancedTotalCard}>
                  <View style={styles.cardIconHeader}>
                    <Text style={styles.cardIcon}>💰</Text>
                    <Text style={styles.cardLabel}>Total</Text>
                  </View>
                  <Text style={styles.enhancedAmount}>${totalExpenses.toFixed(2)}</Text>
                  <Text style={styles.cardSubtext}>All time</Text>
                </BentoCard>

                {/* Statistics Summary Card */}
                <BentoCard size="medium" variant="glass" style={styles.enhancedStatsCard}>
                  <View style={styles.cardIconHeader}>
                    <Text style={styles.cardIcon}>📊</Text>
                    <Text style={styles.cardLabel}>Entries</Text>
                  </View>
                  <Text style={styles.enhancedAmount}>{expenses.length}</Text>
                  <Text style={styles.cardSubtext}>This month</Text>
                </BentoCard>
              </View>
            </Animated.View>

            {/* Quick Actions */}
            <Animated.View style={{
              opacity: cardAnimation,
              transform: [{
                translateY: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [60, 0]
                })
              }]
            }}>
              <View style={styles.quickActionsRow}>
                <TouchableOpacity style={styles.quickActionCard} onPress={() => setActiveTab('Add')}>
                  <Text style={styles.quickActionIcon}>🎤</Text>
                  <Text style={styles.quickActionText}>Voice Add</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.quickActionCard} onPress={() => setActiveTab('Insights')}>
                  <Text style={styles.quickActionIcon}>📈</Text>
                  <Text style={styles.quickActionText}>Analytics</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.quickActionCard}>
                  <Text style={styles.quickActionIcon}>📷</Text>
                  <Text style={styles.quickActionText}>Scan Receipt</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Enhanced Expenses Section */}
            <Animated.View style={{
              opacity: cardAnimation,
              transform: [{
                translateY: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [70, 0]
                })
              }]
            }}>
              <BentoCard size="wide" variant="elevated" style={styles.enhancedExpensesCard}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.enhancedSectionTitle}>Recent Expenses</Text>
                  <TouchableOpacity style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See All</Text>
                  </TouchableOpacity>
                </View>
                
                {expenses.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>💸</Text>
                    <Text style={styles.emptyTitle}>No expenses yet</Text>
                    <Text style={styles.emptySubtext}>Start tracking your expenses above!</Text>
                  </View>
                ) : (
                  expenses.slice(0, 5).map((expense, index) => (
                    <View key={expense.id} style={styles.enhancedExpenseItem}>
                      <View style={styles.enhancedExpenseRow}>
                        {/* Enhanced Left Icon */}
                        <View style={styles.enhancedCategoryIcon}>
                          <Text style={styles.categoryIconText}>{getCategoryIcon(expense.category)}</Text>
                        </View>
                        
                        {/* Enhanced Center Text Block */}
                        <View style={styles.enhancedExpenseText}>
                          <Text style={styles.enhancedExpenseDescription} numberOfLines={1}>
                            {expense.description}
                          </Text>
                          <Text style={styles.enhancedExpenseDate}>
                            {expense.date.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Text>
                        </View>
                        
                        {/* Enhanced Right Amount */}
                        <View style={styles.amountContainer}>
                          <Text style={styles.enhancedExpenseAmount}>-${expense.amount.toFixed(2)}</Text>
                          <Text style={styles.expenseCategory}>{expense.category}</Text>
                        </View>
                      </View>
                      
                      {/* Enhanced Divider */}
                      {index < Math.min(expenses.length - 1, 4) && <View style={styles.enhancedDivider} />}
                    </View>
                  ))
                )}
              </BentoCard>
            </Animated.View>
          </ScrollView>
        );
      case 'Insights':
        return <AnalyticsView />;
      case 'Add':
        return <VoiceOcrInputScreen />;
      case 'Chat':
        return <ChatScreen expenses={expenses} />;
      case 'Profile':
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Profile</Text>
            <Text style={styles.screenContent}>Profile functionality would go here</Text>
          </View>
        );
      default:
        return (
          <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <BentoCard size="wide" variant="glass" style={styles.headerCard}>
              <Text style={styles.headerTitle}>{Icons.money} Expense Tracker</Text>
              <Text style={styles.subtitle}>AI-Powered Expense Management</Text>
            </BentoCard>

            {/* Smart Expense Input */}
            <Animated.View style={{
                  opacity: cardAnimation,
                  transform: [
                    {
                      translateY: cardAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                }}>
                  <BentoCard size="wide" variant="elevated">
              <SmartExpenseInput onAddExpense={handleAddExpense} />
            </BentoCard>
            </Animated.View>

            {/* Total Expenses Card */}
            <BentoCard size="medium" variant="glass" style={styles.totalExpensesCard}>
              <Text style={styles.totalExpensesLabel}>📊 Total Expenses</Text>
              <Text style={styles.totalExpensesAmount}>${totalExpenses.toFixed(2)}</Text>
            </BentoCard>

            {/* Statistics Summary Card */}
            <BentoCard size="medium" variant="glass" style={styles.statsCard}>
              <Text style={styles.statsLabel}>✨ Statistics</Text>
              <Text style={styles.statsValue}>{expenses.length} Expenses</Text>
            </BentoCard>

            {/* Expenses Section */}
            <BentoCard size="wide" variant="elevated" style={{marginBottom: Layout.spacing.md}}>
              <Text style={styles.sectionTitle}>{Icons.calendar} Recent Expenses</Text>
              {expenses.length === 0 ? (
                <Text style={styles.emptyText}>No expenses yet. Add your first expense above!</Text>
              ) : (
                expenses.map((expense, index) => (
                  <View key={expense.id} style={styles.expenseItem}>
                    <View style={styles.expenseRow}>
                      {/* Left Icon */}
                      <View style={styles.categoryIconContainer}>
                        <Text style={styles.categoryIcon}>{getCategoryIcon(expense.category)}</Text>
                      </View>
                      
                      {/* Center Text Block */}
                      <View style={styles.expenseTextContainer}>
                        <Text style={styles.expenseDescription} numberOfLines={1}>{expense.description}</Text>
                        <Text style={styles.expenseDate}>{expense.date.toLocaleDateString()}</Text>
                      </View>
                      
                      {/* Right Amount */}
                      <Text style={styles.expenseAmount}>${expense.amount.toFixed(2)}</Text>
                    </View>
                    
                    {/* Divider */}
                    {index < expenses.length - 1 && <View style={styles.divider} />}
                  </View>
                ))
              )}
            </BentoCard>
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      <CustomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: Layout.spacing.lg,
  },
  headerCard: {
    marginBottom: Layout.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  statsCard: {
    flex: 1,
    marginRight: Layout.spacing.md,
    marginBottom: 0,
    height: 100,
    borderRadius: Layout.radius.lg,
    backgroundColor: Colors.card,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: Layout.spacing.md,
  },
  statsCardLast: {
    flex: 1,
    marginBottom: 0,
  },
  totalExpensesCard: {
    flex: 1,
    marginRight: Layout.spacing.md,
    marginBottom: 0,
    height: 100,
    borderRadius: Layout.radius.lg,
    backgroundColor: Colors.card,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: Layout.spacing.md,
  },
  headerTitle: {
    ...Typography.style.screenTitle,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    ...Typography.style.screenSubtitle,
    color: Colors.textSecondary,
    opacity: 0.8,
  },
  totalExpensesLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  totalExpensesAmount: {
    fontSize: Typography.size.amount,
    fontWeight: Typography.weight.bold,
    color: Colors.accent,
  },
  statsLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  statsValue: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.accent,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.lg,
  },
  screenTitle: {
    ...Typography.style.screenTitle,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.md,
  },
  screenContent: {
    ...Typography.style.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  // Enhanced Home Screen Styles
  enhancedHeaderCard: {
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.lg,
  },
  enhancedHeaderTitle: {
    ...Typography.style.screenTitle,
    color: Colors.textPrimary,
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    marginBottom: Layout.spacing.xs,
  },
  enhancedSubtitle: {
    ...Typography.style.body,
    color: Colors.textSecondary,
    opacity: 0.9,
    marginBottom: Layout.spacing.md,
  },
  headerStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.sm,
  },
  headerStatsText: {
    ...Typography.style.caption,
    color: Colors.textPrimary,
    fontWeight: Typography.weight.medium,
  },
  enhancedInputCard: {
    marginBottom: Layout.spacing.lg,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  enhancedTotalCard: {
    flex: 1,
    marginRight: Layout.spacing.sm,
    padding: Layout.spacing.md,
    minHeight: 120,
  },
  enhancedStatsCard: {
    flex: 1,
    marginLeft: Layout.spacing.sm,
    padding: Layout.spacing.md,
    minHeight: 120,
  },
  cardIconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  cardIcon: {
    fontSize: Typography.size.lg,
    marginRight: Layout.spacing.xs,
  },
  cardLabel: {
    ...Typography.style.caption,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  enhancedAmount: {
    ...Typography.style.heading,
    color: Colors.accent,
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    marginBottom: Layout.spacing.xs,
  },
  cardSubtext: {
    ...Typography.style.caption,
    color: Colors.textSecondary,
    fontSize: Typography.size.xs,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.xs,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    alignItems: 'center',
    marginHorizontal: Layout.spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickActionIcon: {
    fontSize: Typography.size.xl,
    marginBottom: Layout.spacing.xs,
  },
  quickActionText: {
    ...Typography.style.caption,
    color: Colors.textSecondary,
    fontSize: Typography.size.xs,
    textAlign: 'center',
  },
  enhancedExpensesCard: {
    marginBottom: Layout.spacing.xl,
    padding: Layout.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  enhancedSectionTitle: {
    ...Typography.style.subheading,
    color: Colors.textPrimary,
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
  },
  seeAllButton: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
  },
  seeAllText: {
    ...Typography.style.button,
    color: Colors.accent,
    fontSize: Typography.size.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Layout.spacing.md,
  },
  emptyTitle: {
    ...Typography.style.subheading,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xs,
  },
  emptySubtext: {
    ...Typography.style.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  enhancedExpenseItem: {
    marginBottom: Layout.spacing.sm,
  },
  enhancedExpenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
  },
  enhancedCategoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  categoryIconText: {
    fontSize: Typography.size.lg,
  },
  enhancedExpenseText: {
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  enhancedExpenseDescription: {
    ...Typography.style.body,
    color: Colors.textPrimary,
    fontWeight: Typography.weight.medium,
    marginBottom: Layout.spacing.xs,
  },
  enhancedExpenseDate: {
    ...Typography.style.caption,
    color: Colors.textSecondary,
    fontSize: Typography.size.xs,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  enhancedExpenseAmount: {
    ...Typography.style.body,
    color: Colors.danger,
    fontWeight: Typography.weight.bold,
    fontSize: Typography.size.base,
  },
  expenseCategory: {
    ...Typography.style.caption,
    color: Colors.textSecondary,
    fontSize: Typography.size.xs,
    marginTop: Layout.spacing.xs,
  },
  enhancedDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Layout.spacing.sm,
    opacity: 0.5,
  },
  sectionTitle: {
    ...Typography.style.subheading,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.md,
  },
  emptyText: {
    ...Typography.style.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Layout.spacing.lg,
    fontStyle: 'italic',
  },
  expenseItem: {
    padding: Layout.spacing.sm,
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    padding: Layout.spacing.md,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  categoryIcon: {
    fontSize: Typography.size.lg,
  },
  expenseTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  expenseDescription: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xs,
  },
  expenseAmount: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.accent,
  },
  divider: {
    height: 1,
    backgroundColor: '#2D2D2D',
    marginTop: Layout.spacing.sm,
  },
  expenseDate: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  deleteButton: {
    padding: Layout.spacing.sm,
    borderRadius: Layout.radius.md,
    backgroundColor: Colors.danger,
    alignSelf: 'flex-end',
    marginTop: Layout.spacing.sm,
  },
  deleteButtonText: {
    ...Typography.style.button,
    color: Colors.textPrimary,
  },
});

// Helper function for category icons
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return Icons.food;
    case 'transport':
      return Icons.transport;
    case 'shopping':
      return Icons.shopping;
    case 'entertainment':
      return Icons.entertainment;
    case 'bills':
      return Icons.bills;
    default:
      return Icons.other;
  }
};
