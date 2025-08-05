-- NewsMapper Supabase Database Setup
-- Run this script in your Supabase SQL editor

-- Create news_events table
CREATE TABLE IF NOT EXISTS news_events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  published_date TEXT NOT NULL,
  content TEXT NOT NULL,
  location JSONB NOT NULL,
  category TEXT NOT NULL,
  entities JSONB NOT NULL,
  ai_summary TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  sentiment TEXT NOT NULL,
  sentiment_score REAL NOT NULL,
  geopolitical_impact REAL NOT NULL,
  conflict_escalation_probability REAL NOT NULL,
  economic_impact REAL NOT NULL,
  educational_context JSONB NOT NULL,
  trend_analysis TEXT NOT NULL,
  related_events INTEGER[] DEFAULT '{}',
  study_guide JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create study_guides table
CREATE TABLE IF NOT EXISTS study_guides (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES news_events(id) ON DELETE CASCADE,
  study_guide JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_events_category ON news_events(category);
CREATE INDEX IF NOT EXISTS idx_news_events_sentiment ON news_events(sentiment);
CREATE INDEX IF NOT EXISTS idx_news_events_geopolitical_impact ON news_events(geopolitical_impact);
CREATE INDEX IF NOT EXISTS idx_news_events_created_at ON news_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_study_guides_event_id ON study_guides(event_id);

-- Enable Row Level Security (RLS)
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_guides ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to news_events" ON news_events
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to study_guides" ON study_guides
  FOR SELECT USING (true);

-- Create policy for inserting study guides (for authenticated users or public)
CREATE POLICY "Allow insert to study_guides" ON study_guides
  FOR INSERT WITH CHECK (true);

-- Insert sample data
INSERT INTO news_events (
  title, source, published_date, content, location, category, entities, 
  ai_summary, tags, sentiment, sentiment_score, geopolitical_impact, 
  conflict_escalation_probability, economic_impact, educational_context, 
  trend_analysis, related_events
) VALUES 
(
  'Tensions Escalate Between China and Taiwan After Military Drills',
  'Reuters',
  '2025-08-03',
  'China conducted large-scale military drills around Taiwan''s airspace and waters, involving over 150 aircraft and 30 naval vessels in the largest display of force this year. The exercises simulated blockade scenarios and amphibious assault training, raising concerns among regional allies about potential invasion preparations.',
  '{"country": "Taiwan", "city": "Taipei", "latitude": 25.0330, "longitude": 121.5654}',
  'conflict',
  '{"countries": ["China", "Taiwan", "United States", "Japan"], "people": ["Xi Jinping", "William Lai", "Antony Blinken"], "organizations": ["PLA", "Taiwan Defense Ministry", "QUAD Alliance"]}',
  'China''s unprecedented military exercises near Taiwan signal heightened cross-strait tensions. The drills demonstrate Beijing''s capability for rapid mobilization while testing regional alliance responses and international resolve.',
  ARRAY['Military', 'Asia-Pacific', 'Geopolitics', 'Strategic Competition'],
  'Negative',
  0.92,
  9.5,
  0.78,
  8.7,
  '{"learning_objectives": ["Analyze cross-strait relations and One China Policy implications", "Evaluate regional security architecture in Asia-Pacific", "Understand military deterrence strategies and alliance dynamics"], "related_topics": ["Taiwan Strait Crisis", "Regional Security", "Great Power Competition", "Military Strategy"]}',
  'Escalating pattern with 40% increase in military activities over 6 months, indicating strategic shift toward more assertive posture',
  ARRAY[2, 11, 19]
),
(
  'UN Hosts Global Summit on Climate Action in Geneva',
  'BBC',
  '2025-08-01',
  'World leaders gathered in Geneva for a critical climate summit, securing commitments for $300 billion in climate financing and establishing new carbon reduction targets. The summit addressed adaptation strategies for vulnerable nations and breakthrough agreements on renewable energy transition timelines.',
  '{"country": "Switzerland", "city": "Geneva", "latitude": 46.2044, "longitude": 6.1432}',
  'diplomacy',
  '{"countries": ["Switzerland", "India", "Brazil", "France", "Germany", "Maldives"], "organizations": ["United Nations", "IPCC", "Green Climate Fund"], "people": ["António Guterres", "Narendra Modi", "Emmanuel Macron"]}',
  'Historic climate agreement achieved with unprecedented financial commitments and binding emission targets. The summit demonstrates renewed multilateral cooperation on existential global challenges.',
  ARRAY['Climate', 'Diplomacy', 'Environment', 'Multilateralism'],
  'Positive',
  0.87,
  8.9,
  0.05,
  9.2,
  '{"learning_objectives": ["Examine multilateral climate governance mechanisms", "Analyze climate finance and technology transfer frameworks", "Evaluate small island state vulnerability and adaptation strategies"], "related_topics": ["Paris Agreement", "Climate Justice", "Global Governance", "Sustainable Development"]}',
  'Positive momentum building with increased climate ambition post-COP28, showing 65% improvement in international cooperation',
  ARRAY[8, 15, 18]
),
(
  'Deadly Earthquake Hits Northern Japan',
  'NHK World',
  '2025-07-28',
  'A devastating 7.4 magnitude earthquake struck northern Japan, causing widespread destruction and triggering tsunami warnings across the Pacific Rim. The disaster has resulted in over 200 casualties and displaced thousands, highlighting Japan''s ongoing seismic vulnerabilities despite advanced preparedness systems.',
  '{"country": "Japan", "city": "Sendai", "latitude": 38.2682, "longitude": 140.8694}',
  'disaster',
  '{"countries": ["Japan", "South Korea", "Philippines"], "organizations": ["Japan Meteorological Agency", "Japanese Red Cross", "Pacific Tsunami Warning Center"], "people": ["Fumio Kishida", "Emperor Naruhito"]}',
  'Major earthquake demonstrates Japan''s disaster preparedness capabilities while revealing ongoing vulnerabilities. International humanitarian coordination showcases regional cooperation in crisis response.',
  ARRAY['Natural Disaster', 'Emergency Response', 'Asia', 'Tsunami'],
  'Negative',
  0.94,
  6.8,
  0.02,
  8.5,
  '{"learning_objectives": ["Understand seismic activity patterns in the Pacific Ring of Fire", "Analyze disaster preparedness and early warning systems", "Evaluate international humanitarian response coordination"], "related_topics": ["Plate Tectonics", "Disaster Risk Reduction", "Emergency Management", "Regional Cooperation"]}',
  'Increased seismic activity correlates with broader Pacific Rim geological instability patterns over past decade',
  ARRAY[9, 16, 20]
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated; 