// ===============================================
// src/middleware/metrics.middleware.js
// -----------------------------------------------
// Metrics collection middleware
//
// Collects HTTP request metrics for monitoring and observability,
// integrating with Prometheus for metric exposition.
// ===============================================

// 1️⃣ collectRequestMetrics(req, res, next)
//     - Track incoming HTTP requests
//     - Record request method and path
//     - Measure request duration
//     - Count requests by status code
//     - Monitor response sizes
//     - Update Prometheus metrics
//     - Pass control to next middleware

// 2️⃣ startRequestTimer(req, res, next)
//     - Initialize request timing
//     - Store request start time
//     - Generate unique request ID
//     - Add timing metadata to request
//     - Set up response finish listener
//     - Track concurrent requests
//     - Pass control to next middleware

// 3️⃣ recordRequestDuration(req, res)
//     - Calculate request processing time
//     - Record duration metric
//     - Label metrics with method and route
//     - Include status code in labels
//     - Update histogram buckets
//     - Handle timer cleanup

// 4️⃣ incrementRequestCounter(req, res)
//     - Increment request counter metric
//     - Label with HTTP method
//     - Label with matched route
//     - Label with response status code
//     - Track total request volume
//     - Update rate metrics

// 5️⃣ trackActiveRequests(req, res, next)
//     - Increment active requests gauge
//     - Label with request method
//     - Decrement on response finish
//     - Monitor concurrent connections
//     - Handle request abortion
//     - Update peak concurrency

// 6️⃣ collectResponseSize(res)
//     - Measure response content length
//     - Record response size metrics
//     - Track size by route and method
//     - Update size distribution
//     - Handle chunked responses
//     - Monitor bandwidth usage

// 7️⃣ initializeMetrics()
//     - Create Prometheus metric instances
//     - Define histogram buckets
//     - Set up counter configurations
//     - Configure gauge settings
//     - Export metrics for collection
//     - Handle metric initialization errors
