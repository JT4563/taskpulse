// ===============================================
// src/index.js
// -----------------------------------------------
// Main entry point for the TaskPulse application
//
// Initializes the Express server, connects to databases,
// and starts listening for incoming requests.
// ===============================================

// 1️⃣ Initialize application
//     - Load environment variables using dotenv
//     - Import Express app configuration
//     - Set up signal handlers for graceful shutdown
//     - Connect to PostgreSQL via Prisma
//     - Initialize Redis client connection
//     - Establish RabbitMQ connection
//     - Start HTTP server on specified port
//     - Log server startup messages
//     - Handle server startup errors

// 2️⃣ Graceful shutdown handler
//     - Close HTTP server connections
//     - Disconnect from PostgreSQL database
//     - Close Redis connections
//     - Close RabbitMQ connections
//     - Exit process gracefully
//     - Log shutdown messages

// 3️⃣ Error handling
//     - Handle uncaught exceptions
//     - Handle unhandled promise rejections
//     - Log error details
//     - Trigger graceful shutdown
