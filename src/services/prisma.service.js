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
      retries: 5, // maximum retry attempts
      factor: 2, // exponential backoff factor
      onFailedAttempt: (error) => {
        console.warn(
          `Primsa connection attempt ${error.attemptNumber} failed, retrying...`
        );
      },
    }
  );
}
//     - Handle database connection errors
initializePrisma().catch(() => {
  console.log("Failed to connect with the postgres");
});
//     - Log connection status
initializePrisma().then(() => {
  console.log("primsa successfully connected to postgres");
});
//     - Export Prisma client singleton
export { prisma };

//========================================================================

// 2️⃣ createTask(taskData)
//     - Validate task data structure
export async function createTask(taskData) {
  if (!taskData || !taskData.tittle) {
    throw new Error("Task tittle is required");
  }
}
//     - Insert new task record into database
const newTask = await Prisma.task.create({
  data: {
    tittle: taskData.tittle,
    payload: taskData.payload || null,
    status: "PENDING",
  },
});
//     - Generate unique task identifier
//===> primsa have that property of autoincrement
//     - Set initial task status
//+++> already done as PENDING above
//     - Return created task object
console.log(`new task created with ID: $(newTask.id)`);
return newTask;
//     - Handle database constraint violations
//===> Prisma will automatically throw `PrismaClientKnownRequestError` if violation occurs
//     - Log creation events
//===> Logged above for monitoring and debugging


//=============================================================
// 3️⃣ getTaskById(id)
//     - Query database for task by ID
export async function getTaskById(id) {
  if (!id) throw new Error("Task ID is not valid");
  try {
    const task = await Prisma.task.findUnique({
      where: { id: Number(id) },
    });
    //     - Handle not found scenarios
    if (!task) {
      console.warn(`Taks with ID ${id}not found`);
      return null;
    }
    //     - Return task data or null
    return task;
  } catch (err) {
    //     - Handle database errors
    console.error("error fetching task:", err);
    throw err;
  }
}
// =======================================================================

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
