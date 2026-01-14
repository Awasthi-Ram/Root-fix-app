import React, { useState } from 'react';
import Auth from './components/Auth';
import Layout from './components/Layout';
import ImpactHome from './components/ImpactHome';
import DonationFlow from './components/DonationFlow';
import Leaderboard from './components/Leaderboard';
import Certificates from './components/Certificates';
import Community from './components/Community';
import AdminDashboard from './components/AdminDashboard';
import { User, Donation, AdminPost, ChatMessage, Poll, UserRole } from './types';

// Initial Mock Data
const MOCK_DONATIONS: Donation[] = [
  { id: 1, userId: 101, categoryId: 1, amount: 500, currency: 'USD', status: 'success', donatedAt: '2023-10-01', isPrivateSnapshot: false, userRealName: 'Alice Johnson', userDummyName: 'Anonymous' },
  { id: 2, userId: 102, categoryId: 2, amount: 1200, currency: 'USD', status: 'success', donatedAt: '2023-10-02', isPrivateSnapshot: true, userRealName: 'Bob Smith', userDummyName: 'Kind Stranger' },
  { id: 3, userId: 103, categoryId: 1, amount: 300, currency: 'USD', status: 'success', donatedAt: '2023-10-05', isPrivateSnapshot: false, userRealName: 'Charlie Brown', userDummyName: 'Anonymous' },
  { id: 4, userId: 101, categoryId: 3, amount: 150, currency: 'USD', status: 'success', donatedAt: '2023-10-10', isPrivateSnapshot: false, userRealName: 'Alice Johnson', userDummyName: 'Anonymous' },
];

const MOCK_POSTS: AdminPost[] = [
  { id: 1, title: "New Training Center in Bihar", content: "We successfully established a computer literacy center. 40 students enrolled on day one.", postedAt: "2023-10-12", mediaUrl: "https://picsum.photos/seed/school/800/400" },
  { id: 2, title: "Medical Camp Report", content: "Over 200 villagers received free eye checkups and cataract surgeries funded by your donations.", postedAt: "2023-10-08", mediaUrl: "https://picsum.photos/seed/medical/800/400" }
];

const MOCK_MESSAGES: ChatMessage[] = [
  { id: 1, userId: 101, userName: 'Alice Johnson', text: "Has anyone visited the new center?", sentAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, userId: 102, userName: 'Kind Stranger', text: "Yes! It looks amazing. The kids are very happy.", sentAt: new Date(Date.now() - 1800000).toISOString() }
];

const MOCK_POLLS: Poll[] = [
  { id: 1, question: "Which region should we target next?", isActive: true, options: [{id: 1, text: "East Region", votes: 45}, {id: 2, text: "North Region", votes: 30}] }
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [posts, setPosts] = useState<AdminPost[]>(MOCK_POSTS);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [polls, setPolls] = useState<Poll[]>(MOCK_POLLS);

  const handleDonate = (donationData: Omit<Donation, 'id' | 'donatedAt' | 'status' | 'isPrivateSnapshot'>) => {
    const newDonation: Donation = {
      ...donationData,
      id: Date.now(),
      donatedAt: new Date().toISOString(),
      status: 'success',
      isPrivateSnapshot: user!.isPrivate // Snapshot current privacy setting
    };
    setDonations([newDonation, ...donations]);
  };

  const handleSendMessage = (text: string) => {
    if (!user) return;
    const msg: ChatMessage = {
      id: Date.now(),
      userId: user.id,
      userName: user.isPrivate ? user.dummyName : user.realName,
      text,
      sentAt: new Date().toISOString()
    };
    setMessages([...messages, msg]);
  };

  const handleVote = (pollId: number, optionId: number) => {
      // Simplistic vote logic
      const updatedPolls = polls.map(p => {
          if (p.id !== pollId) return p;
          return {
              ...p,
              options: p.options.map(o => o.id === optionId ? {...o, votes: o.votes + 1} : o)
          };
      });
      setPolls(updatedPolls);
  };

  const handleAddPost = (post: Omit<AdminPost, 'id' | 'postedAt'>) => {
      const newPost: AdminPost = {
          ...post,
          id: Date.now(),
          postedAt: new Date().toISOString()
      };
      setPosts([newPost, ...posts]);
  };

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  // Views Logic
  let viewContent;
  switch (currentView) {
    case 'home':
      viewContent = <ImpactHome posts={posts} totalDonations={donations.length * 100} onDonateClick={() => setCurrentView('donate')} user={user} />;
      break;
    case 'donate':
      viewContent = <DonationFlow user={user} onDonate={handleDonate} onCancel={() => setCurrentView('home')} />;
      break;
    case 'leaderboard':
      viewContent = <Leaderboard donations={donations} />;
      break;
    case 'certificates':
      viewContent = <Certificates userDonations={donations.filter(d => d.userId === user.id)} />;
      break;
    case 'community':
      viewContent = <Community user={user} chatMessages={messages} polls={polls} onSendMessage={handleSendMessage} onVote={handleVote} />;
      break;
    case 'admin':
        if(user.role === UserRole.ADMIN) {
            viewContent = <AdminDashboard donations={donations} onAddPost={handleAddPost} />;
        } else {
            setCurrentView('home'); // Redirect if not admin
        }
      break;
    default:
      viewContent = <ImpactHome posts={posts} totalDonations={donations.length * 100} onDonateClick={() => setCurrentView('donate')} user={user} />;
  }

  // If in donation flow, remove layout wrapper to focus
  if (currentView === 'donate') {
    return <div className="max-w-md mx-auto bg-gray-50 h-screen overflow-hidden pt-10 px-4">{viewContent}</div>;
  }

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView} user={user}>
      {viewContent}
    </Layout>
  );
}
