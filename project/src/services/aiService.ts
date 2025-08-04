import { SearchQuery } from '../types';

const productKeywords = {
  vegetables: [
    'onion', 'onions', 'potato', 'potatoes', 'tomato', 'tomatoes', 'carrot', 'carrots',
    'cabbage', 'cauliflower', 'broccoli', 'spinach', 'lettuce', 'cucumber', 'bell pepper',
    'capsicum', 'green chili', 'ginger', 'garlic', 'beetroot', 'radish', 'okra', 'ladyfinger',
    'eggplant', 'brinjal', 'pumpkin', 'bottle gourd', 'bitter gourd', 'ridge gourd',
    'green beans', 'peas', 'corn', 'sweet corn', 'mushroom', 'mushrooms'
  ],
  fruits: [
    'apple', 'apples', 'banana', 'bananas', 'orange', 'oranges', 'mango', 'mangoes',
    'grapes', 'strawberry', 'strawberries', 'pineapple', 'watermelon', 'muskmelon',
    'papaya', 'guava', 'pomegranate', 'kiwi', 'avocado', 'lemon', 'lime', 'coconut',
    'dates', 'figs', 'raisins', 'almonds', 'cashews', 'walnuts', 'pistachios'
  ],
  dairy: [
    'milk', 'butter', 'cheese', 'yogurt', 'curd', 'paneer', 'cream', 'ghee',
    'ice cream', 'condensed milk', 'powdered milk', 'buttermilk', 'lassi'
  ],
  healthcare: [
    'dettol', 'sanitizer', 'antiseptic', 'handwash', 'soap', 'shampoo', 'toothpaste',
    'toothbrush', 'face wash', 'body wash', 'lotion', 'sunscreen', 'deodorant',
    'perfume', 'tissues', 'cotton', 'bandage', 'paracetamol', 'vitamin', 'supplements'
  ],
  grains: [
    'rice', 'wheat', 'flour', 'dal', 'lentils', 'chickpeas', 'kidney beans', 'black beans',
    'quinoa', 'oats', 'barley', 'millet', 'semolina', 'suji', 'besan', 'gram flour',
    'corn flour', 'rice flour', 'wheat flour', 'maida', 'atta'
  ],
  bakery: [
    'bread', 'biscuit', 'cookies', 'cake', 'pastry', 'croissant', 'muffin', 'donut',
    'bagel', 'pizza base', 'burger bun', 'sandwich bread', 'brown bread', 'multigrain bread'
  ],
  beverages: [
    'tea', 'coffee', 'juice', 'soft drink', 'cola', 'pepsi', 'coke', 'sprite', 'fanta',
    'water', 'mineral water', 'energy drink', 'sports drink', 'coconut water',
    'green tea', 'black tea', 'herbal tea', 'instant coffee', 'cold coffee'
  ],
  snacks: [
    'chips', 'namkeen', 'biscuits', 'crackers', 'nuts', 'popcorn', 'chocolate',
    'candy', 'gum', 'wafers', 'kurkure', 'lays', 'pringles', 'oreo', 'parle-g'
  ],
  spices: [
    'salt', 'sugar', 'turmeric', 'red chili', 'coriander', 'cumin', 'mustard seeds',
    'fenugreek', 'cardamom', 'cinnamon', 'cloves', 'black pepper', 'bay leaves',
    'garam masala', 'curry powder', 'chaat masala', 'tandoori masala'
  ],
  oils: [
    'cooking oil', 'sunflower oil', 'mustard oil', 'coconut oil', 'olive oil',
    'sesame oil', 'groundnut oil', 'rice bran oil', 'palm oil', 'ghee'
  ],
  cleaning: [
    'detergent', 'washing powder', 'fabric softener', 'dishwash', 'floor cleaner',
    'toilet cleaner', 'glass cleaner', 'disinfectant', 'bleach', 'scrubber',
    'sponge', 'mop', 'broom', 'dustbin', 'garbage bags', 'tissue paper'
  ],
  personal_care: [
    'razor', 'shaving cream', 'aftershave', 'moisturizer', 'face cream', 'night cream',
    'eye cream', 'lip balm', 'nail polish', 'makeup', 'foundation', 'lipstick',
    'mascara', 'eyeliner', 'hair oil', 'hair mask', 'conditioner'
  ]
};

