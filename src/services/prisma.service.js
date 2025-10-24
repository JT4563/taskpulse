// ===============================================
// src/services/prisma.service.js
// -----------------------------------------------
// Prisma ORM database service
//
// Manages database connections and provides data access layer
// for all PostgreSQL operations using Prisma Client.
// ===============================================

// 1️⃣ initializePrisma()
//     - Create Prisma Client instance
//     - Configure database connection pooling
//     - Set up connection retry logic
//     - Handle database connection errors
//     - Log connection status
//     - Export Prisma client singleton

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
