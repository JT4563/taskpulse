// ===============================================
// src/services/queue.service.js
// -----------------------------------------------
// RabbitMQ message queue service
//
// Manages task queue operations including publishing tasks,
// consuming messages, and handling queue connections.
// ===============================================

// 1️⃣ initializeQueueConnection()
//     - Establish connection to RabbitMQ server
//     - Create communication channel
//     - Assert task queue exists
//     - Configure queue durability settings
//     - Handle connection errors and retries
//     - Set up connection recovery mechanisms
//     - Export queue connection singleton

// 2️⃣ publishTask(taskData)
//     - Validate task data structure
//     - Serialize task for message queue
//     - Publish message to task queue
//     - Handle publish confirmations
//     - Manage message persistence
//     - Log publish events
//     - Handle broker disconnections

// 3️⃣ consumeTasks(taskHandler)
//     - Set up consumer for task queue
//     - Register message handler function
//     - Configure message acknowledgment
//     - Handle message processing errors
//     - Implement prefetch limits
//     - Manage consumer lifecycle
//     - Handle channel closures

// 4️⃣ acknowledgeTask(message)
//     - Send acknowledgment for processed message
//     - Handle ack failures
//     - Log successful processing
//     - Update task metrics
//     - Manage delivery tags

// 5️⃣ rejectTask(message, requeue)
//     - Reject message processing
//     - Optionally requeue message
//     - Handle dead letter scenarios
//     - Log rejection events
//     - Update error metrics

// 6️⃣ getQueueMetrics()
//     - Query queue for message counts
//     - Get pending message statistics
//     - Collect consumer information
//     - Return queue health data
//     - Handle metric collection errors

// 7️⃣ closeQueueConnection()
//     - Gracefully close queue connection
//     - Close channels properly
//     - Handle pending messages
//     - Log disconnection events
//     - Manage connection cleanup
