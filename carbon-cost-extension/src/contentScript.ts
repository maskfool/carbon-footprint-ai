/**
 * Content Script - Measures network transfer using Performance API
 * Runs on every page to track bytes transferred
 */

import { TabStats } from './types'

class NetworkMonitor {
  private observer: PerformanceObserver | null = null;
  private tabId: number | null = null;
  private stats: TabStats = {
    domain: '',
    totalBytes: 0,
    lastUpdated: Date.now(),
    entryCount: 0,
    entries: []
  };

  constructor() {
    this.init();
  }

  private init() {
    // Get current tab ID
    this.getCurrentTabId().then(tabId => {
      this.tabId = tabId;
      this.stats.domain = this.getDomainFromUrl(window.location.href);
      this.startMonitoring();
    });

    // Set up periodic reporting
    setInterval(() => {
      this.reportStats();
    }, 2000); // Report every 2 seconds
  }

  private async getCurrentTabId(): Promise<number> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getTabId' }, (response) => {
        resolve(response?.tabId || 0);
      });
    });
  }

  private getDomainFromUrl(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return 'unknown';
    }
  }

  private startMonitoring() {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    try {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[];
        
        entries.forEach(entry => {
          if (entry.transferSize && entry.transferSize > 0) {
            this.stats.totalBytes += entry.transferSize;
            this.stats.entryCount++;
            this.stats.entries?.push({
              transferSize: entry.transferSize,
              name: entry.name,
              startTime: entry.startTime
            });
          }
        });

        this.stats.lastUpdated = Date.now();
      });

      // Observe resource timing entries
      this.observer.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Failed to start performance monitoring:', error);
    }
  }

  private reportStats() {
    if (this.tabId && this.stats.totalBytes > 0) {
      chrome.runtime.sendMessage({
        action: 'updateStats',
        tabId: this.tabId,
        stats: {
          domain: this.stats.domain,
          totalBytes: this.stats.totalBytes,
          lastUpdated: this.stats.lastUpdated,
          entryCount: this.stats.entries?.length || 0
        }
      });
    }
  }

  public getStats(): TabStats {
    return { ...this.stats };
  }

  public reset() {
    this.stats = {
      domain: this.getDomainFromUrl(window.location.href),
      totalBytes: 0,
      lastUpdated: Date.now(),
      entryCount: 0,
      entries: []
    };
  }
}

// Initialize the monitor
const monitor = new NetworkMonitor();

// Expose for debugging
(window as any).carbonMonitor = monitor;
