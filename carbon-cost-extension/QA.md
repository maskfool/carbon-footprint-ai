# QA Testing Guide - Carbon Cost Extension

## 🧪 Test Checklist

### Pre-Testing Setup

- [ ] Chrome browser (latest version)
- [ ] Node.js 18+ installed
- [ ] Extension built successfully (`npm run build`)
- [ ] Extension loaded in Chrome developer mode

### 1. Extension Installation & Loading

#### Test Extension Loading
- [ ] Navigate to `chrome://extensions/`
- [ ] Enable "Developer mode" toggle
- [ ] Click "Load unpacked" and select `dist/` folder
- [ ] Verify extension appears in extensions list
- [ ] Check extension icon appears in Chrome toolbar
- [ ] Click extension icon to open popup

**Expected Result**: Extension loads without errors, popup opens showing "No data available"

### 2. Basic Functionality Testing

#### Test Data Collection
- [ ] Navigate to any website (e.g., `https://example.com`)
- [ ] Wait 5-10 seconds for data collection
- [ ] Click extension icon to open popup
- [ ] Verify stats are displayed (domain, bytes, GB, kWh, CO₂)

**Expected Result**: Stats show current domain and non-zero values

#### Test Stats Accuracy
- [ ] Navigate to a data-heavy site (e.g., YouTube, Netflix)
- [ ] Let page load completely
- [ ] Check extension popup shows increased byte count
- [ ] Verify conversion calculations are reasonable

**Expected Result**: Higher data usage sites show larger numbers

### 3. UI Component Testing

#### Test Stats Tab
- [ ] Verify all stat cards display correctly
- [ ] Check "Reset Stats" button works
- [ ] Test "Simulate 1h Streaming" button
- [ ] Verify environmental impact message appears

**Expected Result**: All UI elements function correctly

#### Test Tips Tab
- [ ] Click "Quick Tips" button
- [ ] Verify tips appear (mock or real)
- [ ] Click "Deep Analysis" button  
- [ ] Verify detailed analysis appears
- [ ] Test with privacy disabled

**Expected Result**: Tips load successfully, privacy warning shows when disabled

#### Test Settings Tab
- [ ] Modify energy per GB value
- [ ] Modify CO₂ per kWh value
- [ ] Test regional presets
- [ ] Toggle privacy setting
- [ ] Reset to defaults

**Expected Result**: Settings persist and affect calculations

### 4. Privacy & Security Testing

#### Test Privacy Controls
- [ ] Disable privacy in settings
- [ ] Verify tips are disabled
- [ ] Re-enable privacy
- [ ] Verify tips work again
- [ ] Check privacy note appears

**Expected Result**: Privacy controls work as expected

#### Test Data Transmission
- [ ] Open Chrome DevTools → Network tab
- [ ] Click "Quick Tips" button
- [ ] Verify only domain + bytes are sent
- [ ] Check no personal data is transmitted

**Expected Result**: Only minimal data sent to servers

### 5. Performance Testing

#### Test Memory Usage
- [ ] Open Chrome Task Manager (Shift+Esc)
- [ ] Check extension memory usage
- [ ] Navigate to multiple sites
- [ ] Verify memory doesn't grow excessively

**Expected Result**: Memory usage remains reasonable

#### Test CPU Usage
- [ ] Monitor CPU usage during data collection
- [ ] Verify no excessive CPU usage
- [ ] Test on low-end device if available

**Expected Result**: CPU usage is minimal

### 6. Edge Case Testing

#### Test Error Handling
- [ ] Disconnect internet and test tips
- [ ] Test with invalid API responses
- [ ] Test with very large data transfers
- [ ] Test with zero data

**Expected Result**: Graceful fallbacks, no crashes

#### Test Different Sites
- [ ] Test on HTTPS sites
- [ ] Test on HTTP sites
- [ ] Test on localhost
- [ ] Test on sites with heavy JavaScript

**Expected Result**: Works on all site types

### 7. API Integration Testing

#### Test Quick Tips API
- [ ] Set up API keys in environment
- [ ] Test tips generation
- [ ] Verify caching works
- [ ] Test timeout handling

**Expected Result**: API calls work with proper fallbacks

#### Test Deep Analysis API
- [ ] Test deep analysis generation
- [ ] Verify detailed recommendations
- [ ] Test error handling
- [ ] Check response formatting

**Expected Result**: Deep analysis provides detailed, formatted recommendations

### 8. Cross-Browser Testing

#### Test Chrome Compatibility
- [ ] Test on Chrome 120+
- [ ] Test on Chrome 110+
- [ ] Test on Chrome 100+
- [ ] Verify all features work

**Expected Result**: Works on recent Chrome versions

### 9. Build & Deployment Testing

#### Test Build Process
- [ ] Run `npm run build`
- [ ] Verify no build errors
- [ ] Check all files generated in `dist/`
- [ ] Test extension loading from `dist/`

**Expected Result**: Clean build, all files present

#### Test ZIP Creation
- [ ] Run `npm run zip`
- [ ] Verify ZIP file created
- [ ] Check ZIP contains all necessary files
- [ ] Test loading from ZIP

**Expected Result**: ZIP contains complete extension

### 10. Unit Testing

#### Test Conversion Functions
- [ ] Run `npm test`
- [ ] Verify all tests pass
- [ ] Check test coverage
- [ ] Test edge cases

**Expected Result**: All tests pass, good coverage

## 🐛 Common Issues & Solutions

### Issue: Extension not loading
**Solution**: Check manifest.json syntax, ensure all files exist in dist/

### Issue: No data showing
**Solution**: Refresh page, check content script is running, verify PerformanceObserver support

### Issue: Tips not working
**Solution**: Check API keys, verify network connectivity, check privacy settings

### Issue: Build errors
**Solution**: Check TypeScript errors, ensure all dependencies installed

### Issue: Memory leaks
**Solution**: Check for proper cleanup in content script, verify observer disposal

## 📊 Performance Benchmarks

### Expected Performance
- **Memory Usage**: < 10MB per tab
- **CPU Usage**: < 1% during idle
- **Data Collection**: < 1ms per request
- **API Response**: < 3s for tips, < 12s for deep analysis

### Load Testing
- **Concurrent Tabs**: Test with 10+ tabs open
- **Long Sessions**: Test with 1+ hour usage
- **Heavy Sites**: Test with video streaming sites

## ✅ Sign-off Criteria

- [ ] All basic functionality works
- [ ] Privacy controls function correctly
- [ ] No memory leaks detected
- [ ] All unit tests pass
- [ ] Extension builds without errors
- [ ] Works on target Chrome versions
- [ ] API integration works with fallbacks
- [ ] UI is responsive and accessible

## 📝 Test Report Template

```
Test Date: [DATE]
Tester: [NAME]
Chrome Version: [VERSION]
Build Version: [VERSION]

PASSED TESTS:
- [List passed tests]

FAILED TESTS:
- [List failed tests with details]

ISSUES FOUND:
- [List any issues or bugs]

RECOMMENDATIONS:
- [Any improvements or fixes needed]
```

---

**Note**: This QA guide should be updated as new features are added or issues are discovered.
