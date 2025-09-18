import React, { useState, useEffect } from 'react'
import StatsCard from './components/StatsCard'
import TipsPanel from './components/TipsPanel'
import SettingsPanel from './components/SettingsPanel'
import { TabStats, ConversionConstants } from './types'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'tips' | 'settings'>('stats')
  const [stats, setStats] = useState<TabStats | null>(null)
  const [constants, setConstants] = useState<ConversionConstants>({
    energyPerGB: 0.06,
    co2PerKWh: 0.475
  })
  const [privacyEnabled, setPrivacyEnabled] = useState(true)

  useEffect(() => {
    // Load settings from storage
    chrome.storage.sync.get(['constants', 'privacyEnabled'], (result) => {
      if (result.constants) {
        setConstants(result.constants)
      }
      if (result.privacyEnabled !== undefined) {
        setPrivacyEnabled(result.privacyEnabled)
      }
    })

    // Get current tab stats
    getCurrentStats()
    
    // Set up periodic updates
    const interval = setInterval(getCurrentStats, 1000)
    return () => clearInterval(interval)
  }, [])

  const getCurrentStats = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.runtime.sendMessage(
          { action: 'getStats', tabId: tabs[0].id },
          (response) => {
            if (response?.stats) {
              setStats(response.stats)
            }
          }
        )
      }
    })
  }

  const handleReset = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.runtime.sendMessage(
          { action: 'resetStats', tabId: tabs[0].id },
          () => {
            getCurrentStats()
          }
        )
      }
    })
  }

  const handleSimulate = () => {
    // Simulate 1 hour of streaming (roughly 1GB)
    const simulatedStats: TabStats = {
      domain: stats?.domain || 'simulation',
      totalBytes: 1024 * 1024 * 1024, // 1GB
      lastUpdated: Date.now(),
      entryCount: 1000
    }
    setStats(simulatedStats)
  }

  const handleConstantsChange = (newConstants: ConversionConstants) => {
    setConstants(newConstants)
    chrome.storage.sync.set({ constants: newConstants })
  }

  const handlePrivacyChange = (enabled: boolean) => {
    setPrivacyEnabled(enabled)
    chrome.storage.sync.set({ privacyEnabled: enabled })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌱 Carbon Cost</h1>
        <nav className="tab-nav">
          <button 
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
          <button 
            className={activeTab === 'tips' ? 'active' : ''}
            onClick={() => setActiveTab('tips')}
          >
            Tips
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'stats' && (
          <StatsCard 
            stats={stats}
            constants={constants}
            onReset={handleReset}
            onSimulate={handleSimulate}
          />
        )}
        
        {activeTab === 'tips' && (
          <TipsPanel 
            stats={stats}
            privacyEnabled={privacyEnabled}
          />
        )}
        
        {activeTab === 'settings' && (
          <SettingsPanel 
            constants={constants}
            privacyEnabled={privacyEnabled}
            onConstantsChange={handleConstantsChange}
            onPrivacyChange={handlePrivacyChange}
          />
        )}
      </main>

      {privacyEnabled && (
        <footer className="privacy-note">
          <small>🔒 Only domain and bytes are sent to our servers</small>
        </footer>
      )}
    </div>
  )
}

export default App
