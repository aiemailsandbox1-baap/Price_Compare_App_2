import { Product, PlatformResult } from '../types';
import { platforms } from './platforms';

const products: Product[] = [
  // Vegetables
  {
    id: 'onions-1kg',
    name: 'Fresh Onions',
    quantity: '1 kg',
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'potatoes-1kg',
    name: 'Fresh Potatoes',
    quantity: '1 kg',
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'tomatoes-1kg',
    name: 'Fresh Tomatoes',
    quantity: '1 kg',
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'carrots-500g',
    name: 'Fresh Carrots',
    quantity: '500g',
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'cabbage-1pc',
    name: 'Fresh Cabbage',
    quantity: '1 piece',
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'spinach-250g',
    name: 'Fresh Spinach',
    quantity: '250g',
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  
  // Fruits
  {
    id: 'apples-1kg',
    name: 'Red Apples',
    quantity: '1 kg',
    category: 'fruits',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'bananas-1kg',
    name: 'Fresh Bananas',
    quantity: '1 kg',
    category: 'fruits',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'oranges-1kg',
    name: 'Fresh Oranges',
    quantity: '1 kg',
    category: 'fruits',
    image: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'mangoes-1kg',
    name: 'Fresh Mangoes',
    quantity: '1 kg',
    category: 'fruits',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  
  // Dairy
  {
    id: 'milk-1l',
    name: 'Fresh Milk',
    brand: 'Amul',
    quantity: '1 liter',
    category: 'dairy',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'butter-200g',
    name: 'Salted Butter',
    brand: 'Amul',
    quantity: '200g',
    category: 'dairy',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'paneer-250g',
    name: 'Fresh Paneer',
    brand: 'Mother Dairy',
    quantity: '250g',
    category: 'dairy',
    image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'cheese-200g',
    name: 'Processed Cheese',
    brand: 'Amul',
    quantity: '200g',
    category: 'dairy',
    image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  
  // Healthcare & Personal Care
  {
    id: 'dettol-500ml',
    name: 'Dettol Antiseptic Liquid',
    brand: 'Dettol',
    quantity: '500 ml',
    category: 'healthcare',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'sanitizer-500ml',
    name: 'Hand Sanitizer',
    brand: 'Dettol',
    quantity: '500 ml',
    category: 'healthcare',
    image: 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'soap-100g',
    name: 'Antibacterial Soap',
    brand: 'Dettol',
    quantity: '100g',
    category: 'healthcare',
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'shampoo-400ml',
    name: 'Anti-Dandruff Shampoo',
    brand: 'Head & Shoulders',
    quantity: '400ml',
    category: 'personal_care',
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  
  // Grains & Staples
  {
    id: 'rice-5kg',
    name: 'Basmati Rice',
    brand: 'India Gate',
    quantity: '5 kg',
    category: 'grains',
    image: 'https://images.pexels.com/photos/1393836/pexels-photo-1393836.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'wheat-flour-5kg',
    name: 'Wheat Flour',
    brand: 'Aashirvaad',
    quantity: '5 kg',
    category: 'grains',
    image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'dal-1kg',
    name: 'Toor Dal',
    quantity: '1 kg',
    category: 'grains',
    image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'sugar-1kg',
    name: 'White Sugar',
    quantity: '1 kg',
    category: 'spices',
    image: 'https://images.pexels.com/photos/65882/spoon-white-sugar-sweet-65882.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  
  // Beverages
  {
    id: 'tea-250g',
    name: 'Black Tea',
    brand: 'Tata Tea',
    quantity: '250g',
    category: 'beverages',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'coffee-200g',
    name: 'Instant Coffee',
    brand: 'Nescafe',
    quantity: '200g',
    category: 'beverages',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'juice-1l',
    name: 'Orange Juice',
    brand: 'Real',
    quantity: '1 liter',
    category: 'beverages',
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  
  // Oils & Cooking
  {
    id: 'cooking-oil-1l',
    name: 'Sunflower Oil',
    brand: 'Fortune',
    quantity: '1 liter',
    category: 'oils',
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'salt-1kg',
    name: 'Iodized Salt',
    brand: 'Tata',
    quantity: '1 kg',
    category: 'spices',
    image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  
  // Snacks
  {
    id: 'chips-100g',
    name: 'Potato Chips',
    brand: 'Lays',
    quantity: '100g',
    category: 'snacks',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'chocolate-50g',
    name: 'Milk Chocolate',
    brand: 'Cadbury',
    quantity: '50g',
    category: 'snacks',
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'biscuits-200g',
    name: 'Marie Biscuits',
    brand: 'Parle',
    quantity: '200g',
    category: 'bakery',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  
  // Bakery
  {
    id: 'bread-400g',
    name: 'White Bread',
    brand: 'Harvest Gold',
    quantity: '400g',
    category: 'bakery',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

// Realistic price ranges for different categories
const categoryPriceRanges = {
  vegetables: { min: 15, max: 80 },    // ₹15-80 per kg
  fruits: { min: 40, max: 200 },       // ₹40-200 per kg
  dairy: { min: 25, max: 150 },        // ₹25-150
  healthcare: { min: 80, max: 350 },   // ₹80-350
  personal_care: { min: 120, max: 450 }, // ₹120-450
  grains: { min: 60, max: 400 },       // ₹60-400 for 5kg, ₹30-80 for 1kg
  beverages: { min: 45, max: 180 },    // ₹45-180
  oils: { min: 120, max: 280 },        // ₹120-280 per liter
  spices: { min: 25, max: 60 },        // ₹25-60 per kg
  snacks: { min: 20, max: 120 },       // ₹20-120
  bakery: { min: 25, max: 80 },        // ₹25-80
  cleaning: { min: 80, max: 250 }      // ₹80-250
};

// Generate comprehensive mock results for all products
const generateMockResults = (): Record<string, PlatformResult[]> => {
  const results: Record<string, PlatformResult[]> = {};
  
  products.forEach(product => {
    const category = product.category as keyof typeof categoryPriceRanges;
    const priceRange = categoryPriceRanges[category] || { min: 50, max: 200 };
    
    // Generate realistic base price within category range
    const basePrice = Math.floor(Math.random() * (priceRange.max - priceRange.min) + priceRange.min);
    const productResults: PlatformResult[] = [];
    
    // Generate results for 4-6 platforms with realistic price variations
    const numPlatforms = Math.floor(Math.random() * 3) + 4;
    const selectedPlatforms = platforms.sort(() => 0.5 - Math.random()).slice(0, numPlatforms);
    
    selectedPlatforms.forEach((platform, index) => {
      // Realistic price variation: ±20% from base price
      const priceVariation = (Math.random() - 0.5) * 0.4; // ±20%
      const price = Math.round(basePrice * (1 + priceVariation));
      
      // 40% chance of discount
      const hasDiscount = Math.random() > 0.6;
      const originalPrice = hasDiscount ? Math.round(price * (1 + Math.random() * 0.3 + 0.1)) : undefined;
      const discount = hasDiscount ? Math.round(((originalPrice! - price) / originalPrice!) * 100) : undefined;
      
      // Realistic availability (90% available, 8% limited, 2% out of stock)
      const availabilityRand = Math.random();
      const availability = availabilityRand > 0.98 ? 'out_of_stock' : 
                          availabilityRand > 0.9 ? 'limited' : 'available';
      
      // Platform-specific delivery times
      const deliveryTimes = {
        blinkit: ['8 mins', '10 mins', '12 mins'],
        zepto: ['10 mins', '12 mins', '15 mins'],
        instamart: ['15 mins', '20 mins', '25 mins'],
        bigbasket: ['2 hours', '4 hours', '6 hours'],
        amazon_fresh: ['1 hour', '2 hours', '3 hours'],
        grofers: ['30 mins', '45 mins', '1 hour']
      };
      
      const platformDeliveryTimes = deliveryTimes[platform.id as keyof typeof deliveryTimes] || ['30 mins', '45 mins', '1 hour'];
      const deliveryTime = platformDeliveryTimes[Math.floor(Math.random() * platformDeliveryTimes.length)];
      
      // Realistic ratings (3.5-5.0)
      const rating = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
      const reviews = Math.floor(Math.random() * 2000) + 100;
      
      productResults.push({
        platform,
        product,
        price,
        originalPrice,
        discount,
        availability,
        deliveryTime,
        rating,
        reviews,
        productUrl: `${platform.baseUrl}/product/${product.id}`,
        deepLink: `${platform.id}://product/${product.id}`
      });
    });
    
    // Sort by price for consistent ordering
    productResults.sort((a, b) => a.price - b.price);
    
    // Add results for various search terms
    const searchTerms = [
      product.name.toLowerCase(),
      product.name.toLowerCase().replace('fresh ', ''),
      product.name.toLowerCase().split(' ')[0], // First word
      product.name.toLowerCase().split(' ').pop()!, // Last word
      product.category,
      ...(product.brand ? [product.brand.toLowerCase()] : [])
    ];
    
    searchTerms.forEach(term => {
      if (term && term.length > 2) {
        if (!results[term]) {
          results[term] = [];
        }
        results[term] = [...results[term], ...productResults];
      }
    });
  });
  
  return results;
};

export const mockResults = generateMockResults();