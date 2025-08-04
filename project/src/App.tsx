import React, { useState, useCallback } from 'react';
import { ShoppingCart, Sparkles, TrendingUp, Users, MapPin } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { Filters } from './components/Filters';
import { LoadingState } from './components/LoadingState';
import { EmptyState } from './components/EmptyState';
import { DataSourceIndicator } from './components/DataSourceIndicator';
import { SearchService } from './services/searchService';
import { PlatformResult, SearchFilters, SearchQuery } from './types';

function App() {
  const [results, setResults] = useState<PlatformResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<PlatformResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState<SearchQuery | null>(null);
  const [dataSource, setDataSource] = useState<'api' | 'cache' | 'mock'>('mock');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    platforms: [],
    availability: [],
    priceRange: [0, 1000],
    sortBy: 'price',
    sortOrder: 'asc'
  });

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const { results: searchResults, normalizedQuery } = await SearchService.searchProducts(query);
      setResults(searchResults);
      setCurrentQuery(normalizedQuery);
      setDataSource('mock'); // Will be 'api' when real-time data is available
      setLastUpdated(new Date());
      
      // Apply filters to results
      const filtered = SearchService.filterAndSortResults(searchResults, filters);
      setFilteredResults(filtered);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
      setFilteredResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    const filtered = SearchService.filterAndSortResults(results, newFilters);
    setFilteredResults(filtered);
  }, [results]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    handleSearch(suggestion);
  }, [handleSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GroceryAI</h1>
                <p className="text-sm text-gray-600">Smart Price Comparison</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Real-time Prices</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-500" />
                <span>6 Platforms</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Find the Best Grocery Deals
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
            Compare prices across Blinkit, Zepto, Swiggy Instamart, and more. 
            Our AI understands your queries and finds the best deals instantly.
          </p>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* AI Query Info */}
        {currentQuery && !isLoading && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">AI Understanding</h3>
                  <div className="text-sm text-gray-700 space-y-1 font-medium">
                    <p><strong>Product:</strong> {currentQuery.normalized.product}</p>
                    {currentQuery.normalized.quantity && (
                      <p><strong>Quantity:</strong> {currentQuery.normalized.quantity}</p>
                    )}
                    {currentQuery.normalized.brand && (
                      <p><strong>Brand:</strong> {currentQuery.normalized.brand}</p>
                    )}
                    {currentQuery.normalized.category && (
                      <p><strong>Category:</strong> {currentQuery.normalized.category}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <DataSourceIndicator 
                  isRealTime={dataSource === 'api'}
                  lastUpdated={lastUpdated || undefined}
                  source={dataSource}
                />
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Results */}
        {!isLoading && hasSearched && (
          <>
            {results.length > 0 ? (
              <>
                <Filters 
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  resultsCount={filteredResults.length}
                />
                
                {filteredResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResults.map((result, index) => (
                      <ResultCard 
                        key={`${result.platform.id}-${result.product.id}`}
                        result={result}
                        rank={index + 1}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-10 h-10 text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      No results match your filters
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                searchQuery={currentQuery?.raw}
                suggestions={currentQuery?.suggestions}
                onSuggestionClick={handleSuggestionClick}
              />
            )}
          </>
        )}

        {/* Initial State */}
        {!hasSearched && !isLoading && (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Powered by AI • Compare prices across 6+ platforms
            </p>
            <p className="text-sm text-gray-500">
              Data updated in real-time • Prices may vary based on location
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;