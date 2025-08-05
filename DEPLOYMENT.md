# NewsMapper Deployment Guide

## Issues Fixed

### 1. Module Resolution Error
**Problem**: `Cannot find module '/var/task/server/routes' imported from /var/task/api/index.js`

**Solution**: 
- Updated `api/index.ts` to be completely self-contained without server dependencies
- Removed server directory from `api/tsconfig.json` includes
- Made API a standalone Vercel serverless function

### 2. Vercel Configuration Issues
**Problem**: Incorrect routing and build configuration

**Solution**:
- Updated `vercel.json` to properly handle both API and client builds
- Fixed routing to serve API from `/api/*` and client from `/*`
- Updated build output directory to match Vite configuration

### 3. Data Schema Mismatch
**Problem**: API data missing required fields from shared schema

**Solution**:
- Added missing `sentiment_score`, `related_events`, `study_guide`, and `created_at` fields
- Ensured all news data matches the `NewsEvent` type from shared schema

### 4. Build Process Issues
**Problem**: Inconsistent build process and verification

**Solution**:
- Created comprehensive build verification script
- Updated Vercel build script with proper error handling
- Added configuration management for client-side API calls

## Deployment Steps

### 1. Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Verify build
node build-verify.js
```

### 2. Vercel Deployment
```bash
# Deploy to Vercel
vercel --prod

# Or push to GitHub and let Vercel auto-deploy
git push origin main
```

### 3. Environment Variables
Set these in Vercel dashboard:
- `NODE_ENV=production`
- `VITE_API_URL` (optional, for custom API URL)

## API Endpoints

The API provides the following endpoints:

- `GET /api/health` - Health check
- `GET /api/news` - Get all news events
- `GET /api/news/:id` - Get specific news event
- `GET /api/analytics` - Get analytics data
- `GET /api/search?q=query` - Search events
- `GET /api/category/:category` - Get events by category
- `GET /api/country/:country` - Get events by country
- `POST /api/study-guide/:eventId` - Generate study guide

## File Structure

```
NewsMapper/
├── api/
│   ├── index.ts          # Vercel serverless function
│   └── tsconfig.json     # API TypeScript config
├── client/
│   ├── src/              # React application
│   └── index.html        # Client entry point
├── shared/
│   └── schema.ts         # Shared types and schemas
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite build configuration
├── vercel-build.js       # Vercel build script
└── build-verify.js       # Build verification script
```

## Troubleshooting

### Build Failures
1. Check `vercel-build.js` output for specific errors
2. Verify all dependencies are installed
3. Ensure TypeScript compilation passes

### API Errors
1. Check Vercel function logs
2. Verify API endpoints are accessible
3. Test with `test-api.js` script

### Client Issues
1. Check browser console for errors
2. Verify build output in `dist/public`
3. Ensure all imports resolve correctly

## Performance Optimization

- Client-side caching with React Query
- Static asset optimization with Vite
- API response caching
- Lazy loading of components

## Security Considerations

- CORS headers properly configured
- Input validation on API endpoints
- Environment variable protection
- Rate limiting (implement as needed)

## Monitoring

- Vercel Analytics for performance
- Function logs for API debugging
- Client-side error tracking
- Health check endpoint monitoring 