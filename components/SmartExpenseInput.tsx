import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import aiService from '../services/aiService';
import { GlassCard } from './GlassCard';
import { Colors } from '../design/colors';
import { Typography } from '../design/typography';
import { Layout } from '../design/layout';

interface SmartExpenseInputProps {
  onAddExpense: (expense: { description: string; amount: number; category: string }) => void;
}

const SmartExpenseInput: React.FC<SmartExpenseInputProps> = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [aiPrediction, setAiPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Other'];

  useEffect(() => {
    const handler = setTimeout(() => {
      if (description.length > 3) {
        handleSmartPrediction();
      }
    }, 500); // Debounce API call

    return () => {
      clearTimeout(handler);
    };
  }, [description]);

  const handleSmartPrediction = async () => {
    if (description.length < 3) return;
    
    setLoading(true);
    try {
      const prediction = await aiService.predictExpense(description);
      setAiPrediction(prediction);
      if (prediction.confidence > 0.7) {
        setAmount(prediction.amount.toString());
        setCategory(prediction.category);
      }
    } catch (error) {
      console.error('AI prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = () => {
    if (description.trim() && amount.trim() && category) {
      onAddExpense({
        description,
        amount: parseFloat(amount),
        category,
      });
      setDescription('');
      setAmount('');
      setCategory('');
      setAiPrediction(null);
    }
  };

  return (
    <GlassCard style={styles.container}>
      <Text style={styles.title}>Smart Expense Input</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Describe your expense (e.g., 'Coffee with Jane')"
        placeholderTextColor={Colors.textSecondary}
        value={description}
        onChangeText={setDescription}
      />
      
      {loading && (
        <View style={styles.predictionContainer}>
            <ActivityIndicator color={Colors.accent} />
            <Text style={styles.loadingText}>AI is thinking...</Text>
        </View>
      )}

      {aiPrediction && !loading && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionText}>
            AI suggests: {aiPrediction.category} - ${aiPrediction.amount}
          </Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor={Colors.textSecondary}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, category === cat && styles.selectedCategory]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.categoryText, category === cat && styles.selectedCategoryText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Smart Expense</Text>
      </TouchableOpacity>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.sm,
  },
  title: {
    ...Typography.style.subheading,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: Colors.textPrimary,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.radius.md,
    marginBottom: Layout.spacing.md,
    fontSize: Typography.size.base,
    fontFamily: Typography.font.primary,
    fontWeight: Typography.weight.medium,
  },
  predictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: Layout.spacing.sm,
    borderRadius: Layout.radius.md,
    marginBottom: Layout.spacing.md,
  },
  predictionText: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.font.primary,
    color: Colors.accent,
  },
  loadingText: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.font.primary,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.sm,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: Layout.spacing.lg,
  },
  categoryButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.lg,
    margin: Layout.spacing.xs,
    borderRadius: Layout.radius.xl,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  selectedCategory: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  categoryText: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.font.primary,
    color: Colors.textSecondary,
  },
  selectedCategoryText: {
    color: Colors.accentText,
  },
  button: {
    backgroundColor: Colors.accent,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: Layout.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    // Glow effect
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: Colors.accentText,
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    fontFamily: Typography.font.primary,
  },
});

export default SmartExpenseInput;
