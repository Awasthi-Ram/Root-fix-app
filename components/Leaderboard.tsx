import React, { useState } from 'react';
import { Donation, User } from '../types';
import { Trophy, Shield } from 'lucide-react';

interface LeaderboardProps {
  donations: Donation[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ donations }) => {
  const [filter, setFilter] = useState<'Overall' | 'Education' | 'Medical' | 'Business'>('Overall');

  // Aggregate donations by user
  const userTotals: Record<number, { amount: number; realName?: string; dummyName?: string; isPrivate: boolean }> = {};

  donations.forEach(d => {
    // Basic filter logic (Mapping IDs to names for simplicity)
    const categoryNameMap: Record<number, string> = { 1: 'Education', 2: 'Business', 3: 'Medical', 4: 'Development' };
    const catName = categoryNameMap[d.categoryId];

    if (filter === 'Overall' || filter === catName) {
        if (!userTotals[d.userId]) {
            userTotals[d.userId] = { 
                amount: 0, 
                realName: d.userRealName, 
                dummyName: d.userDummyName,
                isPrivate: d.isPrivateSnapshot 
            };
        }
        userTotals[d.userId].amount += d.amount;
    }
  });

  const rankedUsers = Object.values(userTotals).sort((a, b) => b.amount - a.amount);

  return (
    <div className="pb-20">
      <div className="bg-primary text-white p-6 rounded-b-3xl mb-6 shadow-lg -mt-1">
          <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
              <Trophy className="w-6 h-6 text-accent" /> Wall of Fame
          </h2>
          <p className="text-green-100 text-center text-sm mt-1">Celebrating our top change-makers</p>
          
          <div className="flex overflow-x-auto gap-2 mt-6 pb-2 no-scrollbar justify-center">
              {['Overall', 'Education', 'Medical', 'Business'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap
                        ${filter === f ? 'bg-white text-primary' : 'bg-green-800 text-green-100 hover:bg-green-700'}`}
                  >
                      {f}
                  </button>
              ))}
          </div>
      </div>

      <div className="px-4 space-y-3">
        {rankedUsers.map((user, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
                        ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                          index === 1 ? 'bg-gray-100 text-gray-700' : 
                          index === 2 ? 'bg-orange-100 text-orange-700' : 'text-gray-400'}`}>
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            {user.isPrivate ? user.dummyName : user.realName}
                            {user.isPrivate && <Shield className="w-3 h-3 text-gray-400" />}
                        </h3>
                        <p className="text-xs text-gray-500">{filter} Contributor</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block font-bold text-primary">${user.amount.toLocaleString()}</span>
                </div>
            </div>
        ))}
        
        {rankedUsers.length === 0 && (
            <div className="text-center py-10 text-gray-400">
                No contributions yet in this category. Be the first!
            </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
