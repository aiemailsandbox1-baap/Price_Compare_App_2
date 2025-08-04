# AI-Powered Grocery Price Comparison App

A comprehensive web application that compares grocery prices across multiple quick commerce platforms using AI-powered search capabilities.

## 🚀 Features

- **AI-Powered Search**: Intelligent query normalization and product matching
- **Multi-Platform Comparison**: Compare prices across Blinkit, Zepto, Swiggy Instamart, BigBasket, Amazon Fresh, and more
- **Real-time Data Integration**: Support for live API data and price updates
- **Smart Filtering**: Filter by platform, availability, price range
- **Responsive Design**: Beautiful, modern UI that works on all devices

## 🔧 Real-time Data Integration

### Current Implementation
The app currently uses enhanced mock data but is architected to support real-time data from multiple sources:

### 1. Official Partner APIs
- **BigBasket Partner API**: Requires official partnership
- **Amazon Product Advertising API**: Requires approval and API keys
- **Flipkart Affiliate API**: Available for approved affiliates

### 2. Price Comparison APIs
- **RapidAPI**: Multiple price comparison services
- **PriceAPI**: Dedicated price tracking API
- **SerpAPI**: Google Shopping results

### 3. Affiliate Networks
- **Commission Junction**: Product feeds and pricing
- **ShareASale**: Merchant product data
- **Impact**: Performance marketing platform

### 4. Web Scraping (Backend Required)
- Respectful scraping with rate limiting
- Robots.txt compliance
- User-agent identification

## 🛠️ Setup for Real-time Data

### Environment Variables
Create a `.env` file with the following keys:

```env
# Official APIs
BIGBASKET_API_KEY=your_bigbasket_key
AMAZON_ACCESS_KEY=your_amazon_key
AMAZON_SECRET_KEY=your_amazon_secret
FLIPKART_API_KEY=your_flipkart_key

# Price Comparison APIs
RAPIDAPI_KEY=your_rapidapi_key
PRICEAPI_KEY=your_priceapi_key
SERPAPI_KEY=your_serpapi_key

# Affiliate Networks
CJ_API_KEY=your_cj_key
CJ_WEBSITE_ID=your_cj_website_id
SHAREASALE_API_KEY=your_shareasale_key
IMPACT_API_KEY=your_impact_key
```

### API Integration Steps

1. **Google Shopping API** (Easiest to start with):
   ```bash
   # Sign up for SerpAPI
   # Add SERPAPI_KEY to environment variables
   # The app will automatically use real Google Shopping data
   ```

2. **Amazon Product Advertising API**:
   ```bash
   # Apply for Amazon Associates program
   # Request Product Advertising API access
   # Add credentials to environment variables
   ```

3. **Price Comparison Services**:
   ```bash
   # Sign up for RapidAPI
   # Subscribe to price comparison APIs
   # Add API keys to environment variables
   ```

## 🏗️ Architecture

### Data Flow
1. **User Query** → AI Service (normalization)
2. **Normalized Query** → Real-time Service (API calls)
3. **API Responses** → Data transformation
4. **Unified Results** → UI rendering

### Fallback Strategy
- Real-time APIs (primary)
- Cached data (secondary)
- Enhanced mock data (fallback)

## 🚦 Getting Started

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Add Environment Variables**:
   ```bash
   cp .env.example .env
   # Add your API keys
   ```

3. **Start Development**:
   ```bash
   npm run dev
   ```

## 📊 Data Sources Priority

1. **Official Platform APIs** (highest accuracy)
2. **Affiliate Network Feeds** (good coverage)
3. **Price Comparison APIs** (broad market data)
4. **Google Shopping** (public pricing)
5. **Enhanced Mock Data** (development/fallback)

## 🔒 Legal Considerations

- **API Terms**: Respect rate limits and terms of service
- **Web Scraping**: Only scrape publicly available data
- **Robots.txt**: Always check and respect robots.txt files
- **User Agents**: Identify your bot appropriately
- **Data Usage**: Comply with platform data usage policies

## 🎯 Next Steps for Production

1. **Backend Service**: Set up Node.js/Express backend for API orchestration
2. **Database**: Add Redis/MongoDB for caching and data storage
3. **Rate Limiting**: Implement proper rate limiting for API calls
4. **Error Handling**: Add comprehensive error handling and retry logic
5. **Monitoring**: Set up logging and monitoring for API health
6. **Caching Strategy**: Implement intelligent caching for better performance

## 📈 Performance Optimization

- **Parallel API Calls**: Fetch from multiple sources simultaneously
- **Intelligent Caching**: Cache results for 5-10 minutes
- **Progressive Loading**: Show results as they arrive
- **Error Recovery**: Graceful fallbacks when APIs fail

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your API integrations
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details