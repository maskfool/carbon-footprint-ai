import React, { useState } from 'react'
import { ConversionConstants } from '../types'

interface SettingsPanelProps {
  constants: ConversionConstants
  privacyEnabled: boolean
  onConstantsChange: (constants: ConversionConstants) => void
  onPrivacyChange: (enabled: boolean) => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  constants,
  privacyEnabled,
  onConstantsChange,
  onPrivacyChange
}) => {
  const [localConstants, setLocalConstants] = useState<ConversionConstants>(constants)

  const handleEnergyPerGBChange = (value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0) {
      const newConstants = { ...localConstants, energyPerGB: numValue }
      setLocalConstants(newConstants)
      onConstantsChange(newConstants)
    }
  }

  const handleCO2PerKWhChange = (value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0) {
      const newConstants = { ...localConstants, co2PerKWh: numValue }
      setLocalConstants(newConstants)
      onConstantsChange(newConstants)
    }
  }

  const resetToDefaults = () => {
    const defaults = { energyPerGB: 0.06, co2PerKWh: 0.475 }
    setLocalConstants(defaults)
    onConstantsChange(defaults)
  }

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Customize conversion constants and privacy settings</p>
      </div>

      <div className="settings-section">
        <h3>Conversion Constants</h3>
        <p className="section-description">
          Adjust these values based on your region's energy mix and carbon intensity
        </p>

        <div className="setting-item">
          <label htmlFor="energy-per-gb">
            Energy per GB (kWh/GB)
          </label>
          <input
            id="energy-per-gb"
            type="number"
            step="0.001"
            min="0"
            value={localConstants.energyPerGB}
            onChange={(e) => handleEnergyPerGBChange(e.target.value)}
          />
          <small>Default: 0.06 kWh/GB (global average)</small>
        </div>

        <div className="setting-item">
          <label htmlFor="co2-per-kwh">
            CO₂ per kWh (kg CO₂/kWh)
          </label>
          <input
            id="co2-per-kwh"
            type="number"
            step="0.001"
            min="0"
            value={localConstants.co2PerKWh}
            onChange={(e) => handleCO2PerKWhChange(e.target.value)}
          />
          <small>Default: 0.475 kg CO₂/kWh (global average)</small>
        </div>

        <button className="btn btn-secondary" onClick={resetToDefaults}>
          Reset to Defaults
        </button>
      </div>

      <div className="settings-section">
        <h3>Privacy Settings</h3>
        <p className="section-description">
          Control what data is sent to our servers for AI-powered tips
        </p>

        <div className="setting-item">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={privacyEnabled}
              onChange={(e) => onPrivacyChange(e.target.checked)}
            />
            <span className="checkmark"></span>
            Enable AI Tips (sends domain + bytes only)
          </label>
          <small>
            When enabled, only the current domain and total bytes transferred are sent to our servers.
            No URLs, cookies, or personal data is collected.
          </small>
        </div>
      </div>

      <div className="settings-section">
        <h3>Regional Presets</h3>
        <p className="section-description">
          Quick presets based on regional energy mixes
        </p>

        <div className="preset-buttons">
          <button 
            className="btn btn-outline"
            onClick={() => {
              const preset = { energyPerGB: 0.06, co2PerKWh: 0.475 }
              setLocalConstants(preset)
              onConstantsChange(preset)
            }}
          >
            Global Average
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={() => {
              const preset = { energyPerGB: 0.05, co2PerKWh: 0.3 }
              setLocalConstants(preset)
              onConstantsChange(preset)
            }}
          >
            Europe (Clean)
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={() => {
              const preset = { energyPerGB: 0.07, co2PerKWh: 0.6 }
              setLocalConstants(preset)
              onConstantsChange(preset)
            }}
          >
            US (Mixed)
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={() => {
              const preset = { energyPerGB: 0.08, co2PerKWh: 0.8 }
              setLocalConstants(preset)
              onConstantsChange(preset)
            }}
          >
            Asia (Coal-heavy)
          </button>
        </div>
      </div>

      <div className="settings-footer">
        <div className="info-box">
          <h4>About These Values</h4>
          <p>
            <strong>Energy per GB:</strong> Based on data center efficiency and network transmission costs.
            Values range from 0.05-0.1 kWh/GB depending on infrastructure.
          </p>
          <p>
            <strong>CO₂ per kWh:</strong> Varies significantly by region based on energy mix.
            Clean energy (solar/wind) ≈ 0.05, coal ≈ 1.0, natural gas ≈ 0.4 kg CO₂/kWh.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
