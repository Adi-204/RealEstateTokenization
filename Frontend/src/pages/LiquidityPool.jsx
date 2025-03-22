import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, ArrowUpDown, TrendingUp, DollarSign } from 'lucide-react';

const LiquidityPool = () => {
  const [amount, setAmount] = useState('');
  const [poolStats] = useState({
    totalLiquidity: '2,345,678',
    apr: '8.5',
    totalStakers: '1,234',
    rewardRate: '0.05',
  });

  return (
    <div className="pt-20 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Liquidity Pool</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stake your tokens to provide liquidity and earn rewards. The more you stake,
            the more you earn from transaction fees and rental income.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Staking Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold mb-6">Stake Tokens</h2>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-slate-700/50 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-sm px-3 py-1 rounded">
                  MAX
                </button>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Coins className="h-5 w-5" />
                <span>Stake Tokens</span>
              </button>

              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <ArrowUpDown className="h-5 w-5" />
                <span>Withdraw Tokens</span>
              </button>
            </div>
          </motion.div>

          {/* Pool Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm">
              <DollarSign className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-lg font-semibold">Total Liquidity</h3>
              <p className="text-2xl font-bold text-blue-400">${poolStats.totalLiquidity}</p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm">
              <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="text-lg font-semibold">APR</h3>
              <p className="text-2xl font-bold text-green-400">{poolStats.apr}%</p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm">
              <Coins className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="text-lg font-semibold">Total Stakers</h3>
              <p className="text-2xl font-bold text-purple-400">{poolStats.totalStakers}</p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm">
              <ArrowUpDown className="h-8 w-8 text-yellow-500 mb-2" />
              <h3 className="text-lg font-semibold">Reward Rate</h3>
              <p className="text-2xl font-bold text-yellow-400">{poolStats.rewardRate} ETH/day</p>
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Address</th>
                  <th className="pb-4">Time</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-700">
                  <td className="py-4">Stake</td>
                  <td className="py-4">150 ETH</td>
                  <td className="py-4">0x1234...5678</td>
                  <td className="py-4">2 mins ago</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="py-4">Withdraw</td>
                  <td className="py-4">50 ETH</td>
                  <td className="py-4">0x8765...4321</td>
                  <td className="py-4">5 mins ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LiquidityPool;