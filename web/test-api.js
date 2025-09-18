/**
 * Test script for Carbon Cost API
 */

const fetch = require('node-fetch');

async function testAPI() {
  console.log('🧪 Testing Carbon Cost API...\n');
  
  const baseUrl = 'http://localhost:3000';
  
  try {
    // Test Tips API
    console.log('1. Testing Tips API...');
    const tipsResponse = await fetch(`${baseUrl}/api/tips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: 'youtube.com',
        bytes: 1073741824 // 1GB
      })
    });
    
    if (tipsResponse.ok) {
      const tipsData = await tipsResponse.json();
      console.log('✅ Tips API Response:');
      console.log(`   Quick: ${tipsData.quick}`);
      console.log(`   Source: ${tipsData.source}`);
      console.log(`   Cached: ${tipsData.cached}`);
      console.log(`   Latency: ${tipsData.latencyMs}ms\n`);
    } else {
      console.log('❌ Tips API Error:', tipsResponse.status, tipsResponse.statusText);
    }
    
    // Test Deep API
    console.log('2. Testing Deep API...');
    const deepResponse = await fetch(`${baseUrl}/api/deep`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: 'youtube.com',
        bytes: 1073741824 // 1GB
      })
    });
    
    if (deepResponse.ok) {
      const deepData = await deepResponse.json();
      console.log('✅ Deep API Response:');
      console.log(`   Source: ${deepData.source}`);
      console.log(`   Latency: ${deepData.latencyMs}ms`);
      console.log(`   Analysis preview: ${deepData.deep.substring(0, 100)}...\n`);
    } else {
      console.log('❌ Deep API Error:', deepResponse.status, deepResponse.statusText);
    }
    
  } catch (error) {
    console.log('❌ Connection Error:', error.message);
    console.log('💡 Make sure the Vercel dev server is running: vercel dev');
  }
}

testAPI();
