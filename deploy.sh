#!/bin/bash

# Deployment script for MovieFlix app to Vercel
# Run this script with: ./deploy.sh

echo "🚀 Starting deployment process for MovieFlix..."

# Step 1: Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

# Step 2: Check if dist folder exists
if [ -d "dist" ]; then
    echo "✅ Dist folder found"
    echo "📁 Files in dist:"
    ls -la dist/
else
    echo "❌ Dist folder not found! Build may have failed."
    exit 1
fi

# Step 3: Deploy to Vercel
echo "🌐 Deploying to Vercel..."
echo "Make sure you have:"
echo "1. Installed Vercel CLI: npm install -g vercel"
echo "2. Logged in: vercel login"
echo "3. Set up environment variables in Vercel dashboard"
echo ""
echo "Run 'vercel' to deploy or 'vercel --prod' for production deployment"

echo "🎉 Build process complete! Ready for deployment."
