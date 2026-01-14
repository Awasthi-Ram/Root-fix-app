import React from 'react';
import { User, Donation } from '../types';
import { Shield, User as UserIcon, LogOut, ArrowLeft, Mail, Award } from 'lucide-react';

interface UserProfileProps {
  user: User;
  donations: Donation[];
  onBack: () => void;
  onLogout: () => void;
  onTogglePrivacy: (isPrivate: boolean) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, donations, onBack, onLogout, onTogglePrivacy }) => {
  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
            <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-primary font-bold text-4xl mb-4 border-4 border-white shadow-sm">
            {user.realName.charAt(0)}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{user.realName}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <Mail className="w-3 h-3" />
            <span>{user.email}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full mt-6">
            <div className="bg-gray-50 p-3 rounded-xl text-center">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Impact</p>
                <p className="text-xl font-bold text-primary">${totalDonated.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Donations</p>
                <p className="text-xl font-bold text-gray-800">{donations.length}</p>
            </div>
        </div>
      </div>

      <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-700 font-bold">
                    <Shield className="w-5 h-5 text-primary" />
                    <span>Privacy Mode</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={user.isPrivate}
                    onChange={(e) => onTogglePrivacy(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
                When enabled, you will appear as <span className="font-bold text-gray-700">"{user.dummyName}"</span> on public leaderboards and community chats.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
             <div className="flex items-center gap-2 text-gray-700 font-bold mb-3">
                <Award className="w-5 h-5 text-accent" />
                <span>My Badges</span>
             </div>
             <div className="flex gap-2">
                {donations.length > 0 ? (
                    <span className="bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full border border-yellow-200">First Donor</span>
                ) : (
                    <span className="text-xs text-gray-400">No badges yet.</span>
                )}
                {totalDonated > 1000 && (
                     <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full border border-purple-200">Top Contributor</span>
                )}
             </div>
          </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full bg-white border border-red-100 text-red-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-sm"
      >
        <LogOut className="w-5 h-5" /> Sign Out
      </button>
    </div>
  );
};

export default UserProfile;