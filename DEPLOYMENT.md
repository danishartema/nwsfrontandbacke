# NewsMapper Vercel Deployment Guide

## Issues Fixed

### 1. ES Module Import Issues
- **Problem**: The project uses ES modules but had incorrect import paths
- **Solution**: Updated all imports to use `.js` extensions and relative paths
- **Files Updated**: 
  - `api/index.ts`
  - `server/routes.ts`
  - `server/storage.ts`
  - `server/study-guide-generator.ts`
  - `server/vite.ts`
  - `client/src/data/comprehensive-news-data.ts`

### 2. Vercel Configuration
- **Problem**: Missing proper Vercel configuration for serverless functions
- **Solution**: Updated `vercel.json` with proper function configuration
- **Added**: Function timeout settings and proper routing

### 3. Build Process
- **Problem**: Build script wasn't properly configured for Vercel
- **Solution**: Created `vercel-build.js` script and updated `package.json`
- **Added**: Proper build verification and error handling

### 4. Error Handling
- **Problem**: Poor error handling in static file serving
- **Solution**: Added graceful fallbacks and better error messages
- **Added**: Health check endpoint for monitoring

## Deployment Steps

### 1. Verify Local Build
```bash
npm run build:client
```
This should complete successfully and create files in `dist/public/`

### 2. Test API Handler (Optional)
```bash
node test-api.js
```
This will test if the API handler can be imported and initialized

### 3. Deploy to Vercel
```bash
vercel --prod
```

### 4. Verify Deployment
- Check the health endpoint: `https://your-domain.vercel.app/api/health`
- Test the main application: `https://your-domain.vercel.app`

## Key Features

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/news` - Get all news events
- `GET /api/news/:id` - Get specific news event
- `GET /api/analytics` - Get analytics data
- `GET /api/search?q=query` - Search events
- `GET /api/category/:category` - Get events by category
- `GET /api/country/:country` - Get events by country
- `POST /api/study-guide/:eventId` - Generate study guide
- `GET /api/study-guide/:eventId` - Get study guide
- `GET /api/study-guides` - Get all study guides

### Static File Serving
- Serves the React application from `dist/public/`
- Handles client-side routing
- Provides fallback for missing static files

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Ensure all dependencies are installed: `npm install`
   - Check TypeScript compilation: `npm run check`

2. **API Returns 500 Error**
   - Check Vercel function logs
   - Verify the health endpoint works: `/api/health`

3. **Static Files Not Found**
   - Ensure client build completed: `npm run build:client`
   - Check `dist/public/` directory exists

4. **Import Errors**
   - Verify all imports use `.js` extensions
   - Check relative paths are correct

### Debugging
- Use the health check endpoint to verify API is working
- Check Vercel function logs for detailed error messages
- Test locally with `npm run dev` before deploying

## Environment Variables
- `NODE_ENV`: Set to "production" in Vercel
- `DATABASE_URL`: Required for database operations (if using)

## Performance
- Function timeout set to 30 seconds
- Static files are served efficiently
- API responses are cached appropriately 