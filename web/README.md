# Carbon Cost API

API endpoints for the Carbon Cost Chrome Extension.

## 🚀 Deployment

This API is designed to be deployed on Vercel.

### **Deploy to Vercel:**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import from GitHub**: `maskfool/carbon-footprint-ai`
4. **Choose `web` folder** as root directory
5. **Add Environment Variable**:
   - Name: `OPENAI_API_KEY`
   - Value: `your-openai-api-key-here`
6. **Deploy!**

## 📡 API Endpoints

### **Tips API**
- **URL**: `POST /api/tips`
- **Description**: Get quick AI-powered tips to reduce carbon footprint
- **Request Body**:
  ```json
  {
    "domain": "youtube.com",
    "bytes": 1073741824
  }
  ```
- **Response**:
  ```json
  {
    "quick": "1. Lower video quality settings...",
    "source": "openai",
    "cached": false,
    "latencyMs": 1500
  }
  ```

### **Deep Analysis API**
- **URL**: `POST /api/deep`
- **Description**: Get detailed technical analysis and recommendations
- **Request Body**:
  ```json
  {
    "domain": "youtube.com",
    "bytes": 1073741824
  }
  ```
- **Response**:
  ```json
  {
    "deep": "🔍 **Deep Analysis for YouTube**...",
    "estimatedSavings": {...},
    "source": "openai",
    "latencyMs": 3000
  }
  ```

## 🧪 Testing

After deployment, visit your Vercel URL to test the API endpoints with the built-in test interface.

Or test via curl:

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

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start local server
node simple-server.cjs
```

## 💰 Costs

- **OpenAI API**: ~$0.001 per 1K tokens (GPT-3.5)
- **Vercel**: Free (hobby plan)
- **Estimated monthly cost**: $5-15 for 1000 users/day
