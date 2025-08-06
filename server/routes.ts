import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { categoryFilterSchema } from "../shared/schema.js";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple health check endpoint - no dependencies
  app.get("/api/health", (req, res) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      message: "NewsMapper API is running successfully"
    });
  });

  // Root endpoint for basic connectivity test
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "NewsMapper API Server",
      status: "running",
      timestamp: new Date().toISOString()
    });
  });

  // Get all news events with optional filtering
  app.get("/api/news", async (req, res) => {
    try {
      // Handle query parameters properly
      const filter = Object.keys(req.query).length > 0 ? categoryFilterSchema.parse(req.query) : undefined;
      const events = await storage.getNewsEvents(filter);
      res.json(events);
    } catch (error) {
      console.error("Error fetching news events:", error);
      res.status(400).json({ error: "Invalid filter parameters" });
    }
  });

  // Get specific news event
  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getNewsEvent(id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event ID" });
    }
  });

  // Get analytics data
  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Search events
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      const events = await storage.searchEvents(query);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Get events by category
  app.get("/api/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const events = await storage.getEventsByCategory(category);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events by category" });
    }
  });

  // Get events by country
  app.get("/api/country/:country", async (req, res) => {
    try {
      const country = req.params.country;
      const events = await storage.getEventsByCountry(country);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events by country" });
    }
  });

  // Generate study guide for an event
  app.post("/api/study-guide/:eventId", async (req, res) => {
    try {
      const eventId = parseInt(req.params.eventId);
      const options = req.body || {};
      
      const studyGuide = await storage.generateStudyGuide(eventId, options);
      if (!studyGuide) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      res.json(studyGuide);
    } catch (error) {
      console.error("Error generating study guide:", error);
      res.status(500).json({ error: "Failed to generate study guide" });
    }
  });

  // Get study guide for an event
  app.get("/api/study-guide/:eventId", async (req, res) => {
    try {
      const eventId = parseInt(req.params.eventId);
      const studyGuide = await storage.generateStudyGuide(eventId);
      
      if (!studyGuide) {
        return res.status(404).json({ error: "Event not found or study guide not available" });
      }
      
      res.json(studyGuide);
    } catch (error) {
      console.error("Error fetching study guide:", error);
      res.status(500).json({ error: "Failed to fetch study guide" });
    }
  });

  // Get all study guides
  app.get("/api/study-guides", async (req, res) => {
    try {
      const studyGuides = await storage.getAllStudyGuides();
      res.json(studyGuides);
    } catch (error) {
      console.error("Error fetching study guides:", error);
      res.status(500).json({ error: "Failed to fetch study guides" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
