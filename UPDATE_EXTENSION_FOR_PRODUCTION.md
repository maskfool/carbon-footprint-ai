# 🔧 Update Extension for Production

## After Vercel Deployment

Once you get your Vercel URL (e.g., `https://your-project-name.vercel.app`), update these files:

### **File: carbon-cost-extension/src/components/TipsPanel.tsx**

Replace these lines:

```typescript
// Line ~25: Change from
const response = await fetch('http://localhost:3000/api/tips', {

// To:
const response = await fetch('https://your-actual-vercel-url.vercel.app/api/tips', {

// Line ~61: Change from  
const response = await fetch('http://localhost:3000/api/deep', {

// To:
const response = await fetch('https://your-actual-vercel-url.vercel.app/api/deep', {
```

### **Rebuild Extension**

```bash
cd carbon-cost-extension
npm run build:extension
npm run zip
```

This creates `carbon-cost-extension.zip` ready for distribution.

## Test Production API

```bash
# Test Tips API
curl -X POST https://your-vercel-url.vercel.app/api/tips \
  -H "Content-Type: application/json" \
  -d '{"domain": "youtube.com", "bytes": 1073741824}'

# Test Deep API  
curl -X POST https://your-vercel-url.vercel.app/api/deep \
  -H "Content-Type: application/json" \
  -d '{"domain": "youtube.com", "bytes": 1073741824}'
```

## Deploy to Chrome Web Store

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Pay $5 one-time registration fee
3. Upload `carbon-cost-extension.zip`
4. Fill out store listing and submit for review
