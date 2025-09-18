# 🌱 Carbon Cost Chrome Extension

**Version:** 1.0.0  
**API:** https://carbon-footprint-ai-nu.vercel.app/

## 🚀 Installation

### **For Users:**
1. Download `carbon-cost-extension.zip`
2. Extract the ZIP file
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" (toggle in top right)
5. Click "Load unpacked" and select the extracted folder
6. Pin the extension to your toolbar

### **For Chrome Web Store:**
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Click "New Item"
3. Upload `carbon-cost-extension.zip`
4. Fill in store listing details
5. Submit for review

## ✨ Features

- **Real-time carbon tracking** - Monitor data transfer per website
- **AI-powered tips** - Get personalized recommendations
- **Deep analysis** - Detailed technical insights
- **Privacy-first** - Only sends domain and bytes to API
- **Live statistics** - See your carbon footprint in real-time

## 🔧 Technical Details

- **Manifest V3** - Latest Chrome extension standard
- **TypeScript + React** - Modern development stack
- **Vite build** - Fast, optimized builds
- **OpenAI integration** - Real AI responses
- **CORS enabled** - Works with live API

## 📱 API Endpoints

- **Tips API:** `POST /api/tips`
- **Deep API:** `POST /api/deep`
- **Live URL:** https://carbon-footprint-ai-nu.vercel.app/

## 🎨 Icons

All required icon sizes included:
- 16x16, 32x32, 48x48, 128x128 PNG files
- SVG icon for high DPI displays

## 📄 Files Included

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup UI
- `popup.js` - React application
- `popup.css` - Styling
- `background.js` - Service worker
- `content.js` - Content script
- `icons/` - All icon files
- `carbon-cost-extension.zip` - Chrome Web Store package
