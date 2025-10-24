// ===============================================
// src/routes/metrics.routes.js
// -----------------------------------------------
// Metrics and monitoring routes
//
// Defines HTTP endpoints for system monitoring,
// health checks, and performance metrics.
// ===============================================

// 1️⃣ GET /api/metrics
//     - Route for Prometheus metrics exposure
//     - Maps to metricsController.getMetrics
//     - Returns metrics in Prometheus format
//     - Sets appropriate content type header
//     - Handles metric collection errors
//     - No authentication required for scraping

// 2️⃣ GET /api/health
//     - Route for service health checks
//     - Maps to metricsController.getHealthStatus
//     - Performs dependency health checks
//     - Returns health status with 200/503
//     - Includes detailed service information
//     - Used by container orchestrators

// 3️⃣ GET /api/stats
//     - Route for system statistics
//     - Maps to metricsController.getSystemStats
//     - Returns Node.js process metrics
//     - Includes memory and CPU information
//     - Provides performance data
//     - Returns data with 200 status

// 4️⃣ GET /api/queue-metrics
//     - Route for queue performance data
//     - Maps to metricsController.getQueueMetrics
//     - Returns RabbitMQ queue statistics
//     - Shows pending task counts
//     - Provides processing time metrics
//     - Returns data with 200 status

// 5️⃣ GET /api/cache-metrics
//     - Route for cache performance data
//     - Maps to metricsController.getCacheMetrics
//     - Returns Redis cache statistics
//     - Shows hit/miss ratios
//     - Provides memory usage data
//     - Returns data with 200 status

// 6️⃣ Route protection
//     - Apply rate limiting to metrics endpoints
//     - Restrict access to health endpoint
//     - Allow public access to Prometheus metrics
//     - Log metric access requests
//     - Handle authentication for admin routes
