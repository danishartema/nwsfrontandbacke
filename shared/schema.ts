import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, real, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Location schema
const locationSchema = z.object({
  country: z.string(),
  city: z.string(),
  latitude: z.number(),
  longitude: z.number()
});

// Entities schema
const entitiesSchema = z.object({
  countries: z.array(z.string()),
  people: z.array(z.string()).optional(),
  organizations: z.array(z.string()).optional()
});

// Educational context schema
const educationalContextSchema = z.object({
  learning_objectives: z.array(z.string()),
  related_topics: z.array(z.string())
});

// Study guide schema
const studyGuideSchema = z.object({
  summary: z.string(),
  keywords: z.array(z.string()),
  key_figures_data: z.string(),
  discussion_questions: z.array(z.string()),
  quiz_questions: z.array(z.object({
    question: z.string(),
    type: z.enum(['multiple_choice', 'true_false', 'short_answer']),
    options: z.array(z.string()).optional(),
    correct_answer: z.string(),
    explanation: z.string()
  })),
  vocabulary: z.array(z.object({
    term: z.string(),
    definition: z.string()
  })),
  css_linkage: z.array(z.string()),
  exam_relevance: z.object({
    css: z.boolean(),
    issb: z.boolean(),
    sat: z.boolean(),
    general_current_affairs: z.boolean()
  })
});

export const newsEvents = pgTable("news_events", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  source: text("source").notNull(),
  published_date: text("published_date").notNull(),
  content: text("content").notNull(),
  location: jsonb("location").$type<z.infer<typeof locationSchema>>().notNull(),
  category: text("category").notNull(),
  entities: jsonb("entities").$type<z.infer<typeof entitiesSchema>>().notNull(),
  ai_summary: text("ai_summary").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  sentiment: text("sentiment").notNull(),
  sentiment_score: real("sentiment_score").notNull(),
  geopolitical_impact: real("geopolitical_impact").notNull(),
  conflict_escalation_probability: real("conflict_escalation_probability").notNull(),
  economic_impact: real("economic_impact").notNull(),
  educational_context: jsonb("educational_context").$type<z.infer<typeof educationalContextSchema>>().notNull(),
  trend_analysis: text("trend_analysis").notNull(),
  related_events: jsonb("related_events").$type<number[]>().default([]),
  study_guide: jsonb("study_guide").$type<z.infer<typeof studyGuideSchema>>(),
  created_at: timestamp("created_at").default(sql`now()`).notNull()
});

export const insertNewsEventSchema = createInsertSchema(newsEvents).omit({
  created_at: true
});

export type InsertNewsEvent = z.infer<typeof insertNewsEventSchema>;
export type NewsEvent = typeof newsEvents.$inferSelect;

// Filter schemas
export const categoryFilterSchema = z.object({
  categories: z.array(z.string()).optional(),
  sentiment: z.array(z.string()).optional(),
  dateRange: z.object({
    start: z.string().optional(),
    end: z.string().optional()
  }).optional(),
  search: z.string().optional(),
  country: z.string().optional(),
  minImpact: z.number().optional(),
  maxImpact: z.number().optional()
});

export type CategoryFilter = z.infer<typeof categoryFilterSchema>;

// Analytics schemas
export const analyticsSchema = z.object({
  totalEvents: z.number(),
  hotspots: z.number(),
  eventDistribution: z.record(z.number()),
  topHotspots: z.array(z.object({
    region: z.string(),
    type: z.string(),
    score: z.number(),
    riskLevel: z.string()
  }))
});

export type Analytics = z.infer<typeof analyticsSchema>;
export type StudyGuide = z.infer<typeof studyGuideSchema>;
