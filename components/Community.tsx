import React, { useState } from 'react';
import { User, ChatMessage, Poll } from '../types';
import { MessageSquare, BarChart2, Send, ThumbsUp } from 'lucide-react';

interface CommunityProps {
  user: User;
  chatMessages: ChatMessage[];
  polls: Poll[];
  onSendMessage: (text: string) => void;
  onVote: (pollId: number, optionId: number) => void;
}

const Community: React.FC<CommunityProps> = ({ user, chatMessages, polls, onSendMessage, onVote }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'polls'>('chat');
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
        onSendMessage(newMessage);
        setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="flex border-b bg-white">
        <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors
                ${activeTab === 'chat' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
        >
            <MessageSquare className="w-4 h-4" /> Community Chat
        </button>
        <button 
            onClick={() => setActiveTab('polls')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors
                ${activeTab === 'polls' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
        >
            <BarChart2 className="w-4 h-4" /> Active Polls
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {activeTab === 'chat' ? (
              <div className="space-y-4">
                  {chatMessages.map(msg => (
                      <div key={msg.id} className={`flex flex-col ${msg.userId === user.id ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-xl text-sm shadow-sm
                              ${msg.userId === user.id ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                              <p className="font-bold text-xs opacity-70 mb-1">{msg.userName}</p>
                              {msg.text}
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1">{new Date(msg.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                  ))}
              </div>
          ) : (
              <div className="space-y-6">
                  {polls.map(poll => (
                      <div key={poll.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <h3 className="font-bold text-gray-800 mb-4">{poll.question}</h3>
                          <div className="space-y-3">
                              {poll.options.map(opt => (
                                  <button 
                                    key={opt.id}
                                    onClick={() => onVote(poll.id, opt.id)}
                                    className="w-full text-left relative h-10 bg-gray-100 rounded-lg overflow-hidden group hover:bg-gray-200 transition-colors"
                                  >
                                      <div 
                                        className="absolute top-0 left-0 h-full bg-secondary transition-all duration-500" 
                                        style={{ width: `${(opt.votes / 10) * 100}%` }} // Mock percentage
                                      ></div>
                                      <div className="absolute top-0 left-0 h-full w-full flex items-center justify-between px-4 z-10">
                                          <span className="text-sm font-medium text-gray-800">{opt.text}</span>
                                          <span className="text-xs text-gray-500 bg-white/50 px-2 py-0.5 rounded-full">{opt.votes} votes</span>
                                      </div>
                                  </button>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>

      {activeTab === 'chat' && (
          <div className="bg-white p-4 border-t flex gap-2">
              <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Discuss social issues..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="bg-primary text-white p-2 rounded-full hover:bg-green-700 transition"
              >
                  <Send className="w-5 h-5" />
              </button>
          </div>
      )}
    </div>
  );
};

export default Community;
