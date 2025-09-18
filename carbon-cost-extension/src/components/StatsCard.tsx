import React from 'react'
import { TabStats, ConversionConstants } from '../types'
import { convertBytesToCarbon, formatBytes } from '../utils/conversions'

interface StatsCardProps {
  stats: TabStats | null
  constants: ConversionConstants
  onReset: () => void
  onSimulate: () => void
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  stats, 
  constants, 
  onReset, 
  onSimulate 
}) => {
  if (!stats) {
    return (
      <div className="stats-card">
        <div className="no-data">
          <p>No data available</p>
          <p>Navigate to a website to start tracking</p>
        </div>
      </div>
    )
  }

  const conversion = convertBytesToCarbon(stats.totalBytes, constants)
  const lastUpdated = new Date(stats.lastUpdated).toLocaleTimeString()

  return (
    <div className="stats-card">
      <div className="stats-header">
        <h2>{stats.domain}</h2>
        <div className="last-updated">
          Updated: {lastUpdated}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Data Transferred</div>
          <div className="stat-value">{formatBytes(stats.totalBytes)}</div>
          <div className="stat-detail">{conversion.gb} GB</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Energy Used</div>
          <div className="stat-value">{conversion.kwh} kWh</div>
          <div className="stat-detail">Electricity</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">CO₂ Emissions</div>
          <div className="stat-value">{conversion.co2Grams} g</div>
          <div className="stat-detail">Carbon dioxide</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Resources</div>
          <div className="stat-value">{stats.entryCount}</div>
          <div className="stat-detail">Network requests</div>
        </div>
      </div>

      <div className="stats-actions">
        <button className="btn btn-secondary" onClick={onReset}>
          Reset Stats
        </button>
        <button className="btn btn-primary" onClick={onSimulate}>
          Simulate 1h Streaming
        </button>
      </div>

      <div className="carbon-impact">
        <div className="impact-text">
          <strong>Environmental Impact:</strong>
        </div>
        <div className="impact-details">
          This session used {conversion.kwh} kWh of energy and produced {conversion.co2Grams} grams of CO₂.
          {conversion.co2Grams > 10 && (
            <span className="high-impact"> ⚠️ High impact detected</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatsCard
