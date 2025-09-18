/**
 * Conversion utilities for bytes -> GB -> kWh -> CO2
 */

import { ConversionConstants, ConversionResult } from '../types'

export function convertBytesToCarbon(
  bytes: number, 
  constants: ConversionConstants
): ConversionResult {
  const gb = bytes / (1024 * 1024 * 1024)
  const kwh = gb * constants.energyPerGB
  const co2Grams = kwh * constants.co2PerKWh * 1000 // Convert kg to grams

  return {
    bytes,
    gb: Math.round(gb * 1000) / 1000, // Round to 3 decimal places
    kwh: Math.round(kwh * 1000) / 1000,
    co2Grams: Math.round(co2Grams * 100) / 100 // Round to 2 decimal places
  }
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals)
}

export function getCarbonIntensity(domain: string): number {
  // Simple carbon intensity mapping based on domain patterns
  const patterns = {
    'youtube.com': 1.2,
    'netflix.com': 1.1,
    'twitch.tv': 1.3,
    'facebook.com': 0.9,
    'instagram.com': 0.8,
    'twitter.com': 0.7,
    'tiktok.com': 1.0,
    'google.com': 0.6,
    'github.com': 0.5,
    'stackoverflow.com': 0.4
  }

  for (const [pattern, intensity] of Object.entries(patterns)) {
    if (domain.includes(pattern)) {
      return intensity
    }
  }

  return 1.0 // Default intensity
}
