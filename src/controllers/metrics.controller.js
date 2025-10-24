// ===============================================
// src/controllers/metrics.controller.js
// -----------------------------------------------
// Metrics and monitoring controller
//
// Exposes application metrics for Prometheus scraping and
// provides health check endpoints for service monitoring.
// ===============================================

// 1️⃣ getMetrics(req, res, next)
//     - Collect application metrics from Prometheus client
//     - Format metrics in Prometheus text format
//     - Return metrics data with proper content type
//     - Handle metric collection errors
//     - Include custom business metrics
//     - Ensure efficient metric gathering

// 2️⃣ getHealthStatus(req, res, next)
//     - Check database connection status via Prisma
//     - Verify Redis connectivity
//     - Test RabbitMQ connection
//     - Validate service dependencies
//     - Return health status with 200/503 status
//     - Include detailed service information
//     - Handle health check timeouts

// 3️⃣ getSystemStats(req, res, next)
//     - Collect Node.js process metrics
//     - Gather memory usage statistics
//     - Collect CPU usage information
//     - Return system statistics
//     - Handle metric collection errors
//     - Format data for monitoring dashboards

// 4️⃣ getQueueMetrics(req, res, next)
//     - Query RabbitMQ for queue statistics
//     - Get pending task count
//     - Collect processing time metrics
//     - Return queue health information
//     - Handle RabbitMQ connection errors
//     - Format data for visualization

// 5️⃣ getCacheMetrics(req, res, next)
//     - Query Redis for cache statistics
//     - Get cache hit/miss ratios
//     - Collect memory usage data
//     - Return cache performance metrics
//     - Handle Redis connection errors
//     - Format data for monitoring
