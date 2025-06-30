# Deployment Guide for Vercel

## Prerequisites

- Vercel account (https://vercel.com)
- Git repository with your code

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration
5. Click "Deploy"

## Configuration Files Added

- `vercel.json`: Main configuration for Vercel deployment
- `api/ping.ts`: Serverless function for ping endpoint
- `api/demo.ts`: Serverless function for demo endpoint
- `.vercelignore`: Files to exclude from deployment
- `DEPLOYMENT.md`: This guide

## Important Notes

1. **Build Command**: `npm run build` (builds only the client app)
2. **Output Directory**: `dist/spa` (contains the static React app)
3. **API Endpoints**: Converted to serverless functions in `/api` directory
4. **Routing**: All routes redirect to `index.html` for SPA routing

## Environment Variables

If you need environment variables, add them in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables

## Custom Domain

To add a custom domain:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain

## Troubleshooting

### Build Errors

- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test
- Check build logs in Vercel dashboard

### API Issues

- API functions are in `/api` directory
- They use serverless runtime
- Check function logs in Vercel dashboard

### Routing Issues

- Ensure `vercel.json` routes are configured correctly
- SPA routing should work with the current configuration
