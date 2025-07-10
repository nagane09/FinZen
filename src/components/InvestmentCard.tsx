import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Investment } from '../types/financial';

interface InvestmentCardProps {
  investment: Investment;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
  const getReturnColor = () => {
    if (investment.returnsPercentage > 0) return 'text-green-600';
    if (investment.returnsPercentage < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getReturnIcon = () => {
    if (investment.returnsPercentage > 0) return <TrendingUp className="h-4 w-4" />;
    if (investment.returnsPercentage < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getMarketComparisonColor = () => {
    if (investment.marketComparison > 0) return 'text-green-600';
    if (investment.marketComparison < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{investment.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{investment.type.replace('_', ' ')}</p>
        </div>
        <div className={`flex items-center gap-1 ${getReturnColor()}`}>
          {getReturnIcon()}
          <span className="font-medium">{investment.returnsPercentage.toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Current Value</p>
          <p className="font-semibold text-gray-900">{formatCurrency(investment.currentValue)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Invested</p>
          <p className="font-semibold text-gray-900">{formatCurrency(investment.investedAmount)}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Returns</p>
          <p className={`font-semibold ${getReturnColor()}`}>{formatCurrency(investment.returns)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">vs Market</p>
          <p className={`font-semibold ${getMarketComparisonColor()}`}>
            {investment.marketComparison > 0 ? '+' : ''}{investment.marketComparison.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};