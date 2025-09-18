#!/bin/bash

echo "🚀 Creating Carbon Cost Extension Release Package..."

# Create release directory
mkdir -p releases/v1.0.0

# Copy extension files
cp -r carbon-cost-extension/dist/* releases/v1.0.0/
cp -r carbon-cost-extension/icons/* releases/v1.0.0/ 2>/dev/null || true

# Copy documentation
cp release-package/README.md releases/v1.0.0/
cp release-package/INSTALLATION_GUIDE.md releases/v1.0.0/
cp RELEASE_NOTES.md releases/v1.0.0/

# Create ZIP file
cd releases
zip -r carbon-cost-extension-v1.0.0.zip v1.0.0/ -x "*.DS_Store" "*/node_modules/*"
cd ..

echo "✅ Release package created: releases/carbon-cost-extension-v1.0.0.zip"
echo "📁 Release folder: releases/v1.0.0/"
echo ""
echo "🚀 Next steps:"
echo "1. Upload releases/carbon-cost-extension-v1.0.0.zip to Google Drive"
echo "2. Create a GitHub Release with the ZIP file"
echo "3. Share the download links with users"
echo ""
echo "📱 Users can install by:"
echo "1. Downloading the ZIP file"
echo "2. Extracting the folder"
echo "3. Loading unpacked in Chrome"
