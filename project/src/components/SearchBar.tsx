import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { AIService } from '../services/aiService';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 2) {
      const newSuggestions = AIService.generateSuggestions(query);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center">
            {isLoading ? (
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            ) : (
              <Search className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for groceries... (e.g., '1 kg onions', '500 ml dettol', 'chocolate')"
            className="w-full pl-14 pr-20 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            disabled={isLoading}
          />
          <div className="absolute right-2 flex items-center">
            <div className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold rounded-xl shadow-lg">
              <Sparkles className="w-4 h-4" />
              AI
            </div>
          </div>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-6 py-4 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 flex items-center gap-4 transition-all duration-200 border-b border-gray-100 last:border-b-0 font-medium"
            >
              <Search className="w-5 h-5 text-blue-500" />
              <span className="text-gray-800 text-lg">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};