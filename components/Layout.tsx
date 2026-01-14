import React from 'react';
import { Home, Trophy, FileText, MessageCircle, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, user }) => {
  const isAdmin = user.role === UserRole.ADMIN;

  const NavItem = ({ view, icon: Icon, label }: { view: string, icon: any, label: string }) => (
    <button 
      onClick={() => onNavigate(view)}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1
        ${currentView === view ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <Icon className={`w-6 h-6 ${currentView === view ? 'fill-current' : ''}`} strokeWidth={2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm z-10">
        <div className="font-bold text-xl text-primary tracking-tight">RiseRoot</div>
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-primary font-bold">
            {user.realName.charAt(0)}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 h-16 flex justify-around items-center px-2 z-20 absolute bottom-0 w-full">
        <NavItem view="home" icon={Home} label="Impact" />
        <NavItem view="leaderboard" icon={Trophy} label="Rankings" />
        <NavItem view="certificates" icon={FileText} label="Certificates" />
        <NavItem view="community" icon={MessageCircle} label="Community" />
        {isAdmin && <NavItem view="admin" icon={UserIcon} label="Admin" />}
      </nav>
    </div>
  );
};

export default Layout;
