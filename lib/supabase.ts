import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types based on your schema
export interface NewsEvent {
  id: number;
  title: string;
  source: string;
  published_date: string;
  content: string;
  location: {
    country: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  category: string;
  entities: {
    countries: string[];
    people?: string[];
    organizations?: string[];
  };
  ai_summary: string;
  tags: string[];
  sentiment: string;
  sentiment_score: number;
  geopolitical_impact: number;
  conflict_escalation_probability: number;
  economic_impact: number;
  educational_context: {
    learning_objectives: string[];
    related_topics: string[];
  };
  trend_analysis: string;
  related_events: number[];
  study_guide: any;
  created_at: string;
}

export interface Analytics {
  totalEvents: number;
  hotspots: number;
  eventDistribution: Record<string, number>;
  topHotspots: Array<{
    region: string;
    type: string;
    score: number;
    riskLevel: string;
  }>;
}

export interface StudyGuide {
  summary: string;
  keywords: string[];
  key_figures_data: string;
  discussion_questions: string[];
  quiz_questions: Array<{
    question: string;
    type: 'multiple_choice' | 'true_false' | 'short_answer';
    options?: string[];
    correct_answer: string;
    explanation: string;
  }>;
  vocabulary: Array<{
    term: string;
    definition: string;
  }>;
  css_linkage: string[];
  css_preparation_guide?: {
    current_affairs_topics: string[];
    key_preparation_areas: string[];
    recommended_focus: string[];
    exam_pattern_relevance: string;
    study_approach: string[];
  };
  exam_relevance: {
    css: boolean;
    issb: boolean;
    sat: boolean;
    general_current_affairs: boolean;
  };
} 