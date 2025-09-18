/**
 * Build script for Chrome extension
 */

import { execSync } from 'child_process'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

console.log('🚀 Building Carbon Cost Extension...')

// Build with Vite
console.log('📦 Building with Vite...')
execSync('npm run build', { stdio: 'inherit' })

// Copy manifest.json
console.log('📋 Copying manifest...')
copyFileSync('manifest.json', 'dist/manifest.json')

// Copy popup.html to root of dist
console.log('📄 Copying popup.html...')
copyFileSync('dist/src/popup.html', 'dist/popup.html')

// Copy icons
console.log('🎨 Copying icons...')
const iconsDir = 'dist/icons'
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true })
}

// Create simple PNG icons from SVG (in production, use proper icon generation)
const iconSizes = [16, 32, 48, 128]
for (const size of iconSizes) {
  const iconPath = join(iconsDir, `icon${size}.png`)
  // For demo purposes, we'll create a simple placeholder
  // In production, convert SVG to PNG at different sizes
  copyFileSync('icons/icon.svg', iconPath)
}

console.log('✅ Extension built successfully!')
console.log('📁 Output directory: dist/')
console.log('🔧 Load the dist/ folder in Chrome as an unpacked extension')
