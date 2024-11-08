import React from 'react';

const FailPage: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-800/50">
      <div className="w-[500px] bg-[#F31260] rounded-lg shadow-2xl overflow-hidden relative">
       

        {/* Red section with X icon */}
        <div className="bg-rose-400 h-32 flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Content section */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Fail!</h2>
          <p className="text-gray-600 mb-6">Change a few things up and try submitting again.</p>
          
          
        </div>
      </div>
    </div>
  );
};

export default FailPage;
