# NewsMapper - Geo-Political News Mapper

An interactive educational platform for understanding global geo-political events through AI-powered news mapping and analysis.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd NewsMapper

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Build for production
npm run build

# Verify build
node build-verify.js

# Deploy to Vercel
vercel --prod
```

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Vercel Serverless Functions
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query
- **Maps**: Leaflet.js
- **Charts**: Recharts

## 📁 Project Structure

```
NewsMapper/
├── api/                    # Vercel serverless functions
├── client/                 # React frontend application
├── shared/                 # Shared types and schemas
├── server/                 # Express server (development)
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Key Features

- **Interactive World Map**: Visualize news events geographically
- **AI-Powered Analysis**: Sentiment analysis and geopolitical impact scoring
- **Educational Context**: Learning objectives and related topics for each event
- **Real-time Updates**: Live news feed with automatic refresh
- **Study Guides**: Generate educational content for events
- **Advanced Filtering**: Filter by category, country, sentiment, and more

## 🚨 Recent Fixes (August 2025)

### Module Resolution Issues
- ✅ Fixed `Cannot find module '/var/task/server/routes'` error
- ✅ Made API completely self-contained for Vercel deployment
- ✅ Updated TypeScript configurations

### Build Process
- ✅ Created comprehensive build verification
- ✅ Fixed Vercel deployment configuration
- ✅ Added proper error handling

### Data Schema
- ✅ Fixed missing fields in API data
- ✅ Ensured consistency with shared schema
- ✅ Added proper TypeScript types

## 🧪 Testing

```bash
# Test API endpoints
node test-api.js

# Verify build output
node build-verify.js

# Run TypeScript checks
npm run check
```

## 📊 API Endpoints

- `GET /api/health` - Health check
- `GET /api/news` - Get all news events
- `GET /api/analytics` - Get analytics data
- `GET /api/search?q=query` - Search events
- `POST /api/study-guide/:id` - Generate study guide

## 🎯 Educational Features

- **Learning Objectives**: Each event includes specific learning goals
- **Related Topics**: Connect events to broader themes
- **Study Guides**: AI-generated educational content
- **Exam Relevance**: Links to CSS, ISSB, SAT, and general current affairs

## 🌍 Categories Covered

- **Conflict**: Military tensions, wars, disputes
- **Diplomacy**: International relations, treaties, summits
- **Disaster**: Natural disasters, humanitarian crises
- **Innovation**: Technology breakthroughs, scientific advances
- **Politics**: Elections, government changes, policy shifts
- **Economy**: Financial markets, trade agreements, economic policies
- **Health**: Pandemics, healthcare policies, medical breakthroughs
- **Climate**: Environmental issues, climate action, sustainability

## 🔒 Security & Performance

- CORS properly configured
- Input validation on all endpoints
- Client-side caching with React Query
- Static asset optimization
- Rate limiting ready

## 📈 Monitoring

- Health check endpoint for API monitoring
- Vercel Analytics integration
- Error tracking and logging
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For deployment issues, see [DEPLOYMENT.md](./DEPLOYMENT.md)

For API documentation, see the inline comments in `api/index.ts` 