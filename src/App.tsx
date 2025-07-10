import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  Target, 
  RefreshCw,
  Download,
  Settings,
  Bell
} from 'lucide-react';
import { useFinancialData } from './hooks/useFinancialData';
import { LoadingSpinner } from './components/LoadingSpinner';
import { DashboardCard } from './components/DashboardCard';
import { InvestmentCard } from './components/InvestmentCard';
import { GoalCard } from './components/GoalCard';
import { InsightCard } from './components/InsightCard';
import { ChatInterface } from './components/ChatInterface';

function App() {
  const { data, insights, loading, error, refreshData } = useFinancialData();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalAssets = Object.values(data.assets).reduce((sum, value) => sum + value, 0);
  const totalLiabilities = Object.values(data.liabilities).reduce((sum, value) => sum + value, 0);
  const monthlysurplus = data.monthlyIncome - data.monthlyExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FinZen</h1>
                <p className="text-sm text-gray-600">Your Personal Financial Advisor</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refreshData}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Net Worth"
            value={formatCurrency(data.netWorth)}
            change="+12.5%"
            changeType="positive"
            icon={Wallet}
          />
          <DashboardCard
            title="Total Assets"
            value={formatCurrency(totalAssets)}
            change="+8.3%"
            changeType="positive"
            icon={TrendingUp}
          />
          <DashboardCard
            title="Credit Score"
            value={data.creditScore.toString()}
            change="+15 pts"
            changeType="positive"
            icon={CreditCard}
          />
          <DashboardCard
            title="Monthly Surplus"
            value={formatCurrency(monthlysurplus)}
            change="+₹5,000"
            changeType="positive"
            icon={Target}
          />
        </div>

        {/* Insights */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Investments */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Portfolio</h2>
              <div className="space-y-4">
                {data.investments.map((investment) => (
                  <InvestmentCard key={investment.id} investment={investment} />
                ))}
              </div>
            </div>

            {/* Goals */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Goals</h2>
              <div className="space-y-4">
                {data.goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Chat Interface */}
          <div>
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
