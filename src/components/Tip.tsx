import React from 'react';

interface TipProps {
  children: React.ReactNode;
  title?: string;
}

const Tip: React.FC<TipProps> = ({ children, title = "PROFI-TIPP" }) => {
  return (
    <div className="my-8 rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shadow-xl">
      {/* Terminal-Style Header */}
      <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center text-gray-400">
          <span className="text-sm mr-2">~/dev/tips</span>
          <span className="text-blue-400">$</span>
          <span className="ml-2 text-green-400">{title}</span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6 bg-gray-900">
        <div className="flex items-center mb-4 text-blue-400">
          <span className="mr-2">⚡</span>
          <span className="text-sm font-mono">executing tip.sh...</span>
        </div>
        
        {/* Main Content */}
        <div className="prose prose-invert max-w-none text-gray-300 font-mono">
          <div className="space-y-2">
            {children}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-700 text-gray-500 font-mono text-sm">
          <span className="text-green-400">✓</span> Tip loaded successfully
        </div>
      </div>
    </div>
  );
};

export default Tip;
