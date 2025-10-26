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
export async function getAllTasks({ page = 1, limit = 10 } = {}) {
  try {
    const skip = (page - 1) * limit;

    //     - Implement pagination support
    const tasks = await prisma.task.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    //     - Sort tasks by creation date
    // Done above with `orderBy`.

    //     - Return tasks array
    return tasks;

    //     - Handle large dataset queries
    // Pagination ensures we don’t overload memory.

    //     - Optimize database indexing
    // Indexes on `createdAt` and `status` improve performance significantly.
  } catch (err) {
    console.error(" Error fetching all tasks:", err);
    throw err;
  }
}

// ===============================================
// 5️⃣ updateTaskStatus(id, status)
// ===============================================

//     - Update task status by ID
export async function updateTaskStatus(id, status) {
  if (!id || !status) throw new Error("ID and status are required");

  try {
    //     - Validate status transitions
    const validStatuses = Object.values(TaskStatus);
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid task status");
    }

    //     - Update timestamp fields
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { status, updatedAt: new Date() },
    });

    //     - Return updated task
    console.log(` Task ${id} updated to status ${status}`);
    return updatedTask;

    //     - Handle concurrent updates
    // Prisma ensures atomic updates by default via transactions.

    //     - Manage transaction isolation
    // Not required here, but could be used if multiple related models were updated.
  } catch (err) {
    console.error("Error updating task status:", err);
    throw err;
  }
}

// ===============================================
// 6️⃣ deleteTask(id)
// ===============================================
//     - Soft delete task record
//     - Update deletion timestamp
//     - Maintain data integrity
//     - Return deletion status
//     - Handle referential integrity
export async function delteTask(id) {
  if (!id) throw new Error("Task ID is required");
  try {
    const delteTask = await primsa.task.update({
      where: { id: Number(id) },
      data: { status: "FAILED", updatedAt: new Date() },
    });
    console.log(`Task $(id) marked as deleted`);
    return deltedTask;
  } catch (err) {
    consolo.error("Error deleting task", err);
    throw err;
  }
}

// ===============================================
// 7️⃣ getTaskStatistics()
// ===============================================

//     - Aggregate task counts by status
export async function getTaskStatistics() {
  try {
    const stats = await prisma.task.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    //     - Calculate processing metrics
    const total = stats.reduce((sum, s) => sum + s._count.status, 0);

    //     - Return statistical data
    const formattedStats = stats.map((s) => ({
      status: s.status,
      count: s._count.status,
      percentage: ((s._count.status / total) * 100).toFixed(2) + "%",
    }));

    //     - Optimize aggregation queries
    // Prisma’s `groupBy` translates to SQL-level GROUP BY queries (very efficient).

    //     - Handle empty datasets
    return formattedStats.length ? formattedStats : [];
  } catch (err) {
    console.error(" Error fetching task statistics:", err);
    throw err;
  }
}
