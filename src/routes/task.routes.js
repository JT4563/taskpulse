// ===============================================
// src/routes/task.routes.js
// -----------------------------------------------
// Task management routes
//
// Defines all HTTP endpoints for task-related operations
// and maps them to controller functions.
// ===============================================

// 1️⃣ POST /api/tasks
//     - Route for creating new tasks
//     - Maps to taskController.createTask
//     - Requires task data in request body
//     - Validates request payload
//     - Returns created task with 201 status
//     - Handles validation errors

// 2️⃣ GET /api/tasks
//     - Route for retrieving all tasks
//     - Maps to taskController.getAllTasks
//     - Supports query parameters for filtering
//     - Implements pagination
//     - Returns tasks array with 200 status
//     - Handles database errors

// 3️⃣ GET /api/tasks/:id
//     - Route for retrieving specific task
//     - Maps to taskController.getTaskById
//     - Extracts task ID from URL parameters
//     - Validates task ID format
//     - Returns task data with 200 status
//     - Handles not found errors

// 4️⃣ PUT /api/tasks/:id/status
//     - Route for updating task status
//     - Maps to taskController.updateTaskStatus
//     - Extracts task ID from URL parameters
//     - Requires status data in request body
//     - Validates status transitions
//     - Returns updated task with 200 status

// 5️⃣ DELETE /api/tasks/:id
//     - Route for deleting tasks
//     - Maps to taskController.deleteTask
//     - Extracts task ID from URL parameters
//     - Performs soft delete operation
//     - Returns success message with 200 status
//     - Handles not found errors

// 6️⃣ Middleware configuration
//     - Apply request validation middleware
//     - Set up rate limiting
//     - Add authentication checks
//     - Configure CORS settings
//     - Handle route-specific errors
