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

// 2️⃣ Register middleware
//     - Add metrics collection middleware
//     - Set up request validation
//     - Add authentication middleware
//     - Configure rate limiting
//     - Add compression for responses

// 3️⃣ Configure routes
//     - Mount task routes at /api/tasks
//     - Mount metrics routes at /api/metrics
//     - Set up health check endpoint
//     - Add API documentation routes

// 4️⃣ Error handling
//     - Register custom error handling middleware
//     - Set up 404 handler for undefined routes
//     - Configure error response formatting
//     - Log error details

// 5️⃣ Export configured app
//     - Export Express app instance
//     - Export route configuration
//     - Export middleware stack
