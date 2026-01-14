import React, { useState } from 'react';
import { Donation, AdminPost, User } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Wand2 } from 'lucide-react';
import { generateSuccessStory } from '../services/geminiService';

interface AdminDashboardProps {
  donations: Donation[];
  onAddPost: (post: Omit<AdminPost, 'id' | 'postedAt'>) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ donations, onAddPost }) => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Analytics Data preparation
  const categoryData = [
    { name: 'Edu', amount: donations.filter(d => d.categoryId === 1).reduce((acc, curr) => acc + curr.amount, 0) },
    { name: 'Biz', amount: donations.filter(d => d.categoryId === 2).reduce((acc, curr) => acc + curr.amount, 0) },
    { name: 'Med', amount: donations.filter(d => d.categoryId === 3).reduce((acc, curr) => acc + curr.amount, 0) },
    { name: 'Dev', amount: donations.filter(d => d.categoryId === 4).reduce((acc, curr) => acc + curr.amount, 0) },
  ];

  const totalRaised = donations.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAIWrite = async () => {
    if (!newPostTitle) {
        alert("Please enter a topic title first.");
        return;
    }
    setIsGenerating(true);
    // Hardcoded key details for demo, in real app could be another input
    const story = await generateSuccessStory(newPostTitle, "Local village impacted, 50 kids in school, 3 shops opened");
    setNewPostContent(story);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPost({
        title: newPostTitle,
        content: newPostContent,
        mediaUrl: `https://picsum.photos/800/400?random=${Math.random()}`
    });
    setNewPostTitle('');
    setNewPostContent('');
    setShowForm(false);
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-bold">Total Raised</p>
            <h3 className="text-2xl font-bold text-primary">${totalRaised.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-bold">Total Donations</p>
            <h3 className="text-2xl font-bold text-gray-800">{donations.length}</h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-64">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Funds by Category</h3>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip />
                <Bar dataKey="amount" fill="#2F855A" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Post Creator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Community Updates</h3>
            <button 
                onClick={() => setShowForm(!showForm)}
                className="bg-primary text-white p-2 rounded-full hover:bg-green-700"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-gray-50">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Update Title (Topic)</label>
                    <input 
                        className="w-full p-2 rounded border border-gray-300 focus:border-primary outline-none"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="e.g. New School in Village X"
                    />
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase">Content</label>
                        <button 
                            type="button"
                            onClick={handleAIWrite}
                            disabled={isGenerating}
                            className="text-xs flex items-center gap-1 text-accent font-bold hover:underline disabled:opacity-50"
                        >
                            <Wand2 className="w-3 h-3" /> {isGenerating ? 'Writing...' : 'Auto-Write with Gemini'}
                        </button>
                    </div>
                    <textarea 
                        className="w-full p-2 rounded border border-gray-300 focus:border-primary outline-none h-32"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Describe the work done..."
                    />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold shadow-sm">
                    Post Update
                </button>
            </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
