import React from 'react';
import { ExternalLink, Star, Clock, ShoppingCart, Tag, TrendingDown } from 'lucide-react';
import { PlatformResult } from '../types';

interface ResultCardProps {
  result: PlatformResult;
  rank: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, rank }) => {
  const { platform, product, price, originalPrice, discount, availability, deliveryTime, rating, reviews, productUrl } = result;

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50';
      case 'limited': return 'text-orange-600 bg-orange-50';
      case 'out_of_stock': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case 'available': return 'In Stock';
      case 'limited': return 'Limited Stock';
      case 'out_of_stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-1 relative group">
      {rank <= 3 && (
        <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white">
          {rank}
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-gray-100" style={{ backgroundColor: `${platform.color}15` }}>
            {platform.logo}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{platform.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(availability)}`}>
                {getAvailabilityText(availability)}
              </span>
              <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                <Clock className="w-3 h-3" />
                {deliveryTime}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl font-bold text-gray-900">₹{price}</span>
            {discount && (
              <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-sm">
                <TrendingDown className="w-3 h-3" />
                {discount}% OFF
              </span>
            )}
          </div>
          {originalPrice && (
            <span className="text-lg text-gray-500 line-through font-medium">₹{originalPrice}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-gray-900 text-lg">{product.name}</h4>
          <p className="text-sm text-gray-600 font-medium">{product.quantity}</p>
          {product.brand && (
            <p className="text-sm text-blue-600 mt-1 font-semibold">Brand: {product.brand}</p>
          )}
        </div>
        
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-20 h-20 object-cover rounded-xl shadow-md border border-gray-100"
          />
        )}
      </div>

      {rating && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-gray-900">{rating}</span>
          </div>
          {reviews && (
            <span className="text-sm text-gray-600 font-medium">({reviews.toLocaleString()} reviews)</span>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <a
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ShoppingCart className="w-5 h-5" />
          Buy Now
        </a>
        <a
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-xl transition-all duration-200 flex items-center justify-center group"
        >
          <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
        </a>
      </div>
    </div>
  );
};