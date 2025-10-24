// ===============================================
// src/controllers/task.controller.js
// -----------------------------------------------
// Task management controller
//
// Handles all HTTP requests related to task creation, retrieval,
// updating, and deletion. Interacts with services to process business logic.
// ===============================================

// 1️⃣ createTask(req, res, next)
//     - Validate request body parameters
//     - Extract task data from request
//     - Call queue service to enqueue task
//     - Store task metadata in database via Prisma
//     - Cache task summary in Redis
//     - Return created task with 201 status
//     - Handle validation errors
//     - Pass errors to error handling middleware

// 2️⃣ getAllTasks(req, res, next)
//     - Check Redis cache for tasks list
//     - Return cached data if available
//     - Query database for all tasks via Prisma
//     - Cache results in Redis with TTL
//     - Return tasks array with 200 status
//     - Handle database query errors
//     - Handle cache errors gracefully

// 3️⃣ getTaskById(req, res, next)
//     - Extract task ID from request parameters
//     - Validate task ID format
//     - Check Redis cache for task details
//     - Return cached data if available
//     - Query database for task via Prisma
//     - Cache individual task in Redis
//     - Return task with 200 status
//     - Handle not found errors
//     - Handle database errors

// 4️⃣ updateTaskStatus(req, res, next)
//     - Extract task ID from request parameters
//     - Validate status update data
//     - Update task status in database via Prisma
//     - Invalidate related cache entries
//     - Publish status update via Redis pub/sub
//     - Return updated task with 200 status
//     - Handle validation errors
//     - Handle update conflicts

// 5️⃣ deleteTask(req, res, next)
//     - Extract task ID from request parameters
//     - Validate task existence
//     - Mark task as deleted in database
//     - Remove task from cache
//     - Cancel task in queue if pending
//     - Return success message with 200 status
//     - Handle not found errors
//     - Handle deletion errors
