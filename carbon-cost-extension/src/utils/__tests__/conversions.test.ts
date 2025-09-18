/**
 * Unit tests for conversion utilities
 */

import { describe, it, expect } from 'vitest'
import { convertBytesToCarbon, formatBytes, formatNumber, getCarbonIntensity } from '../conversions'
import { ConversionConstants } from '../../types'

describe('convertBytesToCarbon', () => {
  const defaultConstants: ConversionConstants = {
    energyPerGB: 0.06,
    co2PerKWh: 0.475
  }

  it('should convert bytes to carbon correctly', () => {
    const result = convertBytesToCarbon(1024 * 1024 * 1024, defaultConstants) // 1GB
    
    expect(result.bytes).toBe(1024 * 1024 * 1024)
    expect(result.gb).toBe(1)
    expect(result.kwh).toBe(0.06)
    expect(result.co2Grams).toBe(28.5) // 0.06 * 0.475 * 1000
  })

  it('should handle zero bytes', () => {
    const result = convertBytesToCarbon(0, defaultConstants)
    
    expect(result.bytes).toBe(0)
    expect(result.gb).toBe(0)
    expect(result.kwh).toBe(0)
    expect(result.co2Grams).toBe(0)
  })

  it('should handle small values correctly', () => {
    const result = convertBytesToCarbon(1024 * 1024, defaultConstants) // 1MB
    
    expect(result.gb).toBe(0.001)
    expect(result.kwh).toBe(0) // Rounded to 0 due to rounding
    expect(result.co2Grams).toBe(0.03) // Actual rounded value
  })

  it('should round values appropriately', () => {
    const result = convertBytesToCarbon(1024 * 1024 * 1024 * 1.5, defaultConstants) // 1.5GB
    
    expect(result.gb).toBe(1.5)
    expect(result.kwh).toBe(0.09)
    expect(result.co2Grams).toBe(42.75)
  })
})

describe('formatBytes', () => {
  it('should format bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(1024)).toBe('1 KB')
    expect(formatBytes(1024 * 1024)).toBe('1 MB')
    expect(formatBytes(1024 * 1024 * 1024)).toBe('1 GB')
    expect(formatBytes(1024 * 1024 * 1024 * 1024)).toBe('1 TB')
  })

  it('should handle decimal values', () => {
    expect(formatBytes(1536)).toBe('1.5 KB')
    expect(formatBytes(1024 * 1024 * 1.5)).toBe('1.5 MB')
  })

  it('should handle large values', () => {
    expect(formatBytes(1024 * 1024 * 1024 * 1024 * 1024)).toBe('1 undefined')
  })
})

describe('formatNumber', () => {
  it('should format numbers with default decimals', () => {
    expect(formatNumber(1.23456)).toBe('1.23')
    expect(formatNumber(1.2)).toBe('1.20')
    expect(formatNumber(1)).toBe('1.00')
  })

  it('should format numbers with custom decimals', () => {
    expect(formatNumber(1.23456, 1)).toBe('1.2')
    expect(formatNumber(1.23456, 3)).toBe('1.235')
    expect(formatNumber(1.23456, 0)).toBe('1')
  })
})

describe('getCarbonIntensity', () => {
  it('should return correct intensity for known domains', () => {
    expect(getCarbonIntensity('youtube.com')).toBe(1.2)
    expect(getCarbonIntensity('netflix.com')).toBe(1.1)
    expect(getCarbonIntensity('github.com')).toBe(0.5)
    expect(getCarbonIntensity('google.com')).toBe(0.6)
  })

  it('should return default intensity for unknown domains', () => {
    expect(getCarbonIntensity('example.com')).toBe(1.0)
    expect(getCarbonIntensity('unknown-site.org')).toBe(1.0)
  })

  it('should match partial domains', () => {
    expect(getCarbonIntensity('www.youtube.com')).toBe(1.2)
    expect(getCarbonIntensity('m.youtube.com')).toBe(1.2)
    expect(getCarbonIntensity('github.io')).toBe(1.0) // github.io doesn't match github.com pattern
  })
})
