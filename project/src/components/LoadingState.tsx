import React from 'react';
import { Loader2, Search, Sparkles } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        AI is searching across platforms...
      </h3>
      <p className="text-gray-600 mb-8 text-lg">
        Analyzing your query and finding the best deals
      </p>
      
      <div className="flex items-center justify-center gap-6 text-gray-600 font-medium">
        <div className="flex items-center gap-1">
          <Search className="w-5 h-5 text-blue-500" />
          <span>Normalizing query</span>
        </div>
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 border-2 border-blue-500 border-r-transparent rounded-full animate-spin"></div>
          <span>Fetching prices</span>
        </div>
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="flex items-center gap-1">
          <Sparkles className="w-5 h-5 animate-pulse text-purple-500" />
          <span>Optimizing results</span>
        </div>
      </div>
    </div>
  );
};