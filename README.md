# NewsMapper - Geo-Political News Educational Platform

## 🌍 Overview

NewsMapper is an AI-powered educational platform designed to help students understand global affairs through comprehensive geopolitical news analysis and automated study guide generation. The application combines real-time news data with intelligent categorization, sentiment analysis, and educational insights tailored for CSS, ISSB, SAT, and general current affairs preparation.

## ✨ Features

### 🗞️ News Analysis
- **Comprehensive News Grid**: Interactive interface displaying geopolitical events
- **AI-Powered Categorization**: Intelligent classification of news events
- **Sentiment Analysis**: Real-time sentiment scoring and analysis
- **Geopolitical Impact Assessment**: Risk level evaluation and impact scoring

### 📚 Educational Tools
- **AI-Generated Study Guides**: Automated creation of comprehensive study materials
- **Multi-Exam Support**: Content tailored for CSS, ISSB, SAT, and general current affairs
- **Interactive Quizzes**: AI-generated questions with explanations
- **Vocabulary Definitions**: Key terms and concepts explained
- **Discussion Questions**: Thought-provoking questions for deeper analysis

### 🔍 Advanced Filtering
- **Category-based Filtering**: Filter by news categories
- **Geographic Filtering**: Search by country and region
- **Sentiment Filtering**: Filter by positive, negative, or neutral sentiment
- **Date Range Filtering**: Search within specific time periods
- **Impact-based Filtering**: Filter by geopolitical impact levels

### 📊 Analytics Dashboard
- **Real-time Analytics**: Live insights and trends
- **Event Distribution**: Visual representation of news categories
- **Hotspot Analysis**: Identification of high-risk regions
- **Trend Analysis**: Historical pattern recognition

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- OpenAI API key (for study guide generation)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd NewsMapper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Set up database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **TanStack Query** - Server state management
- **Wouter** - Lightweight client-side routing

### Backend
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type safety throughout
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Robust relational database
- **OpenAI API** - AI-powered study guide generation

### Development Tools
- **ESBuild** - Fast JavaScript bundler
- **Drizzle Kit** - Database migration and management
- **Cross-env** - Cross-platform environment variables

## 📁 Project Structure

```
NewsMapper/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── data/          # Sample data
│   └── index.html         # HTML entry point
├── server/                # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data storage layer
│   └── study-guide-generator.ts
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema definitions
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel deployment configuration
└── README.md             # Project documentation
```

## 🔌 API Endpoints

### News Events
- `GET /api/news` - Get all news events with optional filtering
- `GET /api/news/:id` - Get specific news event
- `GET /api/search?q=query` - Search events
- `GET /api/category/:category` - Get events by category
- `GET /api/country/:country` - Get events by country

### Analytics
- `GET /api/analytics` - Get analytics data

### Study Guides
- `GET /api/study-guide/:eventId` - Get study guide for event
- `POST /api/study-guide/:eventId` - Generate new study guide
- `GET /api/study-guides` - Get all study guides

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Environment Variables in Vercel**
   ```
   DATABASE_URL=your_neon_connection_string
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=production
   ```

4. **Deploy**
   - Vercel will automatically detect the configuration
   - Build and deploy your application

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database_name?sslmode=require

# Node Environment
NODE_ENV=production

# OpenAI API Key (for study guide generation)
OPENAI_API_KEY=your_openai_api_key_here
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema
- `npm run vercel-build` - Build for Vercel deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/NewsMapper/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Real-time news feed integration
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Multi-language support
- [ ] Collaborative study groups
- [ ] Progress tracking system

---

**Built with ❤️ for educational excellence** 