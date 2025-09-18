/**
 * Build script to create Chrome extension ZIP
 */

import { createWriteStream } from 'fs'
import { createReadStream } from 'fs'
import { readdir, stat } from 'fs/promises'
import { join, relative } from 'path'
import archiver from 'archiver'

const DIST_DIR = 'dist'
const OUTPUT_FILE = 'carbon-cost-extension.zip'

async function buildExtension() {
  console.log('🚀 Building Chrome extension...')
  
  // Create ZIP file
  const output = createWriteStream(OUTPUT_FILE)
  const archive = archiver('zip', { zlib: { level: 9 } })
  
  output.on('close', () => {
    console.log(`✅ Extension built successfully: ${OUTPUT_FILE}`)
    console.log(`📦 Archive size: ${archive.pointer()} bytes`)
  })
  
  archive.on('error', (err) => {
    console.error('❌ Archive error:', err)
    process.exit(1)
  })
  
  archive.pipe(output)
  
  // Add files to archive
  const filesToInclude = [
    'manifest.json',
    'src/popup.html',
    'popup.js',
    'content.js',
    'background.js',
    'popup.css',
    'icons/'
  ]
  
  for (const file of filesToInclude) {
    const filePath = join(DIST_DIR, file)
    try {
      const stats = await stat(filePath)
      if (stats.isDirectory()) {
        archive.directory(filePath, file)
      } else {
        archive.file(filePath, { name: file })
      }
    } catch (err) {
      console.warn(`⚠️  Skipping ${file}: ${err.message}`)
    }
  }
  
  // Add CSS files
  const cssFiles = ['popup.css', 'styles.css']
  for (const cssFile of cssFiles) {
    const cssPath = join(DIST_DIR, cssFile)
    try {
      await stat(cssPath)
      archive.file(cssPath, { name: cssFile })
    } catch (err) {
      // CSS might be inlined, skip
    }
  }
  
  await archive.finalize()
}

buildExtension().catch(console.error)
