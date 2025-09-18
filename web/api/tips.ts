/**
 * Vercel Edge API - Quick Tips using Google Nano
 * Cached responses for cost control
 */

import { NextRequest, NextResponse } from 'next/server'

interface TipsRequest {
  domain: string
  bytes: number
}

interface TipsResponse {
  quick: string
  source: 'nano'
  cached: boolean
  latencyMs: number
}

// In-memory cache (in production, use Redis/Upstash)
const cache = new Map<string, { response: TipsResponse; timestamp: number }>()
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

// Runtime will be auto-detected by Vercel

export default async function handler(req: NextRequest) {
  const startTime = Date.now()
  
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const { domain, bytes }: TipsRequest = await req.json()
    
    if (!domain || typeof bytes !== 'number') {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
    }

    // Check cache first
    const cacheKey = `${domain}-${Math.floor(bytes / 1024 / 1024)}` // Group by MB
    const cached = cache.get(cacheKey)
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      return NextResponse.json({
        ...cached.response,
        cached: true,
        latencyMs: Date.now() - startTime
      })
    }

    // Generate tips using Google Nano (or fallback)
    const tips = await generateQuickTips(domain, bytes)
    
    const response: TipsResponse = {
      quick: tips,
      source: 'nano',
      cached: false,
      latencyMs: Date.now() - startTime
    }

    // Cache the response
    cache.set(cacheKey, {
      response,
      timestamp: Date.now()
    })

    return NextResponse.json(response)

  } catch (error) {
    console.error('Tips API error:', error)
    
    // Return fallback tips on error
    const fallbackTips = `💡 Quick tips for ${domain}: 1) Enable data saver mode 2) Close unused tabs 3) Use ad blockers`
    
    return NextResponse.json({
      quick: fallbackTips,
      source: 'nano',
      cached: false,
      latencyMs: Date.now() - startTime
    })
  }
}

async function generateQuickTips(domain: string, bytes: number): Promise<string> {
  const gb = (bytes / (1024 * 1024 * 1024)).toFixed(2)
  
  // Check if we have OpenAI API key
  const openaiKey = process.env.OPENAI_API_KEY
  
  if (!openaiKey) {
    // Mock mode - return domain-specific tips
    return getMockTips(domain, gb)
  }

  try {
    // Use OpenAI API directly
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
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || getMockTips(domain, gb)
    
  } catch (error) {
    console.error('OpenAI generation failed:', error)
    return getMockTips(domain, gb)
  }
}

function getMockTips(domain: string, gb: string): string {
  const domainTips: Record<string, string> = {
    'youtube.com': `🎥 YouTube: 1) Use 480p quality 2) Disable autoplay 3) Close other videos`,
    'netflix.com': `📺 Netflix: 1) Lower video quality 2) Download for offline 3) Close unused apps`,
    'facebook.com': `📱 Facebook: 1) Disable autoplay videos 2) Use mobile app 3) Limit news feed`,
    'instagram.com': `📸 Instagram: 1) Disable video autoplay 2) Use data saver mode 3) Limit stories`,
    'twitter.com': `🐦 Twitter: 1) Disable video autoplay 2) Use mobile app 3) Limit media previews`,
    'tiktok.com': `🎵 TikTok: 1) Use WiFi only 2) Lower video quality 3) Close other apps`,
    'google.com': `🔍 Google: 1) Use text-only search 2) Disable images 3) Use mobile version`,
    'github.com': `💻 GitHub: 1) Use mobile view 2) Disable syntax highlighting 3) Limit file previews`,
  }

  // Find matching domain
  for (const [pattern, tips] of Object.entries(domainTips)) {
    if (domain.includes(pattern)) {
      return tips
    }
  }

  // Generic tips
  return `🌐 ${domain}: 1) Enable data saver mode 2) Close unused tabs 3) Use ad blockers`
}
