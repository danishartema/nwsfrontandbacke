import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes.js";
import { serveStatic } from "../server/vite.js";

console.log("API handler initializing...");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// Initialize routes and static serving
let isInitialized = false;

async function initializeApp() {
  if (isInitialized) {
    console.log("App already initialized");
    return;
  }
  
  console.log("Starting app initialization...");
  
  try {
    console.log("Registering routes...");
    // Register API routes
    await registerRoutes(app);
    console.log("Routes registered successfully");

    // Add error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error("Express error:", err);
      res.status(status).json({ message });
    });

    console.log("Setting up static file serving...");
    // Serve static files for production
    serveStatic(app);
    console.log("Static file serving configured");

    isInitialized = true;
    console.log("App initialization completed successfully");
  } catch (error) {
    console.error("Failed to initialize app:", error);
    throw error;
  }
}

// Vercel serverless function handler
export default async function handler(req: Request, res: Response) {
  console.log(`Handling request: ${req.method} ${req.url}`);
  
  try {
    await initializeApp();
    
    // Handle the request
    return new Promise((resolve, reject) => {
      app(req, res, (err: any) => {
        if (err) {
          console.error("Request handling error:", err);
          reject(err);
        } else {
          console.log(`Request completed: ${req.method} ${req.url}`);
          resolve(undefined);
        }
      });
    });
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
} 