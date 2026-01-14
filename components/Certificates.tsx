import React from 'react';
import { Donation } from '../types';
import { FileText, Download } from 'lucide-react';

interface CertificatesProps {
  userDonations: Donation[];
}

const Certificates: React.FC<CertificatesProps> = ({ userDonations }) => {
  const categoryNameMap: Record<number, string> = { 1: 'Education', 2: 'Business', 3: 'Medical', 4: 'Development' };

  return (
    <div className="p-4 pb-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Certificates</h2>
      
      <div className="space-y-4">
        {userDonations.map((donation) => (
            <div key={donation.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                        <div className="bg-green-50 p-2 rounded-lg">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Certificate of Impact</h3>
                            <p className="text-sm text-gray-600">For supporting: <span className="font-medium text-primary">{categoryNameMap[donation.categoryId]}</span></p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(donation.donatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-700">Amount: {donation.currency} {donation.amount}</span>
                    <button className="flex items-center gap-1 text-sm text-primary font-medium hover:text-green-800 transition-colors">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                </div>
            </div>
        ))}

        {userDonations.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">You haven't made any donations yet.</p>
                <p className="text-sm text-gray-400 mt-1">Make a donation to earn your first certificate.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
