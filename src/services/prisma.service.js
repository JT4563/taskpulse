// ===============================================
// src/services/prisma.service.js
// -----------------------------------------------
// Prisma ORM database service
//
// Manages database connections and provides data access layer
// for all PostgreSQL operations using Prisma Client.
// ===============================================
import { PrismaClient } from "@prisma/client";
import pRetry from "p-retry";

// 1️⃣ initializePrisma()
//     - Create Prisma Client instance
const prisma = new PrismaClient({
  log: ["info", "warn", "error"],
});
//     - Configure database connection pooling~
// Prisma internally manages connection pooling via the underlying driver.
// However, production systems should still handle transient startup failures
// (like PostgreSQL not ready yet). We'll handle this via `p-retry` below.
//     - Set up connection retry logic
async function intializePrisma() {
  await pRetry(
    async () => {
      await prisma.$connect();
    },
    {
      retries: 5,// maximum retry attempts
      factor: 2,// exponential backoff factor
      onFailedAttempt: (error) => {
        console.warn(
          `Primsa connection attempt ${error.attemptNumber} failed, retrying...`
        );
      },
    }
  );
}
//     - Handle database connection errors
initializePrisma().catch(()=>{
  console.log("Failed to connect with the postgres")
});
//     - Log connection status
initializePrisma().then(()=>{
  console.log("primsa successfully connected to postgres")
});
//     - Export Prisma client singleton
export {prisma};

// 2️⃣ createTask(taskData)
//     - Validate task data structure
//     - Insert new task record into database
//     - Generate unique task identifier
//     - Set initial task status
//     - Return created task object
//     - Handle database constraint violations
//     - Log creation events

// 3️⃣ getTaskById(id)
//     - Query database for task by ID
//     - Handle not found scenarios
//     - Return task data or null
//     - Optimize query performance
//     - Handle database errors

// 4️⃣ getAllTasks()
//     - Query database for all tasks
//     - Implement pagination support
//     - Sort tasks by creation date
//     - Return tasks array
//     - Handle large dataset queries
//     - Optimize database indexing

// 5️⃣ updateTaskStatus(id, status)
//     - Update task status by ID
//     - Validate status transitions
//     - Update timestamp fields
//     - Return updated task
//     - Handle concurrent updates
//     - Manage transaction isolation

// 6️⃣ deleteTask(id)
//     - Soft delete task record
//     - Update deletion timestamp
//     - Maintain data integrity
//     - Return deletion status
//     - Handle referential integrity

// 7️⃣ getTaskStatistics()
//     - Aggregate task counts by status
//     - Calculate processing metrics
//     - Return statistical data
//     - Optimize aggregation queries
//     - Handle empty datasets
