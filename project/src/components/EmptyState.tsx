import React from 'react';
import { ShoppingCart, Lightbulb } from 'lucide-react';

interface EmptyStateProps {
  searchQuery?: string;
  suggestions?: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  searchQuery, 
  suggestions = [], 
  onSuggestionClick 
}) => {
  if (searchQuery && suggestions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No results found for "{searchQuery}"
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Try adjusting your search or check the spelling. Our AI is constantly learning new products!
        </p>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['1 kg onions', '500 ml dettol', '1 liter milk', '5 kg rice'].map(suggestion => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (suggestions.length > 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-orange-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Did you mean?
        </h3>
        <p className="text-gray-600 mb-6">
          We couldn't find exact matches, but here are some similar products:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map(suggestion => (
            <button
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 font-medium"
            >
              Search "{suggestion}"
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingCart className="w-10 h-10 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Find the Best Grocery Deals
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Search across multiple quick commerce platforms to compare prices and find the best deals for your groceries.
      </p>
      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            '1 kg onions',
            '500 ml hand sanitizer',
            '1 liter milk',
            '5 kg basmati rice',
            '400g bread',
            '1 kg potatoes',
            '250g paneer',
            '1 kg apples',
            '200g butter',
            '1 liter cooking oil'
          ].map(suggestion => (
            <button
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};