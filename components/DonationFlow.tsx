import React, { useState } from 'react';
import { Category, Donation, User } from '../types';
import { BookOpen, Briefcase, Stethoscope, Hammer, CheckCircle, Lock } from 'lucide-react';

interface DonationFlowProps {
  user: User;
  onDonate: (donation: Omit<Donation, 'id' | 'donatedAt' | 'status' | 'isPrivateSnapshot'>) => void;
  onCancel: () => void;
}

const categories: Category[] = [
  { id: 1, name: 'Education', description: 'Books, uniforms, and school fees.', icon: 'BookOpen' },
  { id: 2, name: 'Business', description: 'Micro-finance for small shops.', icon: 'Briefcase' },
  { id: 3, name: 'Medical', description: 'Medicine and surgeries for the poor.', icon: 'Stethoscope' },
  { id: 4, name: 'Development', description: 'Infrastructure in backward areas.', icon: 'Hammer' },
];

const DonationFlow: React.FC<DonationFlowProps> = ({ user, onDonate, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<'USD' | 'INR' | 'BTC'>('USD');
  const [isPrivate, setIsPrivate] = useState(user.isPrivate);

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6" />;
      case 'Hammer': return <Hammer className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  const handleDonate = () => {
    if (selectedCategory && amount) {
      onDonate({
        userId: user.id,
        categoryId: selectedCategory,
        amount: parseFloat(amount),
        currency: currency,
        userRealName: user.realName,
        userDummyName: user.dummyName
      });
      setStep(3); // Success screen
    }
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 text-center px-4">
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-8">Your contribution has been recorded securely. You can find your receipt in the "Certificates" tab.</p>
        <button onClick={onCancel} className="bg-primary text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-green-700 transition">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[80vh] rounded-2xl shadow-sm p-6 relative">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
            {step === 1 ? 'Select a Cause' : 'Donation Details'}
        </h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setStep(2); }}
              className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all h-40 gap-3
                ${selectedCategory === cat.id ? 'border-primary bg-green-50' : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'}`}
            >
              <div className={`p-3 rounded-full ${selectedCategory === cat.id ? 'bg-white text-primary' : 'bg-gray-100 text-gray-600'}`}>
                {getIcon(cat.icon)}
              </div>
              <div>
                  <h3 className="font-bold text-gray-800">{cat.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{cat.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="flex rounded-md shadow-sm">
                <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm focus:border-primary focus:outline-none"
                >
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="BTC">BTC</option>
                </select>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="block w-full flex-1 rounded-r-md border border-gray-300 px-3 py-3 focus:border-primary focus:ring-primary outline-none sm:text-sm"
                />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
             <h4 className="text-sm font-bold text-yellow-800 mb-1">Fund Utilization Policy</h4>
             <p className="text-xs text-yellow-800 leading-relaxed">
                Funds are strictly allocated to work, education, and stabilizing local businesses. No overheads.
             </p>
          </div>

          <div className="flex items-start">
             <div className="flex items-center h-5">
               <input
                 id="privacy"
                 type="checkbox"
                 checked={isPrivate}
                 onChange={(e) => setIsPrivate(e.target.checked)}
                 className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
               />
             </div>
             <div className="ml-3 text-sm">
               <label htmlFor="privacy" className="font-medium text-gray-700 flex items-center gap-1">
                 Donate Anonymously <Lock className="w-3 h-3 text-gray-400" />
               </label>
               <p className="text-gray-500">Your name will be hidden on public leaderboards.</p>
             </div>
          </div>

          <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setStep(1)} 
                className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
              <button 
                onClick={handleDonate}
                disabled={!amount}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-green-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Donation
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationFlow;
