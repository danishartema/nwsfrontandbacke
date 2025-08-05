import { supabase, type NewsEvent, type Analytics, type StudyGuide } from './supabase';

export class SupabaseStorage {
  async getNewsEvents(filter?: any): Promise<NewsEvent[]> {
    try {
      let query = supabase
        .from('news_events')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filter?.categories && filter.categories.length > 0) {
        query = query.in('category', filter.categories);
      }

      if (filter?.search) {
        const searchTerm = filter.search.toLowerCase();
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,location->country.ilike.%${searchTerm}%`);
      }

      if (filter?.country) {
        query = query.ilike('location->country', `%${filter.country}%`);
      }

      if (filter?.minImpact !== undefined) {
        query = query.gte('geopolitical_impact', filter.minImpact);
      }

      if (filter?.maxImpact !== undefined) {
        query = query.lte('geopolitical_impact', filter.maxImpact);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching news events:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Supabase error:', error);
      // Fallback to sample data if database is not available
      return this.getSampleData();
    }
  }

  async getNewsEvent(id: number): Promise<NewsEvent | undefined> {
    try {
      const { data, error } = await supabase
        .from('news_events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching news event:', error);
        return undefined;
      }

      return data;
    } catch (error) {
      console.error('Supabase error:', error);
      // Fallback to sample data
      return this.getSampleData().find(event => event.id === id);
    }
  }

  async getAnalytics(): Promise<Analytics> {
    try {
      const { data: events, error } = await supabase
        .from('news_events')
        .select('category, geopolitical_impact');

      if (error) {
        console.error('Error fetching analytics:', error);
        throw error;
      }

      const eventDistribution = events?.reduce((acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return {
        totalEvents: events?.length || 0,
        hotspots: 3,
        eventDistribution,
        topHotspots: [
          {
            region: "Taiwan Strait",
            type: "High Conflict Risk",
            score: 9.2,
            riskLevel: "Critical"
          },
          {
            region: "South Asia",
            type: "Climate Impact",
            score: 8.7,
            riskLevel: "High"
          },
          {
            region: "Middle East",
            type: "Diplomatic Activity",
            score: 7.9,
            riskLevel: "Medium"
          }
        ]
      };
    } catch (error) {
      console.error('Supabase analytics error:', error);
      // Return fallback analytics
      return {
        totalEvents: 20,
        hotspots: 3,
        eventDistribution: { conflict: 8, diplomacy: 6, economy: 4, disaster: 2 },
        topHotspots: [
          {
            region: "Taiwan Strait",
            type: "High Conflict Risk",
            score: 9.2,
            riskLevel: "Critical"
          },
          {
            region: "South Asia",
            type: "Climate Impact",
            score: 8.7,
            riskLevel: "High"
          },
          {
            region: "Middle East",
            type: "Diplomatic Activity",
            score: 7.9,
            riskLevel: "Medium"
          }
        ]
      };
    }
  }

  async searchEvents(query: string): Promise<NewsEvent[]> {
    return this.getNewsEvents({ search: query });
  }

  async getEventsByCategory(category: string): Promise<NewsEvent[]> {
    return this.getNewsEvents({ categories: [category] });
  }

  async getEventsByCountry(country: string): Promise<NewsEvent[]> {
    return this.getNewsEvents({ country });
  }

  async generateStudyGuide(eventId: number, options?: any): Promise<StudyGuide | null> {
    try {
      const event = await this.getNewsEvent(eventId);
      if (!event) {
        return null;
      }

      // Check if study guide already exists in database
      const { data: existingGuide } = await supabase
        .from('study_guides')
        .select('*')
        .eq('event_id', eventId)
        .single();

      if (existingGuide) {
        return existingGuide.study_guide;
      }

      // Generate new study guide
      const studyGuide = this.generateStudyGuideContent(event, options);

      // Save to database
      await supabase
        .from('study_guides')
        .insert({
          event_id: eventId,
          study_guide: studyGuide,
          created_at: new Date().toISOString()
        });

      return studyGuide;
    } catch (error) {
      console.error('Error generating study guide:', error);
      return null;
    }
  }

  async getAllStudyGuides(): Promise<{ eventId: number; studyGuide: StudyGuide }[]> {
    try {
      const { data, error } = await supabase
        .from('study_guides')
        .select('*');

      if (error) {
        console.error('Error fetching study guides:', error);
        return [];
      }

      return data?.map(item => ({
        eventId: item.event_id,
        studyGuide: item.study_guide
      })) || [];
    } catch (error) {
      console.error('Error fetching study guides:', error);
      return [];
    }
  }

  // Fallback sample data
  private getSampleData(): NewsEvent[] {
    return [
      {
        id: 1,
        title: "Tensions Escalate Between China and Taiwan After Military Drills",
        source: "Reuters",
        published_date: "2025-08-03",
        content: "China conducted large-scale military drills around Taiwan's airspace and waters, involving over 150 aircraft and 30 naval vessels in the largest display of force this year.",
        location: { country: "Taiwan", city: "Taipei", latitude: 25.0330, longitude: 121.5654 },
        category: "conflict",
        entities: { countries: ["China", "Taiwan", "United States", "Japan"] },
        ai_summary: "China's unprecedented military exercises near Taiwan signal heightened cross-strait tensions.",
        tags: ["Military", "Asia-Pacific", "Geopolitics"],
        sentiment: "Negative",
        sentiment_score: 0.92,
        geopolitical_impact: 9.5,
        conflict_escalation_probability: 0.78,
        economic_impact: 8.7,
        educational_context: {
          learning_objectives: ["Analyze cross-strait relations", "Evaluate regional security"],
          related_topics: ["Taiwan Strait Crisis", "Regional Security"]
        },
        trend_analysis: "Escalating pattern with 40% increase in military activities",
        related_events: [2, 11, 19],
        study_guide: null,
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: "UN Hosts Global Summit on Climate Action in Geneva",
        source: "BBC",
        published_date: "2025-08-01",
        content: "World leaders gathered in Geneva for a critical climate summit, securing commitments for $300 billion in climate financing.",
        location: { country: "Switzerland", city: "Geneva", latitude: 46.2044, longitude: 6.1432 },
        category: "diplomacy",
        entities: { countries: ["Switzerland", "India", "Brazil", "France"] },
        ai_summary: "Historic climate agreement achieved with unprecedented financial commitments.",
        tags: ["Climate", "Diplomacy", "Environment"],
        sentiment: "Positive",
        sentiment_score: 0.87,
        geopolitical_impact: 8.9,
        conflict_escalation_probability: 0.05,
        economic_impact: 9.2,
        educational_context: {
          learning_objectives: ["Examine multilateral climate governance", "Analyze climate finance"],
          related_topics: ["Paris Agreement", "Climate Justice"]
        },
        trend_analysis: "Positive momentum building with increased climate ambition",
        related_events: [8, 15, 18],
        study_guide: null,
        created_at: new Date().toISOString()
      }
    ];
  }

  private generateStudyGuideContent(event: NewsEvent, options?: any): StudyGuide {
    return {
      summary: `${event.ai_summary} This ${event.category} event in ${event.location.city}, ${event.location.country} has significant geopolitical implications.`,
      keywords: [event.category, ...event.entities.countries, 'geopolitics', 'international relations'],
      key_figures_data: `Countries involved: ${event.entities.countries.join(', ')}. Geopolitical Impact: ${event.geopolitical_impact}/10.`,
      discussion_questions: [
        `What are the primary causes behind this ${event.category} situation?`,
        `How might this event affect regional stability?`,
        `What diplomatic solutions could help de-escalate this situation?`
      ],
      quiz_questions: [
        {
          question: `Which country is primarily featured in this ${event.category} event?`,
          type: 'multiple_choice',
          options: [event.location.country, 'United States', 'United Kingdom', 'Germany'],
          correct_answer: event.location.country,
          explanation: `The event took place in ${event.location.city}, ${event.location.country}.`
        }
      ],
      vocabulary: [
        { term: 'Geopolitics', definition: 'Politics influenced by geography, especially in international relations.' },
        { term: 'International Relations', definition: 'The study of relationships between countries.' }
      ],
      css_linkage: ['Current Affairs', 'International Relations', 'Political Science'],
      exam_relevance: {
        css: true,
        issb: event.category === 'conflict',
        sat: true,
        general_current_affairs: true
      }
    };
  }
}

export const supabaseStorage = new SupabaseStorage(); 