# Supabase Setup Guide for NewsMapper

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `newsmapper-db`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"

### 2. Get Your Supabase Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon Public Key** (starts with `eyJ...`)

### 3. Set Up Database Tables

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `supabase-setup.sql`
3. Click "Run" to execute the script
4. This will create:
   - `news_events` table with sample data
   - `study_guides` table
   - Proper indexes and security policies

### 4. Configure Environment Variables

#### For Local Development:
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key-here`

### 5. Test the Connection

After setting up, test your API endpoints:

```bash
# Health check
curl https://your-vercel-domain.vercel.app/api/health

# Get all news
curl https://your-vercel-domain.vercel.app/api/news

# Get specific news item
curl https://your-vercel-domain.vercel.app/api/news?id=1

# Get analytics
curl https://your-vercel-domain.vercel.app/api/analytics
```

## 📊 Database Schema

### news_events Table
- `id`: Primary key (auto-increment)
- `title`: News headline
- `source`: News source (e.g., "Reuters", "BBC")
- `published_date`: Publication date
- `content`: Full article content
- `location`: JSON with country, city, coordinates
- `category`: Event category (conflict, diplomacy, economy, etc.)
- `entities`: JSON with countries, people, organizations
- `ai_summary`: AI-generated summary
- `tags`: Array of tags
- `sentiment`: Sentiment analysis (Positive/Negative/Neutral)
- `sentiment_score`: Sentiment score (0-1)
- `geopolitical_impact`: Impact score (0-10)
- `conflict_escalation_probability`: Risk score (0-1)
- `economic_impact`: Economic impact score (0-10)
- `educational_context`: JSON with learning objectives
- `trend_analysis`: Trend analysis text
- `related_events`: Array of related event IDs
- `study_guide`: JSON study guide data
- `created_at`: Timestamp

### study_guides Table
- `id`: Primary key
- `event_id`: Foreign key to news_events
- `study_guide`: JSON study guide content
- `created_at`: Timestamp

## 🔒 Security Features

- **Row Level Security (RLS)** enabled
- **Public read access** for news and study guides
- **Authenticated write access** for study guides
- **Proper indexing** for performance

## 🛠️ API Endpoints

All endpoints now use Supabase backend:

- `GET /api/health` - Health check
- `GET /api/news` - Get all news events (with filtering)
- `GET /api/news?id=1` - Get specific news event
- `GET /api/analytics` - Get analytics data
- `GET /api/search?q=query` - Search events
- `GET /api/category?category=conflict` - Get events by category
- `GET /api/country?country=China` - Get events by country
- `POST /api/study-guide?eventId=1` - Generate study guide
- `GET /api/study-guides` - Get all study guides

## 🔧 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Ensure environment variables are set correctly
   - Check for typos in variable names

2. **"Database connection failed"**
   - Verify Supabase URL and key are correct
   - Check if Supabase project is active

3. **"Table not found"**
   - Run the `supabase-setup.sql` script
   - Check if tables were created successfully

4. **"Permission denied"**
   - Verify RLS policies are set correctly
   - Check if anon key has proper permissions

### Debug Steps:

1. Check Supabase logs in dashboard
2. Test connection with simple query
3. Verify environment variables in Vercel
4. Check API response for error details

## 🚀 Benefits of Supabase

✅ **Reliable**: Built on PostgreSQL  
✅ **Scalable**: Handles traffic spikes  
✅ **Real-time**: Live data updates  
✅ **Secure**: Built-in authentication  
✅ **Fast**: Global CDN  
✅ **Free Tier**: Generous limits  

## 📈 Performance

- **Query Optimization**: Proper indexes on frequently queried columns
- **Connection Pooling**: Efficient database connections
- **Caching**: Built-in caching for better performance
- **CDN**: Global content delivery

## 🔄 Migration from Previous Setup

The new Supabase setup:
- Replaces in-memory data storage
- Provides persistent data storage
- Enables real-time features
- Improves scalability
- Adds proper error handling

Your existing API endpoints will work the same way, but now with reliable database backend! 