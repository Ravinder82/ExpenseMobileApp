import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from './GlassCard';
import { Colors } from '../design/colors';
import { Layout } from '../design/layout';
import { Typography } from '../design/typography';

interface ExpenseInputProps {
  onAddExpense: (expense: { description: string; amount: number; category: string }) => void;
}

const ExpenseInput: React.FC<ExpenseInputProps> = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Other'];

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
    }
  };

  return (
    <GlassCard style={styles.container}>
      <Text style={styles.title}>Add New Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
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
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: Layout.spacing.md,
  },
  title: {
    ...Typography.style.subheading,
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
    color: Colors.textPrimary,
  },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    borderRadius: Layout.radius.md,
    color: Colors.textPrimary,
  },
  button: {
    backgroundColor: Colors.accent,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.md,
    alignItems: 'center',
  },
  buttonText: {
    ...Typography.style.button,
    color: Colors.accentText,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: Layout.spacing.md,
  },
  categoryButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    margin: Layout.spacing.xs,
  },
  selectedCategory: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  categoryText: {
    ...Typography.style.caption,
    color: Colors.textPrimary,
  },
  selectedCategoryText: {
    ...Typography.style.caption,
    color: Colors.accentText,
  },
});

export default ExpenseInput;
