import { type NewsEvent, type InsertNewsEvent, type CategoryFilter, type Analytics, type StudyGuide } from "@shared/schema";
import { comprehensiveNewsData } from "../client/src/data/comprehensive-news-data";
import { studyGuideGenerator } from "./study-guide-generator";

export interface IStorage {
  getNewsEvents(filter?: CategoryFilter): Promise<NewsEvent[]>;
  getNewsEvent(id: number): Promise<NewsEvent | undefined>;
  createNewsEvent(event: InsertNewsEvent): Promise<NewsEvent>;
  getAnalytics(): Promise<Analytics>;
  searchEvents(query: string): Promise<NewsEvent[]>;
  getEventsByCategory(category: string): Promise<NewsEvent[]>;
  getEventsByCountry(country: string): Promise<NewsEvent[]>;
  generateStudyGuide(eventId: number, options?: any): Promise<StudyGuide | null>;
  getAllStudyGuides(): Promise<{ eventId: number; studyGuide: StudyGuide }[]>;
}

export class MemStorage implements IStorage {
  private events: Map<number, NewsEvent>;
  private studyGuides: Map<number, StudyGuide>;

  constructor() {
    this.events = new Map();
    this.studyGuides = new Map();
    // Initialize with comprehensive sample data
    comprehensiveNewsData.forEach(event => {
      this.events.set(event.id, event);
    });
  }

  async getNewsEvents(filter?: CategoryFilter): Promise<NewsEvent[]> {
    let events = Array.from(this.events.values());

    if (filter) {
      if (filter.categories && filter.categories.length > 0) {
        events = events.filter(event => filter.categories!.includes(event.category));
      }

      if (filter.sentiment && filter.sentiment.length > 0) {
        events = events.filter(event => filter.sentiment!.includes(event.sentiment));
      }

      if (filter.search) {
        const query = filter.search.toLowerCase();
        events = events.filter(event => 
          event.title.toLowerCase().includes(query) ||
          event.content.toLowerCase().includes(query) ||
          event.location.country.toLowerCase().includes(query) ||
          event.location.city.toLowerCase().includes(query)
        );
      }

      if (filter.country) {
        events = events.filter(event => 
          event.location.country.toLowerCase().includes(filter.country!.toLowerCase())
        );
      }

      if (filter.minImpact !== undefined) {
        events = events.filter(event => event.geopolitical_impact >= filter.minImpact!);
      }

      if (filter.maxImpact !== undefined) {
        events = events.filter(event => event.geopolitical_impact <= filter.maxImpact!);
      }

      if (filter.dateRange) {
        const start = filter.dateRange.start ? new Date(filter.dateRange.start) : null;
        const end = filter.dateRange.end ? new Date(filter.dateRange.end) : null;
        
        events = events.filter(event => {
          const eventDate = new Date(event.published_date);
          if (start && eventDate < start) return false;
          if (end && eventDate > end) return false;
          return true;
        });
      }
    }

    return events.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
  }

  async getNewsEvent(id: number): Promise<NewsEvent | undefined> {
    return this.events.get(id);
  }

  async createNewsEvent(insertEvent: InsertNewsEvent): Promise<NewsEvent> {
    const event: NewsEvent = {
      id: insertEvent.id,
      title: insertEvent.title,
      source: insertEvent.source,
      published_date: insertEvent.published_date,
      content: insertEvent.content,
      location: insertEvent.location,
      category: insertEvent.category,
      entities: insertEvent.entities as any,
      ai_summary: insertEvent.ai_summary,
      tags: insertEvent.tags as any,
      sentiment: insertEvent.sentiment,
      sentiment_score: insertEvent.sentiment_score,
      geopolitical_impact: insertEvent.geopolitical_impact,
      conflict_escalation_probability: insertEvent.conflict_escalation_probability,
      economic_impact: insertEvent.economic_impact,
      educational_context: insertEvent.educational_context as any,
      trend_analysis: insertEvent.trend_analysis,
      related_events: insertEvent.related_events as any || [],
      study_guide: null,
      created_at: new Date()
    };
    this.events.set(event.id, event);
    return event;
  }

  async getAnalytics(): Promise<Analytics> {
    const events = Array.from(this.events.values());
    
    // Calculate event distribution by category
    const eventDistribution = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate hotspots
    const hotspots = [
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
    ];

    return {
      totalEvents: events.length,
      hotspots: hotspots.length,
      eventDistribution,
      topHotspots: hotspots
    };
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
    const event = await this.getNewsEvent(eventId);
    if (!event) {
      return null;
    }

    // Check if study guide already exists
    if (this.studyGuides.has(eventId)) {
      return this.studyGuides.get(eventId)!;
    }

    // Generate new study guide
    const studyGuide = await studyGuideGenerator.generateStudyGuide(event, options);
    this.studyGuides.set(eventId, studyGuide);
    
    return studyGuide;
  }

  async getAllStudyGuides(): Promise<{ eventId: number; studyGuide: StudyGuide }[]> {
    const results: { eventId: number; studyGuide: StudyGuide }[] = [];
    
    for (const [eventId, studyGuide] of this.studyGuides.entries()) {
      results.push({ eventId, studyGuide });
    }
    
    return results;
  }
}

export const storage = new MemStorage();
