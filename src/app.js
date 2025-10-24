// ===============================================
// src/app.js
// -----------------------------------------------
// Express application configuration and middleware setup
//
// Configures the Express application with all required middleware,
// sets up routing, and exports the configured app instance.
// ===============================================

// 1️⃣ Initialize Express app
//     - Create Express application instance
//     - Set up JSON body parsing middleware
//     - Configure URL-encoded body parsing
//     - Enable CORS for cross-origin requests
//     - Set security headers
//     - Configure request logging
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { metricsMiddleware } from "./middleware/metrics.middleware.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";
import taskRoutes from "./routes/task.routes.js";
import metricsRoutes from "./routes/metrics.routes.js";

const app = express(); //instance

app.use(express.json()); //parse the json bodies
app.use(express.urlencoded({ extended: true })); //parse url encoded bodies
app.use(cors());
app.use(helmet()); //secrurity headers
app.use(morgan()); //log incoming requests

// 2️⃣ Register middleware
//     - Add metrics collection middleware
app.use(metricsMiddleware);
//     - Set up request validation
//     - Configure rate limiting
const limiter = rateliimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
  message: "too many requests please try again later",
});
app.use(limiter);
//     - Add authentication middleware
app.use((req, res, next) => {
  next();
});
//     - Add compression for responses
app.use(compression()); //a middleware for compressing the res body

// 3️⃣ Configure routes
//     - Mount task routes at /api/tasks
//     - Mount metrics routes at /api/metrics
//     - Set up health check endpoint
app.get("api/status", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "server is runnig",
  });
});
//     - Add API documentation routes

// 4️⃣ Error handling
//     - Register custom error handling middleware
//     - Set up 404 handler for undefined routes
//     - Configure error response formatting
//     - Log error details
app.use(notFoundHandler);
app.use(errorHandler);
// 5️⃣ Export configured app
//     - Export Express app instance
//     - Export route configuration
//     - Export middleware stack
export default app;
