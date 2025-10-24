// ===============================================
// src/workers/task.worker.js
// -----------------------------------------------
// Background task processing worker
//
// Consumes tasks from RabbitMQ queue and executes them,
// handling task lifecycle from processing to completion.
// ===============================================

// 1️⃣ initializeWorker()
//     - Initialize all service connections
//     - Connect to RabbitMQ for task consumption
//     - Connect to PostgreSQL via Prisma
//     - Connect to Redis for caching
//     - Set up signal handlers for graceful shutdown
//     - Start consuming messages from queue
//     - Log worker initialization

// 2️⃣ processTask(message)
//     - Parse task data from message
//     - Validate task structure
//     - Update task status to processing
//     - Execute task-specific logic
//     - Handle task execution errors
//     - Measure execution time
//     - Log processing events

// 3️⃣ executeBusinessLogic(taskData)
//     - Determine task type
//     - Route to appropriate handler
//     - Execute task operations
//     - Handle async operations
//     - Manage external API calls
//     - Process data transformations
//     - Return execution results

// 4️⃣ handleTaskSuccess(taskId, result)
//     - Update task status to completed
//     - Store task results
//     - Cache task results in Redis
//     - Publish completion event
//     - Update task metrics
//     - Log success events
//     - Acknowledge message

// 5️⃣ handleTaskFailure(taskId, error)
//     - Update task status to failed
//     - Store error information
//     - Increment failure counters
//     - Publish failure event
//     - Log error details
//     - Decide on message rejection strategy
//     - Handle retry logic

// 6️⃣ gracefulShutdown()
//     - Stop consuming new messages
//     - Finish processing current tasks
//     - Close all connections gracefully
//     - Log shutdown events
//     - Exit process cleanly
//     - Handle forced shutdown scenarios

// 7️⃣ handleError(error)
//     - Log error details
//     - Determine error severity
//     - Trigger alerting if needed
//     - Handle uncaught exceptions
//     - Manage worker restart logic
//     - Update health status
