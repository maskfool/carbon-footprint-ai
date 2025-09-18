# Testing Guide - Carbon Cost Extension

## 🧪 Quick Test Scenarios

### Test 1: Basic Functionality
1. **Load Extension**: Follow the Chrome loading steps above
2. **Visit Simple Site**: Go to `https://example.com`
3. **Check Stats**: Click extension icon, verify data appears
4. **Expected**: Domain shows "example.com", bytes > 0

### Test 2: Data-Heavy Sites
1. **Visit YouTube**: `https://youtube.com`
2. **Watch a Video**: Let it load for 10-15 seconds
3. **Check Stats**: Click extension, see higher byte count
4. **Expected**: Much higher data usage, CO₂ calculations

### Test 3: AI Tips (Mock Mode)
1. **Open Extension Popup**
2. **Go to Tips Tab**
3. **Click "Quick Tips"** button
4. **Expected**: Mock tips appear (works without API keys)

### Test 4: Settings
1. **Go to Settings Tab**
2. **Change Energy per GB**: Try 0.08
3. **Change CO₂ per kWh**: Try 0.6
4. **Go back to Stats**: See updated calculations

### Test 5: Simulation Mode
1. **Go to Stats Tab**
2. **Click "Simulate 1h Streaming"**
3. **Expected**: Stats jump to ~1GB, high CO₂ values

## 🔧 Debugging Tips

### Check Console for Errors
1. **Right-click extension icon** → "Inspect popup"
2. **Check Console tab** for any errors
3. **Refresh page** if needed

### Verify Data Collection
1. **Open DevTools** (F12)
2. **Go to Console**
3. **Type**: `window.carbonMonitor.getStats()`
4. **Expected**: Returns current stats object

### Check Background Script
1. **Go to** `chrome://extensions/`
2. **Click "Service Worker"** link under the extension
3. **Check Console** for background script logs

## 🌐 Test Websites by Data Usage

### Low Usage (Good for testing)
- `https://example.com` - Simple HTML
- `https://httpbin.org` - API testing
- `https://jsonplaceholder.typicode.com` - Lightweight API

### Medium Usage
- `https://github.com` - Code repository
- `https://stackoverflow.com` - Q&A site
- `https://news.ycombinator.com` - News aggregator

### High Usage (Great for demo)
- `https://youtube.com` - Video streaming
- `https://netflix.com` - Video streaming
- `https://twitch.tv` - Live streaming
- `https://facebook.com` - Social media

## 🎯 Demo Script

### For Presentations
1. **Start with simple site** (example.com) - show low usage
2. **Navigate to YouTube** - show dramatic increase
3. **Click Quick Tips** - show AI recommendations
4. **Go to Settings** - show customization
5. **Use Simulation** - show 1GB streaming impact

### Expected Results
- **Real-time updates** every 2 seconds
- **Accurate calculations** (bytes → GB → kWh → CO₂)
- **Responsive UI** with smooth transitions
- **Working tips** (mock or real depending on API setup)

## 🐛 Common Issues & Solutions

### Extension Not Loading
- **Check manifest.json** syntax
- **Verify all files** in dist/ folder
- **Reload extension** in chrome://extensions/

### No Data Showing
- **Refresh the page** after loading extension
- **Check Performance API** support in browser
- **Verify content script** is running

### Tips Not Working
- **Check network requests** in DevTools
- **Verify API endpoints** are accessible
- **Try mock mode** (should work offline)

### Build Errors
- **Run**: `npm run build:extension`
- **Check TypeScript errors**
- **Verify all dependencies** installed

## 📊 Performance Testing

### Memory Usage
1. **Open Chrome Task Manager** (Shift+Esc)
2. **Look for extension** processes
3. **Navigate multiple sites**
4. **Verify memory** doesn't grow excessively

### CPU Usage
1. **Monitor CPU** during browsing
2. **Check for** excessive usage
3. **Verify** 2-second polling isn't too aggressive

## ✅ Success Criteria

The extension is working correctly if:
- [ ] Loads without errors in Chrome
- [ ] Shows real-time data on any website
- [ ] Calculations are mathematically correct
- [ ] UI is responsive and intuitive
- [ ] Tips work (mock or real)
- [ ] Settings persist and affect calculations
- [ ] Simulation mode works
- [ ] No memory leaks or performance issues

## 🚀 Next Steps After Testing

1. **Fix any issues** found during testing
2. **Deploy API** to Vercel for real AI tips
3. **Submit to Chrome Web Store**
4. **Gather user feedback**
5. **Iterate and improve**

---

**Happy Testing! 🌱**
