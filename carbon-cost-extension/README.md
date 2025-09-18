# Carbon Cost of the Web - Chrome Extension

A Chrome extension that measures your web carbon footprint and provides AI-powered tips to reduce it. Built with TypeScript, React, and Vite.

## 🌱 Features

- **Real-time Tracking**: Measures network transfer using Performance API
- **Carbon Conversion**: Converts bytes → GB → kWh → CO₂ using configurable constants
- **AI-Powered Tips**: Quick tips (Google Nano) and deep analysis (OpenAI)
- **Privacy-First**: Only sends domain and bytes to servers
- **Customizable**: Editable conversion constants and regional presets
- **Simulation Mode**: Test with simulated 1-hour streaming data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Chrome browser
- (Optional) API keys for AI features

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd carbon-cost-extension
   npm install
   ```

2. **Build the extension:**
   ```bash
   npm run build
   ```

3. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

4. **Create extension ZIP (optional):**
   ```bash
   npm run zip
   ```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Create extension ZIP
npm run zip
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` file with your API keys:

```env
# Vercel AI SDK Key (for Google Nano)
VERCEL_AI_KEY=your_vercel_ai_key_here

# OpenAI API Key (for Deep Analysis)
OPENAI_API_KEY=your_openai_api_key_here

# Upstash Redis (optional, for caching)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here
```

**Note**: The extension works in mock mode without API keys for demo purposes.

### Conversion Constants

Default values (customizable in settings):
- **Energy per GB**: 0.06 kWh/GB (global average)
- **CO₂ per kWh**: 0.475 kg CO₂/kWh (global average)

Regional presets available:
- **Europe (Clean)**: 0.05 kWh/GB, 0.3 kg CO₂/kWh
- **US (Mixed)**: 0.07 kWh/GB, 0.6 kg CO₂/kWh  
- **Asia (Coal-heavy)**: 0.08 kWh/GB, 0.8 kg CO₂/kWh

## 📊 How It Works

### Data Collection
1. **Content Script** runs on every page using PerformanceObserver
2. **Background Service Worker** accumulates per-tab statistics
3. **Popup** displays real-time stats and provides AI tips

### Privacy Protection
- Only domain name and total bytes are sent to servers
- No URLs, cookies, headers, or personal data collected
- Opt-out toggle available in settings
- All data processing happens locally first

### AI Integration
- **Quick Tips**: Uses Vercel AI SDK with Google Nano (cached 30-60 min)
- **Deep Analysis**: Uses OpenAI GPT-4 for detailed recommendations
- **Fallback**: Mock responses when APIs are unavailable

## 🏗️ Architecture

```
src/
├── popup.tsx              # Main popup entry point
├── App.tsx                # React app component
├── components/            # React components
│   ├── StatsCard.tsx      # Statistics display
│   ├── TipsPanel.tsx      # AI tips interface
│   └── SettingsPanel.tsx  # Configuration UI
├── contentScript.ts       # Performance monitoring
├── background.ts          # Service worker
├── utils/
│   └── conversions.ts     # Carbon conversion logic
└── types.ts               # TypeScript definitions

web/
└── api/
    ├── tips.ts            # Quick tips API (Vercel Edge)
    └── deep.ts            # Deep analysis API (Node.js)
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with UI
npm run test:ui

# Run specific test file
npm test conversions.test.ts
```

## 📦 Building & Deployment

### Chrome Web Store
1. Build the extension: `npm run build`
2. Create ZIP: `npm run zip`
3. Upload `carbon-cost-extension.zip` to Chrome Web Store

### Vercel API Deployment
1. Deploy the `web/` folder to Vercel
2. Set environment variables in Vercel dashboard
3. Update API endpoints in the extension code

## 🔒 Privacy & Security

- **Data Minimization**: Only essential data (domain + bytes) is collected
- **Local Processing**: All calculations happen in the browser
- **Transparent**: Clear privacy notice in the UI
- **Opt-out**: Users can disable data sending entirely
- **No Tracking**: No user identification or cross-site tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Issues**: Report bugs and feature requests on GitHub
- **Documentation**: Check the QA.md file for troubleshooting
- **Demo**: See slides.md for presentation materials

## 🌍 Impact

This extension helps users understand and reduce their digital carbon footprint by:
- Making invisible data transfer visible
- Providing actionable optimization tips
- Encouraging sustainable web practices
- Supporting the transition to a greener internet

---

**Built with ❤️ for a sustainable web**
