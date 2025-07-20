# Vercel Deployment Guide for MovieFlix App

This guide will help you deploy your Expo React Native app to Vercel for web access.

## Prerequisites

1. **GitHub Account**: Your code should be pushed to a GitHub repository
2. **Vercel Account**: Create a free account at [vercel.com](https://vercel.com)

## Step 1: Prepare Your Repository

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment - SDK 53 upgrade"
   git push origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect your project settings
5. **Important**: Set these environment variables in Vercel:
   - `EXPO_PUBLIC_MOVIE_API_KEY`
   - `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
   - `EXPO_PUBLIC_APPWRITE_DATABASE_ID`
   - `EXPO_PUBLIC_APPWRITE_COLLECTION_ID`
   - `EXPO_PUBLIC_APPWRITE_SAVED_ID`
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. Follow the prompts and set your environment variables

## Step 3: Configure Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all your `EXPO_PUBLIC_*` variables from your `.env` file
4. Make sure to set them for all environments (Production, Preview, Development)

## Project Configuration

Your project is already configured with:

- ✅ **vercel.json**: Contains optimal settings for Expo web apps
- ✅ **Build script**: `npm run build` exports your app for web
- ✅ **Static output**: Your app builds to the `dist/` folder
- ✅ **SPA routing**: Configured for client-side routing

## Build Commands

- **Build**: `npm run build`
- **Dev**: `npm run web`
- **Output Directory**: `dist`

## Environment Variables Needed

Make sure to add these in Vercel:

```
EXPO_PUBLIC_MOVIE_API_KEY=your_api_key_here
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id_here
EXPO_PUBLIC_APPWRITE_SAVED_ID=your_saved_id_here
```

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Ensure your `package.json` has the correct build script
- Verify all dependencies are installed

### App Doesn't Load
- Check browser console for errors
- Verify environment variables are accessible
- Ensure all API endpoints are reachable from web

### Routing Issues
- The `vercel.json` handles SPA routing automatically
- All routes should redirect to `index.html`

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Navigate to "Settings" > "Domains"
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

## Updates and Redeployment

Every time you push to your main branch, Vercel will automatically rebuild and redeploy your app.

To manually redeploy:
```bash
npm run build
vercel --prod
```

## Performance Tips

1. Your app uses static rendering for better SEO and performance
2. Images are automatically optimized by Vercel
3. CSS and JS are bundled and minified
4. All routes are pre-rendered at build time

## Success! 🎉

Once deployed, your MovieFlix app will be available at:
- Production: `your-app-name.vercel.app`
- Or your custom domain

The app will work as a Progressive Web App (PWA) and can be installed on mobile devices through the browser.
