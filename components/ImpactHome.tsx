import React from 'react';
import { AdminPost, User } from '../types';
import { Heart, Users, TrendingUp, ArrowRight } from 'lucide-react';

interface ImpactHomeProps {
  posts: AdminPost[];
  totalDonations: number;
  onDonateClick: () => void;
  user: User;
}

const ImpactHome: React.FC<ImpactHomeProps> = ({ posts, totalDonations, onDonateClick, user }) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Welcome & Impact Card */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Hello, {user.realName.split(' ')[0]}</h2>
                <p className="text-gray-500 text-sm">Let's make a difference today.</p>
            </div>
            <div className="bg-green-50 p-2 rounded-full">
                <Heart className="text-primary w-6 h-6" fill="currentColor" />
            </div>
        </div>
        
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-xl p-6 text-white text-center shadow-lg">
            <p className="text-green-100 text-sm font-medium mb-1">Total Lives Impacted</p>
            <h3 className="text-5xl font-extrabold mb-2">{Math.floor(totalDonations / 50) + 120}</h3>
            <p className="text-xs opacity-80">and counting...</p>
        </div>

        <button 
            onClick={onDonateClick}
            className="w-full mt-6 bg-accent hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-lg"
        >
            Donate Now <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Admin Feed */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Transparency Wall
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Latest Updates</span>
        </div>
        
        <div className="space-y-4">
            {posts.map(post => (
                <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    {post.mediaUrl && (
                        <div className="h-48 w-full bg-gray-200 relative">
                             <img src={post.mediaUrl} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2">{post.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{post.content}</p>
                        <p className="text-xs text-gray-400 mt-3">{new Date(post.postedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
            {posts.length === 0 && (
                <div className="text-center py-10 text-gray-500 bg-white rounded-xl">
                    No updates yet. Check back soon!
                </div>
            )}
        </div>
      </section>
    </div>
  );
};

export default ImpactHome;
