import { API_CONFIG, MOCK_AI_RESPONSES } from '../config';

interface AIExpenseSuggestion {
  description: string;
  amount: number;
  category: string;
  confidence: number;
}

class AIService {
  private apiKey: string;
  private baseUrl: string;
  private useMock: boolean;

  constructor() {
    this.apiKey = API_CONFIG.GEMINI_API_KEY;
    this.baseUrl = API_CONFIG.GEMINI_API_URL;
    this.useMock = !API_CONFIG.ENABLE_AI || !this.apiKey;
  }

  private async makeRequest(prompt: string): Promise<any> {
    if (this.useMock) {
      // Return mock response for development
      return {
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                description: 'mock expense',
                amount: 25,
                category: 'Food',
                confidence: 0.8
              })
            }]
          }
        }]
      };
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  async predictExpense(description: string): Promise<AIExpenseSuggestion> {
    if (this.useMock) {
      return MOCK_AI_RESPONSES.predictExpense(description);
    }

    const prompt = `Analyze this expense description and predict the amount and category:
    Description: "${description}"
    
    Return JSON format:
    {
      "description": "original description",
      "amount": number,
      "category": "Food|Transport|Shopping|Entertainment|Bills|Other",
      "confidence": 0-1
    }
    
    Only return valid JSON, no additional text.`;

    try {
      const response = await this.makeRequest(prompt);
      const content = response.candidates[0].content.parts[0].text;
      const prediction = JSON.parse(content);
      return prediction;
    } catch (error) {
      return MOCK_AI_RESPONSES.predictExpense(description);
    }
  }

  async categorizeExpense(description: string): Promise<string> {
    if (this.useMock) {
      return MOCK_AI_RESPONSES.categorizeExpense(description);
    }

    const prompt = `Categorize this expense into one of these categories:
    Food, Transport, Shopping, Entertainment, Bills, Other
    
    Description: "${description}"
    
    Return only the category name.`;

    try {
      const response = await this.makeRequest(prompt);
      const category = response.candidates[0].content.parts[0].text.trim();
      return category;
    } catch (error) {
      return MOCK_AI_RESPONSES.categorizeExpense(description);
    }
  }

  async getSmartSuggestions(recentExpenses: any[]): Promise<AIExpenseSuggestion[]> {
    const prompt = `Based on these recent expenses, suggest 3 common expenses this user might have:
    ${JSON.stringify(recentExpenses)}
    
    Return JSON array format:
    [
      {
        "description": "suggested expense",
        "amount": number,
        "category": "category",
        "confidence": 0-1
      }
    ]
    
    Only return valid JSON, no additional text.`;

    try {
      const response = await this.makeRequest(prompt);
      const content = response.candidates[0].content.parts[0].text;
      const suggestions = JSON.parse(content);
      return suggestions;
    } catch (error) {
      return [
        { description: 'Coffee', amount: 5, category: 'Food', confidence: 0.8 },
        { description: 'Gas', amount: 40, category: 'Transport', confidence: 0.7 },
        { description: 'Groceries', amount: 50, category: 'Food', confidence: 0.6 }
      ];
    }
  }
}

export default new AIService();
