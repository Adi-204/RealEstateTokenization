import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, LineChart, Building2, History, ArrowUpRight, TrendingUp, DollarSign, Users } from 'lucide-react';

const Dashboard = () => {
  const portfolioStats = {
    totalValue: '125,000',
    totalTokens: '50,000',
    properties: '3',
    profit: '+12.5%'
  };

  const recentTransactions = [
    { id: 1, type: 'Buy', property: 'Luxury Apartment', amount: '10,000', date: '2024-03-15' },
    { id: 2, type: 'Sell', property: 'Office Space', amount: '5,000', date: '2024-03-14' },
    { id: 3, type: 'Stake', property: 'Retail Complex', amount: '15,000', date: '2024-03-13' }
  ];

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gradient-radial from-slate-800 to-slate-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Dashboard Overview
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <Wallet className="h-6 w-6 text-blue-400" />, label: 'Portfolio Value', value: `$${portfolioStats.totalValue}`, color: 'blue' },
            { icon: <Building2 className="h-6 w-6 text-purple-400" />, label: 'Total Tokens', value: portfolioStats.totalTokens, color: 'purple' },
            { icon: <LineChart className="h-6 w-6 text-green-400" />, label: 'Properties', value: portfolioStats.properties, color: 'green' },
            { icon: <TrendingUp className="h-6 w-6 text-yellow-400" />, label: 'Profit', value: portfolioStats.profit, color: 'yellow' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-${stat.color}-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-${stat.color}-500/10`}
            >
              <div className="flex items-center justify-between">
                <div className="bg-slate-700/50 p-3 rounded-lg">{stat.icon}</div>
                <ArrowUpRight className={`h-5 w-5 text-${stat.color}-400`} />
              </div>
              <p className="mt-4 text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <History className="h-5 w-5 text-blue-400" />
              Recent Transactions
            </h2>
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div>
                    <p className="font-medium">{tx.property}</p>
                    <p className="text-sm text-gray-400">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${tx.type === 'Buy' ? 'text-green-400' : tx.type === 'Sell' ? 'text-red-400' : 'text-blue-400'}`}>
                      {tx.type === 'Buy' ? '+' : tx.type === 'Sell' ? '-' : ''}{tx.amount} USDT
                    </p>
                    <p className="text-sm text-gray-400">{tx.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <LineChart className="h-5 w-5 text-green-400" />
              Portfolio Distribution
            </h2>
            <div className="space-y-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-400 bg-blue-900/50">
                      Residential
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-400">
                      40%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '40%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  />
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-400 bg-purple-900/50">
                      Commercial
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-400">
                      35%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '35%' }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                  />
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-400 bg-green-900/50">
                      Industrial
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-400">
                      25%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '25%' }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;