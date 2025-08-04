import { PlatformResult, SearchQuery, SearchFilters } from '../types';
import { mockResults } from '../data/mockData';
import { AIService } from './aiService';
import { RealTimeService } from './realTimeService';

export class SearchService {
  static async searchProducts(query: string): Promise<{
    results: PlatformResult[];
    normalizedQuery: SearchQuery;
  }> {
    // Try real-time data first
    try {
      const realTimeResults = await RealTimeService.searchProducts(query);
      if (realTimeResults.results.length > 0) {
        return realTimeResults;
      }
    } catch (error) {
      console.log('Real-time data unavailable, using mock data:', error);
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const normalizedQuery = AIService.normalizeQuery(query);
    const searchKey = normalizedQuery.normalized.product.toLowerCase();
    
    // Find matching results
    let results: PlatformResult[] = [];
    
    // Check for exact matches first
    if (mockResults[searchKey]) {
      results = mockResults[searchKey];
    } else {
      // Check for partial matches
      for (const [key, value] of Object.entries(mockResults)) {
        if (searchKey.length > 2 && (key.includes(searchKey) || searchKey.includes(key))) {
          results = value;
          break;
        }
      }
      
      // If still no results, try fuzzy matching
      if (results.length === 0) {
        for (const [key, value] of Object.entries(mockResults)) {
          const similarity = this.calculateSimilarity(searchKey, key);
          if (similarity > 0.6) {
            results = value;
            break;
          }
        }
      }
    }

    return {
      results,
      normalizedQuery
    };
  }

  private static calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  static filterAndSortResults(
    results: PlatformResult[],
    filters: SearchFilters
  ): PlatformResult[] {
    let filtered = results.filter(result => {
      // Platform filter
      if (filters.platforms.length > 0 && !filters.platforms.includes(result.platform.id)) {
        return false;
      }

      // Availability filter
      if (filters.availability.length > 0 && !filters.availability.includes(result.availability)) {
        return false;
      }

      // Price range filter
      if (result.price < filters.priceRange[0] || result.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort results
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'delivery':
          const aTime = parseInt(a.deliveryTime);
          const bTime = parseInt(b.deliveryTime);
          comparison = aTime - bTime;
          break;
        case 'rating':
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }
}