// ===============================================
// src/middleware/error.middleware.js
// -----------------------------------------------
// Error handling middleware
//
// Centralized error handling for the application,
// providing consistent error responses and logging.
// ===============================================

// 1️⃣ errorHandler(err, req, res, next)
//     - Catch all application errors
//     - Log error details with context
//     - Determine error type and status code
//     - Format error response consistently
//     - Handle validation errors
//     - Manage database errors
//     - Process operational vs programming errors

// 2️⃣ handleValidationError(err)
//     - Identify validation error types
//     - Extract validation error details
//     - Format user-friendly error messages
//     - Set appropriate HTTP status code (400)
//     - Return structured error response
//     - Log validation failures

// 3️⃣ handleDatabaseError(err)
//     - Identify database error types
//     - Extract constraint violation details
//     - Format database error messages
//     - Set appropriate HTTP status code (500/409)
//     - Return structured error response
//     - Log database errors

// 4️⃣ handleNotFoundError(err)
//     - Identify resource not found errors
//     - Set appropriate HTTP status code (404)
//     - Return consistent not found response
//     - Log missing resource attempts
//     - Handle different entity types

// 5️⃣ handleUnauthorizedError(err)
//     - Identify authentication errors
//     - Set appropriate HTTP status code (401)
//     - Return unauthorized response
//     - Log failed access attempts
//     - Handle token expiration

// 6️⃣ logError(err, req)
//     - Log error with request context
//     - Include user information if available
//     - Record timestamp and error details
//     - Store error in error tracking service
//     - Handle sensitive data filtering
//     - Format logs for monitoring systems

// 7️⃣ sendErrorResponse(err, res)
//     - Format error response JSON
//     - Include error code and message
//     - Add request ID for tracing
//     - Set appropriate HTTP headers
//     - Send response to client
//     - Handle different response formats
