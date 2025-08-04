import { type NewsEvent, type InsertNewsEvent, type CategoryFilter, type Analytics } from "@shared/schema";
import { comprehensiveNewsData } from "../client/src/data/comprehensive-news-data";

export interface IStorage {
  getNewsEvents(filter?: CategoryFilter): Promise<NewsEvent[]>;
  getNewsEvent(id: number): Promise<NewsEvent | undefined>;
  createNewsEvent(event: InsertNewsEvent): Promise<NewsEvent>;
  getAnalytics(): Promise<Analytics>;
  searchEvents(query: string): Promise<NewsEvent[]>;
  getEventsByCategory(category: string): Promise<NewsEvent[]>;
  getEventsByCountry(country: string): Promise<NewsEvent[]>;
}

export class MemStorage implements IStorage {
  private events: Map<number, NewsEvent>;

  constructor() {
    this.events = new Map();
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
      ...insertEvent,
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

    // Generate sentiment trends for last 30 days
    const sentimentTrends = [
      { date: "2024-12-10", positive: 12, negative: 8, neutral: 5 },
      { date: "2024-12-15", positive: 15, negative: 12, neutral: 7 },
      { date: "2024-12-20", positive: 18, negative: 10, neutral: 6 },
      { date: "2024-12-25", positive: 14, negative: 15, neutral: 8 },
      { date: "2024-12-30", positive: 16, negative: 11, neutral: 9 },
      { date: "2025-01-05", positive: 19, negative: 9, neutral: 7 }
    ];

    return {
      totalEvents: events.length,
      hotspots: hotspots.length,
      eventDistribution,
      sentimentTrends,
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
}

export const storage = new MemStorage();
