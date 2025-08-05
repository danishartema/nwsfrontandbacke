// Configuration for the NewsMapper application
export const config = {
  // API configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || '',
    endpoints: {
      news: '/api/news',
      analytics: '/api/analytics',
      search: '/api/search',
      health: '/api/health',
      studyGuide: '/api/study-guide'
    }
  },
  
  // Application settings
  app: {
    name: 'NewsMapper',
    description: 'Geo-Political News Mapper - Educational Platform',
    version: '1.0.0'
  },
  
  // Feature flags
  features: {
    enableStudyGuides: true,
    enableAnalytics: true,
    enableSearch: true,
    enableFilters: true
  },
  
  // UI settings
  ui: {
    defaultTheme: 'light',
    refreshInterval: 300000, // 5 minutes
    maxEventsPerPage: 50
  }
};

// Helper function to get full API URL
export function getApiUrl(endpoint: string): string {
  const baseUrl = config.api.baseUrl;
  if (baseUrl) {
    return `${baseUrl}${endpoint}`;
  }
  return endpoint;
} 