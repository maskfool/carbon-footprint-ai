# 🚀 Public Deployment Guide

## ✅ **Your API is Working Locally!**

Your API is working perfectly with real OpenAI responses. Now let's deploy it for public use.

## 🌐 **Step 1: Deploy API to Vercel**

### **Option A: Vercel Dashboard (Easiest)**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import from GitHub**:
   - Connect your GitHub account
   - Select this repository: `maskfool/carbon-footprint-ai`
   - Choose the `web` folder as root directory
4. **Set Environment Variable**:
   - Go to Project Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = `your-openai-api-key-here`
5. **Deploy**: Click "Deploy"

### **Option B: Vercel CLI (Alternative)**

```bash
cd web
vercel --prod --yes
```

## 🔗 **Step 2: Get Your API URL**

After deployment, you'll get a URL like:
`https://your-project-name.vercel.app`

## 🔧 **Step 3: Update Extension with Production API**

Update the extension to use your production API URL:

### **File: carbon-cost-extension/src/components/TipsPanel.tsx**

Replace:
```typescript
const response = await fetch('http://localhost:3000/api/tips', {
```

With:
```typescript
const response = await fetch('https://your-actual-vercel-url.vercel.app/api/tips', {
```

And:
```typescript
const response = await fetch('http://localhost:3000/api/deep', {
```

With:
```typescript
const response = await fetch('https://your-actual-vercel-url.vercel.app/api/deep', {
```

## 🏗️ **Step 4: Build Extension for Distribution**

```bash
cd carbon-cost-extension
npm run build:extension
npm run zip
```

This creates `carbon-cost-extension.zip` ready for distribution.

## 📦 **Step 5: Distribute the Extension**

### **Option A: Chrome Web Store (Recommended)**

1. **Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)**
2. **Pay $5 one-time registration fee**
3. **Upload** `carbon-cost-extension.zip`
4. **Fill out store listing**:
   - Name: "Carbon Cost of the Web"
   - Description: "Measure and reduce your web carbon footprint with AI-powered tips"
   - Screenshots: Take screenshots of the extension
   - Privacy policy: Create a simple privacy policy
5. **Submit for review** (usually takes 1-3 days)

### **Option B: Direct Distribution**

1. **Share the ZIP file** with users
2. **Users load it** as an unpacked extension
3. **Instructions for users**:
   - Download the ZIP file
   - Extract it
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extracted folder

## 🧪 **Step 6: Test Production Deployment**

### **Test API Endpoints**

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

### **Test Extension**

1. **Load the updated extension** in Chrome
2. **Visit any website** (e.g., YouTube)
3. **Click extension icon** 🌱
4. **Test Tips and Deep Analysis** - Should work with production API

## 💰 **Cost Management**

### **OpenAI API Costs**
- **GPT-3.5-turbo**: ~$0.001 per 1K tokens
- **GPT-4**: ~$0.03 per 1K tokens
- **1000 users/day**: ~$5-15/month

### **Vercel Costs**
- **Hobby Plan**: Free (100GB bandwidth)
- **Pro Plan**: $20/month (1TB bandwidth)

## 📊 **Monitoring & Analytics**

### **Track Usage**
- **Vercel Dashboard**: Monitor API calls
- **OpenAI Dashboard**: Track token usage
- **Chrome Web Store**: User downloads and reviews

### **Set Limits**
- **OpenAI Usage Limits**: Set monthly spending limits
- **Rate Limiting**: Implement rate limiting if needed

## 🎯 **Success Metrics**

Track these metrics:
- **Extension Downloads**: Chrome Web Store analytics
- **API Usage**: Vercel function invocations
- **User Engagement**: Tips clicked, settings changed
- **Carbon Impact**: Estimated CO₂ savings

## 🚀 **Launch Checklist**

- [ ] API deployed to Vercel
- [ ] Environment variables set
- [ ] Extension updated with production API URL
- [ ] Extension built and zipped
- [ ] Chrome Web Store listing created
- [ ] Privacy policy created
- [ ] Screenshots taken
- [ ] Tested with production API
- [ ] Submitted for review

## 📱 **Marketing & Promotion**

### **Chrome Web Store Listing**
- **Compelling description**
- **High-quality screenshots**
- **Keywords**: carbon footprint, sustainability, AI, web performance
- **Categories**: Productivity, Developer Tools

### **Social Media**
- **Twitter/X**: Share the extension
- **LinkedIn**: Professional network
- **GitHub**: Open source community

---

**Your extension is ready for public use! 🎉**

**Next Steps:**
1. Deploy API to Vercel
2. Update extension with production URL
3. Submit to Chrome Web Store
4. Share with the world! 🌍