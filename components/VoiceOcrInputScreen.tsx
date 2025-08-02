import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Colors } from '../design/colors';
import { Typography } from '../design/typography';
import { Layout } from '../design/layout';

type ExpenseData = {
  amount: string;
  description: string;
  date: string;
};

export const VoiceOcrInputScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    amount: '560',
    description: 'Swiggy',
    date: '2 Aug',
  });

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleCamera = () => {
    // In a real app, this would open the camera
    // For now, we'll just show the preview modal with sample data
    setShowPreview(true);
  };

  const handleSave = () => {
    // In a real app, this would save the expense data
    setShowPreview(false);
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Expense</Text>
      
      {/* Voice Recording Button */}
      <TouchableOpacity 
        style={[styles.micButton, isRecording && styles.micButtonRecording]} 
        onPress={handleRecord}
      >
        <Text style={styles.micIcon}>🎤</Text>
      </TouchableOpacity>
      
      <Text style={styles.instructionText}>
        {isRecording ? 'Listening...' : 'Tap microphone to record expense details'}
      </Text>
      
      {/* Camera Button */}
      <TouchableOpacity style={styles.cameraButton} onPress={handleCamera}>
        <Text style={styles.cameraIcon}>📷</Text>
        <Text style={styles.cameraButtonText}>Scan Receipt</Text>
      </TouchableOpacity>
      
      {/* Preview Modal */}
      <Modal
        visible={showPreview}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Expense Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Amount</Text>
              <TextInput
                style={styles.input}
                value={expenseData.amount}
                onChangeText={(text) => setExpenseData({...expenseData, amount: text})}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.input}
                value={expenseData.description}
                onChangeText={(text) => setExpenseData({...expenseData, description: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date</Text>
              <TextInput
                style={styles.input}
                value={expenseData.date}
                onChangeText={(text) => setExpenseData({...expenseData, date: text})}
              />
            </View>
            
            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowPreview(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.lg,
    flexGrow: 1,
  },
  header: {
    ...Typography.style.screenTitle,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xl,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  micButtonRecording: {
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  micIcon: {
    fontSize: Typography.size.xl,
  },
  instructionText: {
    ...Typography.style.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.radius.md,
  },
  cameraIcon: {
    fontSize: Typography.size.lg,
    marginRight: Layout.spacing.sm,
  },
  cameraButtonText: {
    ...Typography.style.button,
    color: Colors.textPrimary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.lg,
    width: '80%',
  },
  modalTitle: {
    ...Typography.style.subheading,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.lg,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: Layout.spacing.md,
  },
  inputLabel: {
    ...Typography.style.caption,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.xs,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: Layout.radius.sm,
    padding: Layout.spacing.md,
    color: Colors.textPrimary,
    ...Typography.style.body,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.lg,
  },
  modalButton: {
    flex: 1,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.sm,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.danger,
    marginRight: Layout.spacing.sm,
  },
  cancelButtonText: {
    color: Colors.textPrimary,
    fontWeight: Typography.weight.bold,
  },
  saveButton: {
    backgroundColor: Colors.accent,
    marginLeft: Layout.spacing.sm,
  },
  saveButtonText: {
    color: Colors.accentText,
    fontWeight: Typography.weight.bold,
  },
});
