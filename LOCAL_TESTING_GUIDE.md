# 🧪 Local Testing Guide

## ✅ **Your OpenAI API Key is Ready!**

I can see you've added your OpenAI API key to `web/.env.local`. Now let's test it locally before deploying.

## 🚀 **Step 1: Start Local Server**

Open **two terminal windows**:

### **Terminal 1: Start Vercel Dev Server**
```bash
cd /Users/shubham/Developer/genAI/carbon/web
vercel dev
```

This will start the API server on `http://localhost:3000`

### **Terminal 2: Test the API**
```bash
cd /Users/shubham/Developer/genAI/carbon/web
node test-api.js
```

## 🧪 **Step 2: Manual API Testing**

### **Test Tips API**
```bash
curl -X POST http://localhost:3000/api/tips \
  -H "Content-Type: application/json" \
  -d '{"domain": "youtube.com", "bytes": 1073741824}'
```

### **Test Deep API**
```bash
curl -X POST http://localhost:3000/api/deep \
  -H "Content-Type: application/json" \
  -d '{"domain": "youtube.com", "bytes": 1073741824}'
```

## 🔧 **Step 3: Update Extension for Local Testing**

### **Update TipsPanel.tsx**
Replace the API URLs in `carbon-cost-extension/src/components/TipsPanel.tsx`:

```typescript
// Change from:
const response = await fetch('https://carbon-cost-api.vercel.app/api/tips', {

// To:
const response = await fetch('http://localhost:3000/api/tips', {
```

And:

```typescript
// Change from:
const response = await fetch('https://carbon-cost-api.vercel.app/api/deep', {

// To:
const response = await fetch('http://localhost:3000/api/deep', {
```

### **Rebuild Extension**
```bash
cd /Users/shubham/Developer/genAI/carbon/carbon-cost-extension
npm run build:extension
```

## 🧪 **Step 4: Test Extension with Local API**

1. **Reload extension** in Chrome
2. **Visit any website** (e.g., YouTube)
3. **Click extension icon** 🌱
4. **Go to Tips tab**
5. **Click "Quick Tips"** - Should show real AI-generated tips!
6. **Click "Deep Analysis"** - Should show detailed AI recommendations!

## ✅ **Expected Results**

### **Tips API Response**
```json
{
  "quick": "🎥 YouTube: 1) Use 480p quality 2) Disable autoplay 3) Close other videos",
  "source": "openai",
  "cached": false,
  "latencyMs": 1500
}
```

### **Deep API Response**
```json
{
  "deep": "🔍 **Deep Analysis for YouTube (1.00 GB)**\n\n**1. Video Quality Optimization**...",
  "estimatedSavings": {...},
  "source": "openai",
  "latencyMs": 3000
}
```

## 🐛 **Troubleshooting**

### **API Not Responding**
- Check if Vercel dev server is running
- Verify port 3000 is not blocked
- Check console for errors

### **OpenAI API Errors**
- Verify API key is correct
- Check if you have credits in OpenAI account
- Ensure API key has proper permissions

### **Extension Not Loading**
- Rebuild extension after changing API URLs
- Reload extension in Chrome
- Check browser console for CORS errors

## 🚀 **Step 5: Deploy to Vercel**

Once local testing works:

1. **Deploy to Vercel**:
   ```bash
   cd /Users/shubham/Developer/genAI/carbon/web
   vercel --prod
   ```

2. **Add environment variable** in Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = `your-key-here`

3. **Update extension** with Vercel URL
4. **Rebuild and test** extension

## 💰 **Cost Monitoring**

- **OpenAI Usage**: Check [OpenAI Usage Dashboard](https://platform.openai.com/usage)
- **Expected Cost**: ~$0.001 per request
- **100 requests**: ~$0.10

---

**Ready to test! Start the Vercel dev server and run the test script! 🚀**
