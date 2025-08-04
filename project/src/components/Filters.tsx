import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { SearchFilters } from '../types';
import { platforms } from '../data/platforms';

interface FiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  resultsCount: number;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange, resultsCount }) => {
  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    const newOrder = filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    onFiltersChange({
      ...filters,
      sortBy,
      sortOrder: newOrder
    });
  };

  const handlePlatformFilter = (platformId: string) => {
    const newPlatforms = filters.platforms.includes(platformId)
      ? filters.platforms.filter(id => id !== platformId)
      : [...filters.platforms, platformId];
    
    onFiltersChange({
      ...filters,
      platforms: newPlatforms
    });
  };

  const handleAvailabilityFilter = (availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability];
    
    onFiltersChange({
      ...filters,
      availability: newAvailability
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-6 h-6 text-blue-600" />
        <h3 className="font-bold text-gray-900 text-xl">Filters & Sorting</h3>
        <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">({resultsCount} results)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sort Options */}
        <div>
          <h4 className="text-base font-bold text-gray-800 mb-4">Sort by</h4>
          <div className="space-y-2">
            {[
              { key: 'price' as const, label: 'Price' },
              { key: 'delivery' as const, label: 'Delivery Time' },
              { key: 'rating' as const, label: 'Rating' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleSortChange(key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                  filters.sortBy === key
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <span>{label}</span>
                {filters.sortBy === key && (
                  filters.sortOrder === 'asc' ? 
                    <SortAsc className="w-5 h-5" /> : 
                    <SortDesc className="w-5 h-5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Filter */}
        <div>
          <h4 className="text-base font-bold text-gray-800 mb-4">Platforms</h4>
          <div className="space-y-2">
            {platforms.map(platform => (
              <label key={platform.id} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={filters.platforms.includes(platform.id)}
                  onChange={() => handlePlatformFilter(platform.id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-3xl">{platform.logo}</span>
                <span className="font-medium text-gray-800">{platform.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <h4 className="text-base font-bold text-gray-800 mb-4">Availability</h4>
          <div className="space-y-2">
            {[
              { key: 'available', label: 'In Stock', color: 'text-green-600' },
              { key: 'limited', label: 'Limited Stock', color: 'text-orange-600' },
              { key: 'out_of_stock', label: 'Out of Stock', color: 'text-red-600' }
            ].map(({ key, label, color }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={filters.availability.includes(key)}
                  onChange={() => handleAvailabilityFilter(key)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className={`font-medium ${color}`}>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};