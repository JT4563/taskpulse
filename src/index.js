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
import dotenv from "dotenv";
dotenv.config();
//     - Import Express app configuration
import app from "./app.js";
//     - Set up signal handlers for graceful shutdown
import process from "process";
//     - Connect to PostgreSQL via Prisma
import { prisma } from "./services/prisma.service.js";
//     - Initialize Redis client connection
import { redisClient } from "./services/cache.service.js";
//     - Establish RabbitMQ connection
import { rabbitConnection, rabbitChannel } from "./services/queue.service.js";
//     - Start HTTP server on specified port
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`taskpulse backned is runnign on {PORT}`);
});
//     - Log server startup messages
console.log(" Environment:", process.env.NODE_ENV || "development");
console.log(" PostgreSQL, Redis, and RabbitMQ connections initialized");
//     - Handle server startup errors
server.on("error", (err) => {
  console.log("server startup error, err.message");
  process.exit(1);
});
// 2️⃣ Graceful shutdown handler
//     - Close HTTP server connections
//     - Disconnect from PostgreSQL database
//     - Close Redis connections
//     - Close RabbitMQ connections
//     - Exit process gracefully
//     - Log shutdown messages
const gracefulShutdown = async () => {
  console.log("\n intializing graceful shutdown");
  try {
    await prisma.$disconnect();
    console.log("Prisma disconnected");

    await redisClient.quit();
    console.log("redis conneciton close");

    if (rabbitChannel) await rabbitChannel.close();
    if (rabbitConnection) await rabbitConnection.close();
    console.log("rabbitmq conneciton closed");

    console.log("all process exit successful");
    process.extit(0);
  } catch (err) {
    console.error(" Error during shutdown:", err.message);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// 3️⃣ Error handling
//     - Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  gracefulShutdown();
});
//     - Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.error(" Unhandled Promise Rejection:", reason);
  gracefulShutdown();
});

//     - Log error details
//     - Trigger graceful shutdown
