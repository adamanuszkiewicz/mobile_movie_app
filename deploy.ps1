# PowerShell deployment script for MovieFlix app to Vercel
# Run this script with: .\deploy.ps1

Write-Host "🚀 Starting deployment process for MovieFlix..." -ForegroundColor Green

# Step 1: Build the project
Write-Host "📦 Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
    exit 1
}

# Step 2: Check if dist folder exists
if (Test-Path "dist") {
    Write-Host "✅ Dist folder found" -ForegroundColor Green
    Write-Host "📁 Files in dist:" -ForegroundColor Cyan
    Get-ChildItem dist
} else {
    Write-Host "❌ Dist folder not found! Build may have failed." -ForegroundColor Red
    exit 1
}

# Step 3: Deploy to Vercel
Write-Host "🌐 Ready for Vercel deployment..." -ForegroundColor Yellow
Write-Host "Make sure you have:" -ForegroundColor Cyan
Write-Host "1. Installed Vercel CLI: npm install -g vercel" -ForegroundColor White
Write-Host "2. Logged in: vercel login" -ForegroundColor White
Write-Host "3. Set up environment variables in Vercel dashboard" -ForegroundColor White
Write-Host ""
Write-Host "Run 'vercel' to deploy or 'vercel --prod' for production deployment" -ForegroundColor Magenta

Write-Host "🎉 Build process complete! Ready for deployment." -ForegroundColor Green