const quantityPatterns = [
  /(\d+(?:\.\d+)?)\s*(kg|kgs|kilogram|kilograms)/i,
  /(\d+(?:\.\d+)?)\s*(g|gms|gram|grams)/i,
  /(\d+(?:\.\d+)?)\s*(l|ltr|liter|liters|litre|litres)/i,
  /(\d+(?:\.\d+)?)\s*(ml|milliliter|milliliters|millilitre|millilitres)/i,
  /(\d+(?:\.\d+)?)\s*(pc|pcs|piece|pieces)/i,
  /(\d+(?:\.\d+)?)\s*(pack|packs|packet|packets)/i,
  /(\d+(?:\.\d+)?)\s*(dozen)/i
];

const brandKeywords = [
  'amul', 'dettol', 'india gate', 'harvest gold', 'patanjali', 'mother dairy',
  'nestle', 'britannia', 'parle', 'cadbury', 'coca cola', 'pepsi', 'lays',
  'kurkure', 'maggi', 'knorr', 'kissan', 'heinz', 'del monte', 'mtr',
  'everest', 'mdh', 'catch', 'tata', 'reliance', 'fortune', 'saffola',
  'sundrop', 'dalda', 'vim', 'surf excel', 'ariel', 'tide', 'rin',
  'colgate', 'pepsodent', 'close up', 'sensodyne', 'oral b', 'head shoulders',
  'pantene', 'loreal', 'garnier', 'lakme', 'maybelline', 'revlon'
];

export class AIService {
  static normalizeQuery(query: string): SearchQuery {
    const normalized = {
      product: '',
      quantity: undefined as string | undefined,
      brand: undefined as string | undefined,
      category: undefined as string | undefined
    };

    let processedQuery = query.toLowerCase().trim();
    const suggestions: string[] = [];

    // Extract quantity
    for (const pattern of quantityPatterns) {
      const match = processedQuery.match(pattern);
      if (match) {
        normalized.quantity = `${match[1]} ${match[2].toLowerCase()}`;
        processedQuery = processedQuery.replace(pattern, '').trim();
        break;
      }
    }

    // Extract brand
    for (const brand of brandKeywords) {
      if (processedQuery.includes(brand)) {
        normalized.brand = brand;
        processedQuery = processedQuery.replace(brand, '').trim();
        break;
      }
    }

    // Determine category and clean product name
    for (const [category, keywords] of Object.entries(productKeywords)) {
      for (const keyword of keywords) {
        if (processedQuery.includes(keyword)) {
          normalized.category = category;
          normalized.product = keyword;
          break;
        }
      }
      if (normalized.category) break;
    }

    // If no specific product found, use the cleaned query
    if (!normalized.product) {
      normalized.product = processedQuery;
      
      // Generate suggestions for unknown products
      suggestions.push(
        ...Object.values(productKeywords).flat().slice(0, 5)
      );
    }

    return {
      raw: query,
      normalized,
      suggestions: suggestions.length > 0 ? suggestions : undefined
    };
  }

  static generateSuggestions(query: string): string[] {
    const suggestions = [
      '1 kg onions', '500 ml dettol', '1 liter milk', '5 kg basmati rice', '400g bread',
      '1 kg potatoes', '500 ml hand sanitizer', '200g butter', '1 kg tomatoes',
      '250g paneer', '1 liter cooking oil', '500g sugar', '1 kg wheat flour',
      '200ml shampoo', '100g tea', '500ml orange juice', '1 kg apples',
      '250ml coconut oil', '1 pack biscuits', '500g dal', '1 kg chicken',
      '250g cheese', '1 liter coconut water', '500g pasta', '200g chocolate',
      '1 kg bananas', '500ml face wash', '250g almonds', '1 pack chips'
    ];

    const queryLower = query.toLowerCase();
    return suggestions.filter(s => {
      const suggestionLower = s.toLowerCase();
      return suggestionLower.includes(queryLower) ||
             queryLower.split(' ').some(word => 
               word.length > 2 && suggestionLower.includes(word)
             );
    }).slice(0, 6);
  }
}