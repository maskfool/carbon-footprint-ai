# 🚀 Real AI API Deployment Guide

## 📋 **Prerequisites**

1. **OpenAI API Key** (get from [OpenAI Platform](https://platform.openai.com/api-keys))
2. **Vercel Account** (sign up at [vercel.com](https://vercel.com))
3. **GitHub Account** (for easy deployment)

## 🔧 **Step 1: Get OpenAI API Key**

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up/Login
3. Go to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key (starts with `sk-...`)
6. **Important**: Add some credits to your OpenAI account ($5-10 should be enough for testing)

## 🚀 **Step 2: Deploy to Vercel**

### **Option A: Deploy via Vercel Dashboard (Easiest)**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import from GitHub**:
   - Connect your GitHub account
   - Select this repository
   - Choose the `web` folder as root directory
4. **Set Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = `your_openai_key_here`
5. **Deploy**: Click "Deploy"

### **Option B: Deploy via CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to web folder
cd /Users/shubham/Developer/genAI/carbon/web

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variable
vercel env add OPENAI_API_KEY
# Enter your OpenAI API key when prompted
```

## 🔗 **Step 3: Update Extension with API URL**

After deployment, Vercel will give you a URL like `https://your-project-name.vercel.app`

Update the extension to use your API URL:

```bash
# Edit the extension files
cd /Users/shubham/Developer/genAI/carbon/carbon-cost-extension

# Update API URLs in TipsPanel.tsx
# Replace: https://carbon-cost-api.vercel.app
# With: https://your-actual-vercel-url.vercel.app
```

## 🧪 **Step 4: Test the APIs**

### **Test Tips API**
```bash
curl -X POST https://your-vercel-url.vercel.app/api/tips \
  -H "Content-Type: application/json" \
  -d '{"domain": "youtube.com", "bytes": 1073741824}'
```

### **Test Deep API**
```bash
curl -X POST https://your-vercel-url.vercel.app/api/deep \
  -H "Content-Type: application/json" \
  -d '{"domain": "youtube.com", "bytes": 1073741824}'
```

## 🔄 **Step 5: Rebuild Extension**

```bash
cd /Users/shubham/Developer/genAI/carbon/carbon-cost-extension
npm run build:extension
```

## 🧪 **Step 6: Test in Chrome**

1. **Reload the extension** in Chrome
2. **Visit any website** (e.g., YouTube)
3. **Click extension icon** 🌱
4. **Go to Tips tab**
5. **Click "Quick Tips"** - Should show real AI-generated tips!
6. **Click "Deep Analysis"** - Should show detailed AI recommendations!

## 💰 **Cost Estimation**

### **OpenAI API Costs**
- **GPT-3.5-turbo**: ~$0.001 per 1K tokens
- **Quick Tips**: ~50 tokens = $0.00005 per request
- **Deep Analysis**: ~500 tokens = $0.0005 per request
- **1000 requests**: ~$0.55 total

### **Vercel Costs**
- **Hobby Plan**: Free for personal use
- **Pro Plan**: $20/month for production

## 🐛 **Troubleshooting**

### **API Not Working**
1. Check environment variables in Vercel dashboard
2. Verify OpenAI API key is valid
3. Check Vercel function logs
4. Ensure you have OpenAI credits

### **Extension Not Loading**
1. Rebuild extension: `npm run build:extension`
2. Reload extension in Chrome
3. Check browser console for errors

### **CORS Errors**
1. Check Vercel configuration
2. Verify API endpoints are accessible
3. Check network tab in DevTools

## ✅ **Success Indicators**

You'll know it's working when:
- [ ] API endpoints return real AI responses
- [ ] Extension shows personalized tips
- [ ] No mock responses in tips
- [ ] Deep analysis shows detailed recommendations
- [ ] Different domains get different tips

## 🎯 **Quick Test Commands**

```bash
# Test if API is working
curl https://your-vercel-url.vercel.app/api/tips

# Check environment variables
vercel env ls

# View function logs
vercel logs
```

---

**Once deployed, your extension will have real AI-powered tips! 🤖✨**
