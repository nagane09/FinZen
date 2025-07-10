import React from 'react';
import { AlertTriangle, TrendingUp, CheckCircle, Lightbulb } from 'lucide-react';
import { FinancialInsight } from '../types/financial';

interface InsightCardProps {
  insight: FinancialInsight;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getInsightIcon = () => {
    switch (insight.type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'opportunity':
        return <TrendingUp className="h-5 w-5" />;
      case 'achievement':
        return <CheckCircle className="h-5 w-5" />;
      case 'recommendation':
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getInsightColor = () => {
    switch (insight.type) {
      case 'warning':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'opportunity':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'achievement':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'recommendation':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
  };

  const getImpactBadge = () => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (insight.impact) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800`;
    }
  };

  return (
    <div className={`rounded-xl p-4 border-2 ${getInsightColor()}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {getInsightIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{insight.title}</h3>
            <span className={getImpactBadge()}>
              {insight.impact} impact
            </span>
          </div>
          <p className="text-sm opacity-90">{insight.description}</p>
        </div>
      </div>
    </div>
  );
};