import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Shield, Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  // Mock Login/Signup
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToPolicy) {
      alert("You must agree to the Fund Utilization Policy & Privacy Statement.");
      return;
    }

    // Simulate Admin login
    if (email === 'admin@riseroot.org') {
        onLogin({
            id: 999,
            email,
            realName: 'System Admin',
            dummyName: 'Admin',
            isPrivate: false,
            role: UserRole.ADMIN
        });
        return;
    }

    // Simulate User login
    onLogin({
      id: Math.floor(Math.random() * 1000),
      email,
      realName: name || 'John Doe',
      dummyName: `Anonymous Helper ${Math.floor(Math.random() * 100)}`,
      isPrivate: false,
      role: UserRole.USER
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary p-6 text-center">
            <div className="mx-auto bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                 <Shield className="text-primary w-8 h-8" />
            </div>
          <h1 className="text-2xl font-bold text-white">RiseRoot</h1>
          <p className="text-green-100">Fixing root causes, not just symptoms.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            {isLogin ? 'Welcome Back' : 'Join the Movement'}
          </h2>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-xs text-gray-600 space-y-2">
            <h3 className="font-bold text-gray-800">Mandatory Policy & Privacy Statement</h3>
            <p>
              <strong>Fund Utilization:</strong> "All donated amounts are strictly allocated to work, education, and stabilizing local businesses for poor people. Our goal is to make beneficiaries self-capable."
            </p>
            <p>
              <strong>Data Privacy:</strong> "No personal information is shared without explicit consent. You control your public visibility."
            </p>
            <div className="flex items-center mt-2">
              <input
                id="policy"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={agreeToPolicy}
                onChange={(e) => setAgreeToPolicy(e.target.checked)}
              />
              <label htmlFor="policy" className="ml-2 block text-gray-700 font-medium">
                I agree to the policies above.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:text-green-800 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
