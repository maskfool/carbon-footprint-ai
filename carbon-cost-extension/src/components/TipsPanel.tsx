import React, { useState } from 'react'
import { TabStats, TipsResponse, DeepResponse } from '../types'

interface TipsPanelProps {
  stats: TabStats | null
  privacyEnabled: boolean
}

const TipsPanel: React.FC<TipsPanelProps> = ({ stats, privacyEnabled }) => {
  const [quickTips, setQuickTips] = useState<string | null>(null)
  const [deepTips, setDeepTips] = useState<string | null>(null)
  const [loading, setLoading] = useState<'quick' | 'deep' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const callQuickTips = async () => {
    if (!stats || !privacyEnabled) {
      setError('No data available or privacy disabled')
      return
    }

    setLoading('quick')
    setError(null)

    try {
        const response = await fetch('https://carbon-footprint-ai-nu.vercel.app/api/tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: stats.domain,
          bytes: stats.totalBytes
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: TipsResponse = await response.json()
      setQuickTips(data.quick)
    } catch (err) {
      setError(`Quick tips failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      // Fallback to mock tips
      setQuickTips(`💡 Quick tips for ${stats.domain}: 1) Enable data saver mode 2) Close unused tabs 3) Use ad blockers`)
    } finally {
      setLoading(null)
    }
  }

  const callDeepAnalysis = async () => {
    if (!stats || !privacyEnabled) {
      setError('No data available or privacy disabled')
      return
    }

    setLoading('deep')
    setError(null)

    try {
        const response = await fetch('https://carbon-footprint-ai-nu.vercel.app/api/deep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: stats.domain,
          bytes: stats.totalBytes
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: DeepResponse = await response.json()
      setDeepTips(data.deep)
    } catch (err) {
      setError(`Deep analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      // Fallback to mock analysis
      setDeepTips(`🔍 Deep analysis for ${stats.domain}:\n\n1. **Bundle Splitting** (Medium effort, ~30% savings)\n   - Implement code splitting for JavaScript bundles\n   - Load only necessary components on initial page load\n\n2. **Image Optimization** (Low effort, ~25% savings)\n   - Convert images to WebP format\n   - Implement responsive images with srcset\n\n3. **Caching Strategy** (Low effort, ~40% savings)\n   - Set proper cache headers for static assets\n   - Implement service worker for offline caching`)
    } finally {
      setLoading(null)
    }
  }

  if (!stats) {
    return (
      <div className="tips-panel">
        <div className="no-data">
          <p>No data available</p>
          <p>Navigate to a website to get personalized tips</p>
        </div>
      </div>
    )
  }

  return (
    <div className="tips-panel">
      <div className="tips-header">
        <h2>AI-Powered Tips</h2>
        <p>Get personalized recommendations to reduce your carbon footprint</p>
      </div>

      {!privacyEnabled && (
        <div className="privacy-warning">
          <p>⚠️ Privacy mode is disabled. Tips are not available.</p>
        </div>
      )}

      <div className="tips-actions">
        <button 
          className="btn btn-primary"
          onClick={callQuickTips}
          disabled={loading === 'quick' || !privacyEnabled}
        >
          {loading === 'quick' ? 'Loading...' : 'Quick Tips'}
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={callDeepAnalysis}
          disabled={loading === 'deep' || !privacyEnabled}
        >
          {loading === 'deep' ? 'Analyzing...' : 'Deep Analysis'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {quickTips && (
        <div className="tips-content">
          <h3>⚡ Quick Tips</h3>
          <div className="tips-text">
            {quickTips}
          </div>
        </div>
      )}

      {deepTips && (
        <div className="tips-content">
          <h3>🔍 Deep Analysis</h3>
          <div className="tips-text">
            <pre>{deepTips}</pre>
          </div>
        </div>
      )}

      <div className="tips-footer">
        <p>
          <small>
            Tips are generated based on your current session data: {stats.domain} ({Math.round(stats.totalBytes / 1024 / 1024)} MB)
          </small>
        </p>
      </div>
    </div>
  )
}

export default TipsPanel
