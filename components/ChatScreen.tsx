import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../design/colors';
import { Typography } from '../design/typography';
import { Layout } from '../design/layout';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

interface ChatScreenProps {
  expenses: Expense[];
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ expenses }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you with your expenses today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim().length === 0) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Simple AI response logic
    setTimeout(() => {
      const botResponse = generateBotResponse(input, expenses);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInput('');
  };

  const generateBotResponse = (input: string, expenses: Expense[]): Message => {
    const lowerInput = input.toLowerCase();
    const totalSpending = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const transactionCount = expenses.length;

    // Check for total spending
    if (lowerInput.includes('total spending') || lowerInput.includes('how much did i spend in total')) {
      return { id: (Date.now() + 1).toString(), text: `Your total spending is $${totalSpending.toFixed(2)}.`, sender: 'bot' };
    }

    // Check for transaction count
    if (lowerInput.includes('how many transactions') || lowerInput.includes('transaction count')) {
      return { id: (Date.now() + 1).toString(), text: `You have made ${transactionCount} transactions.`, sender: 'bot' };
    }

    // Check for spending by category
    const categoryMatch = lowerInput.match(/how much.* on (\w+)/);
    if (categoryMatch && categoryMatch[1]) {
      const category = categoryMatch[1];
      const categorySpending = expenses
        .filter(e => e.category.toLowerCase() === category)
        .reduce((acc, expense) => acc + expense.amount, 0);

      if (categorySpending > 0) {
        return { id: (Date.now() + 1).toString(), text: `You spent $${categorySpending.toFixed(2)} on ${category}.`, sender: 'bot' };
      } else {
        return { id: (Date.now() + 1).toString(), text: `I couldn't find any spending for the category "${category}".`, sender: 'bot' };
      }
    }

    // Default response
    return { id: (Date.now() + 1).toString(), text: `I can answer questions about total spending, transaction counts, or spending on a specific category.`, sender: 'bot' };
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView style={styles.messagesContainer} contentContainerStyle={[styles.messagesContent, { paddingBottom: 120 }]}>
        {messages.map(msg => (
          <View key={msg.id} style={[styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your spending..."
          placeholderTextColor={Colors.textSecondary}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 120, // Increased padding to ensure no overlap with FAB
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Layout.spacing.lg,
  },
  messageBubble: {
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    marginBottom: Layout.spacing.md,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: Colors.accent,
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: Colors.card,
    alignSelf: 'flex-start',
  },
  messageText: {
    ...Typography.style.body,
    color: Colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: Layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Layout.radius.full,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    color: Colors.textPrimary,
    ...Typography.style.body,
  },
  sendButton: {
    marginLeft: Layout.spacing.md,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.radius.full,
  },
  sendButtonText: {
    ...Typography.style.button,
    color: Colors.accentText,
  },
});
