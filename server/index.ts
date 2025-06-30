import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "./config/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import { handleDemo } from "./routes/demo.js";
import leadRoutes from "./routes/lead.js";
import reviewsRoutes from "./routes/reviews.js";
import contactRoutes from "./routes/contact.js";

export function createServer() {
  const app = express();

  // Security middleware
  app.use(helmet());
  
  // CORS configuration
  app.use(cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    max: config.RATE_LIMIT_MAX_REQUESTS,
    message: {
      success: false,
      message: "Too many requests from this IP, please try again later.",
    },
  });
  app.use("/api/", limiter);

  // Compression
  app.use(compression());

  // Logging
  if (config.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }

  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      success: true,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
    });
  });

  // API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/posts", postsRoutes);
  app.use("/api/reviews", reviewsRoutes);
  
  // Legacy demo route
  app.get("/api/demo", handleDemo);

  // New lead route
  app.use("/api/lead", leadRoutes);

  // New contact route
  app.use("/api/contact", contactRoutes);

  // 404 handler
  app.use(notFoundHandler);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}

// Start server if this file is run directly
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('server/index.ts')) {
  console.log("🚀 Starting server...");
  const app = createServer();
  const port = config.PORT;

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📊 Environment: ${config.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${port}/api/health`);
  });
} 