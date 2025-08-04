export interface Product {
  id: string;
  name: string;
  brand?: string;
  quantity: string;
  category: string;
  image?: string;
}

export interface PlatformResult {
  platform: Platform;
  product: Product;
  price: number;
  originalPrice?: number;
  discount?: number;
  availability: 'available' | 'out_of_stock' | 'limited';
  deliveryTime: string;
  rating?: number;
  reviews?: number;
  productUrl: string;
  deepLink?: string;
}

export interface Platform {
  id: string;
  name: string;
  logo: string;
  color: string;
  baseUrl: string;
}

export interface SearchQuery {
  raw: string;
  normalized: {
    product: string;
    quantity?: string;
    brand?: string;
    category?: string;
  };
  suggestions?: string[];
}

export interface SearchFilters {
  platforms: string[];
  availability: string[];
  priceRange: [number, number];
  sortBy: 'price' | 'delivery' | 'rating';
  sortOrder: 'asc' | 'desc';
}