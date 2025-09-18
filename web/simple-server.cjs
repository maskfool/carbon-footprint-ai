/**
 * Simple test server for Carbon Cost API
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock tips endpoint
app.post('/api/tips', async (req, res) => {
  console.log('📝 Tips API called:', req.body);
  
  const { domain, bytes } = req.body;
  const gb = (bytes / (1024 * 1024 * 1024)).toFixed(2);
  
  try {
    // Test OpenAI API
    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiKey) {
      throw new Error('No OpenAI API key found');
    }
    
    console.log('🤖 Calling OpenAI API...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a brief assistant focused on reducing web energy and network usage. Provide short actionable tips.'
          },
          {
            role: 'user',
            content: `A user visited ${domain} and transferred ${gb} GB of data. Provide 3 short actionable tips a typical user can do right now to reduce bandwidth and energy consumption. Keep it under 40 words.`
          }
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const tips = data.choices[0]?.message?.content || 'No tips available';
    
    console.log('✅ OpenAI Response:', tips);
    
    res.json({
      quick: tips,
      source: 'openai',
      cached: false,
      latencyMs: Date.now() - Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Fallback response
    res.json({
      quick: `💡 Quick tips for ${domain}: 1) Enable data saver mode 2) Close unused tabs 3) Use ad blockers`,
      source: 'mock',
      cached: false,
      latencyMs: 100
    });
  }
});

// Mock deep endpoint
app.post('/api/deep', async (req, res) => {
  console.log('🔍 Deep API called:', req.body);
  
  const { domain, bytes } = req.body;
  const gb = (bytes / (1024 * 1024 * 1024)).toFixed(2);
  
  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiKey) {
      throw new Error('No OpenAI API key found');
    }
    
    console.log('🤖 Calling OpenAI API for deep analysis...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert web performance engineer and sustainability advisor. Provide detailed developer-focused recommendations including rationale, estimated % bandwidth savings, effort level (low/medium/high), and concrete implementation steps. Prioritize suggestions that reduce network transfer, compute, or storage costs.'
          },
          {
            role: 'user',
            content: `The website ${domain} transferred ${gb} GB for a typical user session (one load). Provide 6 detailed recommendations for developers and site operators (bundle splitting, image formats, caching, streaming settings, infra/edge region, serverless vs always-on). For each, include: short description, estimated % bandwidth reduction, estimated implementation effort (low/medium/high).`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0]?.message?.content || 'No analysis available';
    
    console.log('✅ OpenAI Deep Analysis Response');
    
    res.json({
      deep: analysis,
      estimatedSavings: {
        bundleSplitting: '30%',
        imageOptimization: '25%',
        caching: '40%'
      },
      source: 'openai',
      latencyMs: Date.now() - Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Fallback response
    res.json({
      deep: `🔍 **Deep Analysis for ${domain} (${gb} GB)**\n\n**1. Bundle Splitting** (Medium effort, ~30% savings)\n   - Implement code splitting for JavaScript bundles\n   - Load only necessary components on initial page load\n\n**2. Image Optimization** (Low effort, ~25% savings)\n   - Convert images to WebP format\n   - Implement responsive images with srcset\n\n**3. Caching Strategy** (Low effort, ~40% savings)\n   - Set proper cache headers for static assets\n   - Implement service worker for offline caching`,
      estimatedSavings: {
        bundleSplitting: '30%',
        imageOptimization: '25%',
        caching: '40%'
      },
      source: 'mock',
      latencyMs: 100
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Carbon Cost API server running on http://localhost:${port}`);
  console.log(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`📝 Test Tips: curl -X POST http://localhost:${port}/api/tips -H "Content-Type: application/json" -d '{"domain": "youtube.com", "bytes": 1073741824}'`);
  console.log(`🔍 Test Deep: curl -X POST http://localhost:${port}/api/deep -H "Content-Type: application/json" -d '{"domain": "youtube.com", "bytes": 1073741824}'`);
});
