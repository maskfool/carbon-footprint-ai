export interface TabStats {
  domain: string;
  totalBytes: number;
  lastUpdated: number;
  entryCount: number;
  entries?: NetworkEntry[];
}

export interface NetworkEntry {
  transferSize: number;
  name: string;
  startTime: number;
}

export interface ConversionConstants {
  energyPerGB: number; // kWh per GB
  co2PerKWh: number;   // kg CO2 per kWh
}

export interface ConversionResult {
  bytes: number;
  gb: number;
  kwh: number;
  co2Grams: number;
}

export interface TipsResponse {
  quick: string;
  source: 'nano';
  cached: boolean;
  latencyMs: number;
}

export interface DeepResponse {
  deep: string;
  estimatedSavings?: object;
  source: 'openai';
  latencyMs: number;
}

export interface ApiError {
  error: string;
  message: string;
}
