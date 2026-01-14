import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Shield, AlertCircle, Loader2, X } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  
  // Modal States
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showGooglePopup, setShowGooglePopup] = useState(false);

  const validateConsent = () => {
    if (!agreeToPolicy) {
      setErrorMessage("You must agree to the Fund Utilization Policy & Privacy Statement to proceed.");
      setShowErrorModal(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateConsent()) return;

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

  const handleGoogleLogin = () => {
    if (!validateConsent()) return;

    // Simulate Google Login Popup Flow
    setShowGooglePopup(true);
    
    setTimeout(() => {
        setShowGooglePopup(false);
        onLogin({
          id: Math.floor(Math.random() * 1000) + 5000,
          email: 'google_user@gmail.com',
          realName: 'Google User',
          dummyName: `Anonymous Helper ${Math.floor(Math.random() * 100)}`,
          isPrivate: false,
          role: UserRole.USER
        });
    }, 2500); // 2.5s simulated delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden relative z-10">
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
              <strong>Fund Utilization:</strong> "All donated amounts are strictly allocated to work, education, and stabilizing local businesses for poor people."
            </p>
            <p>
              <strong>Data Privacy:</strong> "No personal information is shared without explicit consent."
            </p>
            <div className="flex items-center mt-2">
              <input
                id="policy"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={agreeToPolicy}
                onChange={(e) => setAgreeToPolicy(e.target.checked)}
              />
              <label htmlFor="policy" className="ml-2 block text-gray-700 font-medium cursor-pointer">
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

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-1.19-.58z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
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

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 animate-bounce-in shadow-2xl relative">
            <div className="flex items-center gap-3 text-red-600 mb-2">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-bold">Action Required</h3>
            </div>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button 
                onClick={() => setShowErrorModal(false)}
                className="w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition"
            >
                Understood
            </button>
          </div>
        </div>
      )}

      {/* Simulated Google Popup */}
      {showGooglePopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center max-w-sm w-full">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">Connecting to Google...</h3>
                <p className="text-gray-500 text-sm mt-2">Verifying credentials securely.</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default Auth;