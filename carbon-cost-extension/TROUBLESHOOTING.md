# Troubleshooting Guide

## ✅ **Fixed Issues**

### 1. **Missing popup.html**
- **Problem**: Manifest was looking for `popup.html` but Vite built it as `src/popup.html`
- **Solution**: Updated build script to copy `src/popup.html` to `popup.html` in dist/
- **Status**: ✅ Fixed

### 2. **Missing Icon Files**
- **Problem**: Manifest referenced icon files that didn't exist
- **Solution**: Created PNG versions of the SVG icon for all required sizes
- **Status**: ✅ Fixed

### 3. **Service Worker API Error**
- **Problem**: `chrome.webNavigation.onBeforeNavigate` requires additional permission
- **Solution**: Added `"webNavigation"` permission to manifest
- **Status**: ✅ Fixed

## 🧪 **Testing Steps**

### 1. **Reload the Extension**
1. Go to `chrome://extensions/`
2. Find "Carbon Cost of the Web"
3. Click the **refresh/reload** button (🔄)
4. Check for any remaining errors

### 2. **Verify Files**
The `dist/` folder should contain:
```
dist/
├── manifest.json          ✅
├── popup.html            ✅
├── popup.js              ✅
├── popup.css             ✅
├── background.js         ✅
├── content.js            ✅
└── icons/
    ├── icon16.png        ✅
    ├── icon32.png        ✅
    ├── icon48.png        ✅
    └── icon128.png       ✅
```

### 3. **Test the Extension**
1. **Pin the extension** to toolbar
2. **Visit any website** (e.g., `https://example.com`)
3. **Click the extension icon** 🌱
4. **Verify popup opens** without errors

## 🐛 **Common Issues & Solutions**

### Issue: Extension still shows errors
**Solution**: 
1. Remove the extension completely
2. Reload the page
3. Load the extension again from `dist/` folder

### Issue: Popup doesn't open
**Solution**:
1. Check that `popup.html` exists in `dist/`
2. Verify manifest.json has correct popup path
3. Check browser console for errors

### Issue: No data showing
**Solution**:
1. Refresh the current page after loading extension
2. Check that content script is running
3. Verify Performance API is supported

### Issue: Service worker errors
**Solution**:
1. Check that `webNavigation` permission is in manifest
2. Verify background.js is loading correctly
3. Check Chrome's service worker console

## 🔧 **Debug Commands**

### Check Extension Status
```javascript
// In Chrome console
chrome.management.get('your-extension-id', console.log)
```

### Check Content Script
```javascript
// In page console
window.carbonMonitor.getStats()
```

### Check Background Script
1. Go to `chrome://extensions/`
2. Click "Service Worker" under the extension
3. Check console for logs

## ✅ **Success Indicators**

The extension is working correctly when:
- [ ] Loads without errors in Chrome
- [ ] Popup opens when clicking icon
- [ ] Shows real-time data on websites
- [ ] All three tabs (Stats, Tips, Settings) work
- [ ] No console errors
- [ ] Icons display correctly

## 🚀 **Next Steps**

Once the extension loads successfully:
1. **Test on different websites**
2. **Try the AI tips** (mock mode)
3. **Adjust settings** and see changes
4. **Use simulation mode** for demo

---

**The extension should now work perfectly! 🌱**
