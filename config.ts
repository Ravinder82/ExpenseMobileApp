// Configuration file for API keys and environment variables
import { GEMINI_API_KEY } from '@env';

export const API_CONFIG = {
  GEMINI_API_KEY: GEMINI_API_KEY || '',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  ENABLE_AI: true,
};

// Mock AI service for development without API key
export const MOCK_AI_RESPONSES = {
  predictExpense: (description: string) => ({
    description,
    amount: Math.floor(Math.random() * 100) + 5,
    category: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Other'][Math.floor(Math.random() * 6)],
    confidence: 0.7 + Math.random() * 0.3,
  }),
  
  categorizeExpense: (description: string) => {
    const keywords = {
      'coffee|food|lunch|dinner': 'Food',
      'gas|uber|taxi|bus|train': 'Transport',
      'amazon|clothes|electronics': 'Shopping',
      'movie|concert|game': 'Entertainment',
      'electricity|internet|phone': 'Bills',
    };
    
    for (const [pattern, category] of Object.entries(keywords)) {
      if (new RegExp(pattern, 'i').test(description)) {
        return category;
      }
    }
    return 'Other';
  }
};
