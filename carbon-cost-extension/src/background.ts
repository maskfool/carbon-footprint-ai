/**
 * Background Service Worker - Manages per-tab statistics and messaging
 */

import { TabStats } from './types'

interface StoredStats {
  [tabId: number]: TabStats;
}

class BackgroundManager {
  private tabStats: StoredStats = {};
  private currentTabId: number | null = null;

  constructor() {
    this.setupMessageHandlers();
    this.setupTabListeners();
  }

  private setupMessageHandlers() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.action) {
        case 'getTabId':
          sendResponse({ tabId: sender.tab?.id || 0 });
          break;

        case 'updateStats':
          this.updateTabStats(message.tabId, message.stats);
          sendResponse({ success: true });
          break;

        case 'getStats':
          const stats = this.getTabStats(message.tabId);
          sendResponse({ stats });
          break;

        case 'resetStats':
          this.resetTabStats(message.tabId);
          sendResponse({ success: true });
          break;

        case 'getAllStats':
          sendResponse({ stats: this.tabStats });
          break;

        default:
          sendResponse({ error: 'Unknown action' });
      }
    });
  }

  private setupTabListeners() {
    // Track active tab changes
    chrome.tabs.onActivated.addListener((activeInfo) => {
      this.currentTabId = activeInfo.tabId;
    });

    // Clean up stats when tabs are closed
    chrome.tabs.onRemoved.addListener((tabId) => {
      delete this.tabStats[tabId];
    });

    // Reset stats on navigation
    chrome.webNavigation.onBeforeNavigate.addListener((details) => {
      if (details.frameId === 0) { // Main frame navigation
        this.resetTabStats(details.tabId);
      }
    });
  }

  private updateTabStats(tabId: number, stats: TabStats) {
    this.tabStats[tabId] = {
      ...stats,
      lastUpdated: Date.now()
    };
  }

  private getTabStats(tabId: number): TabStats | null {
    return this.tabStats[tabId] || null;
  }

  private resetTabStats(tabId: number) {
    if (this.tabStats[tabId]) {
      this.tabStats[tabId] = {
        domain: this.tabStats[tabId].domain,
        totalBytes: 0,
        lastUpdated: Date.now(),
        entryCount: 0,
        entries: []
      };
    }
  }

  public getCurrentTabStats(): TabStats | null {
    if (this.currentTabId) {
      return this.getTabStats(this.currentTabId);
    }
    return null;
  }
}

// Initialize the background manager
const backgroundManager = new BackgroundManager();

// Expose for debugging
(globalThis as any).backgroundManager = backgroundManager;
