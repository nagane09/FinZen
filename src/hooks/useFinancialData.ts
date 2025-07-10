import { useState, useEffect } from 'react';
import { FinancialData, ChatMessage, FinancialInsight } from '../types/financial';

// Mock data for demo purposes - in production, this would connect to Fi's MCP Server
const mockFinancialData: FinancialData = {
  netWorth: 2850000,
  assets: {
    cash: 450000,
    investments: 1800000,
    realEstate: 3200000,
    epf: 680000,
    other: 150000
  },
  liabilities: {
    homeLoan: 2800000,
    personalLoan: 0,
    creditCard: 45000,
    other: 85000
  },
  creditScore: 782,
  monthlyIncome: 120000,
  monthlyExpenses: 65000,
  investments: [
    {
      id: '1',
      name: 'Axis Bluechip Fund',
      type: 'mutual_fund',
      currentValue: 485000,
      investedAmount: 420000,
      returns: 65000,
      returnsPercentage: 15.48,
      marketComparison: 2.3
    },
    {
      id: '2',
      name: 'HDFC Top 100 Fund',
      type: 'mutual_fund',
      currentValue: 320000,
      investedAmount: 300000,
      returns: 20000,
      returnsPercentage: 6.67,
      marketComparison: -4.2
    },
    {
      id: '3',
      name: 'Reliance Industries',
      type: 'stocks',
      currentValue: 145000,
      investedAmount: 125000,
      returns: 20000,
      returnsPercentage: 16.0,
      marketComparison: 3.8
    }
  ],
  goals: [
    {
      id: '1',
      name: 'Retirement Fund',
      targetAmount: 10000000,
      currentAmount: 1200000,
      targetDate: '2045-12-31',
      monthlyContribution: 25000,
      priority: 'high'
    },
    {
      id: '2',
      name: 'Emergency Fund',
      targetAmount: 600000,
      currentAmount: 450000,
      targetDate: '2025-06-30',
      monthlyContribution: 10000,
      priority: 'high'
    }
  ]
};

const mockInsights: FinancialInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Optimize Your Tax Savings',
    description: 'You can save ₹45,000 more in taxes by maxing out your 80C deductions.',
    impact: 'high',
    category: 'tax'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Underperforming Investment',
    description: 'HDFC Top 100 Fund is underperforming the market by 4.2%. Consider reviewing.',
    impact: 'medium',
    category: 'investment'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Excellent Credit Score',
    description: 'Your credit score of 782 is excellent! You qualify for the best interest rates.',
    impact: 'high',
    category: 'credit'
  }
];

export const useFinancialData = () => {
  const [data, setData] = useState<FinancialData | null>(null);
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to Fi's MCP Server
    const fetchData = async () => {
      try {
        setLoading(true);
        // In production, this would be:
        // const response = await fiMCPClient.getFinancialData();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockFinancialData);
        setInsights(mockInsights);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch financial data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setData(mockFinancialData);
    setInsights(mockInsights);
    setLoading(false);
  };

  return {
    data,
    insights,
    loading,
    error,
    refreshData
  };
};

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI financial advisor. I can help you with questions about your investments, debt optimization, financial goals, and more. What would you like to know?',
      timestamp: new Date(),
      suggestions: [
        'How is my portfolio performing?',
        'Can I afford a ₹50L home loan?',
        'What are my tax saving options?',
        'How much will I have at retirement?'
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response - in production, this would call Gemini API
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = generateMockResponse(content);
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: aiResponse.content,
      timestamp: new Date(),
      suggestions: aiResponse.suggestions
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  return {
    messages,
    isTyping,
    sendMessage
  };
};

const generateMockResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('portfolio') || message.includes('performing')) {
    return {
      content: 'Your portfolio is performing well overall! Your total investment value is ₹19.5L with returns of ₹1.05L (5.4%). Axis Bluechip Fund is your top performer at 15.48% returns, outperforming the market by 2.3%. However, HDFC Top 100 Fund is underperforming by 4.2% - you might want to review this allocation.',
      suggestions: ['Should I rebalance my portfolio?', 'Which funds should I consider?', 'How to optimize my SIPs?']
    };
  }
  
  if (message.includes('loan') || message.includes('afford')) {
    return {
      content: 'Based on your current financials, you can afford a ₹50L home loan. With your monthly income of ₹1.2L and expenses of ₹65K, your EMI capacity is around ₹40K. A ₹50L loan at 8.5% for 20 years would have an EMI of ₹43K, which is within your capacity but tight. Consider a longer tenure or higher down payment to reduce EMI.',
      suggestions: ['What EMI can I comfortably afford?', 'How much down payment should I make?', 'Compare different loan tenures']
    };
  }
  
  if (message.includes('tax') || message.includes('saving')) {
    return {
      content: 'You have excellent tax saving opportunities! You can save an additional ₹45,000 in taxes by maximizing your 80C deductions. Currently, your EPF contribution is ₹6.8L. Consider investing in ELSS mutual funds, PPF, or life insurance to reach the ₹1.5L limit. Also, explore 80D for health insurance premiums.',
      suggestions: ['Which ELSS funds are best?', 'Should I invest in PPF or ELSS?', 'How much can I save with NPS?']
    };
  }
  
  if (message.includes('retirement') || message.includes('40')) {
    return {
      content: 'Based on your current savings rate and investment performance, you\'re on track for a comfortable retirement! With your monthly contribution of ₹25K to retirement funds and current corpus of ₹12L, you\'ll have approximately ₹8.2 crores by age 60, assuming 12% annual returns. At 40, you\'ll likely have around ₹3.8 crores.',
      suggestions: ['How to accelerate my retirement savings?', 'Should I increase my SIP amount?', 'What about inflation impact?']
    };
  }
  
  return {
    content: 'I can help you with various financial questions including portfolio analysis, loan eligibility, tax optimization, retirement planning, and investment recommendations. What specific area would you like to explore?',
    suggestions: ['Analyze my investments', 'Check loan eligibility', 'Tax saving options', 'Retirement planning']
  };
};