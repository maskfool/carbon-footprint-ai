# Update Extension with Your API URL

## 🔗 **After Deploying to Vercel**

1. **Get your Vercel URL** (e.g., `https://carbon-cost-extension.vercel.app`)

2. **Update the extension files**:

### **File: carbon-cost-extension/src/components/TipsPanel.tsx**

Find these lines (around line 25 and 61):
```typescript
const response = await fetch('https://carbon-cost-api.vercel.app/api/tips', {
```

Replace with your actual Vercel URL:
```typescript
const response = await fetch('https://your-actual-vercel-url.vercel.app/api/tips', {
```

And:
```typescript
const response = await fetch('https://carbon-cost-api.vercel.app/api/deep', {
```

Replace with:
```typescript
const response = await fetch('https://your-actual-vercel-url.vercel.app/api/deep', {
```

3. **Rebuild the extension**:
```bash
cd carbon-cost-extension
npm run build:extension
```

4. **Reload in Chrome**:
   - Go to chrome://extensions/
   - Click refresh button on your extension
   - Test the AI features!

## 🧪 **Test Your API**

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

## ✅ **Success Indicators**

You'll know it's working when:
- [ ] API endpoints return real AI responses (not mock)
- [ ] Extension shows personalized tips
- [ ] Different domains get different tips
- [ ] Deep analysis shows detailed recommendations

---

**Your extension will now have real AI-powered tips! 🤖✨**
