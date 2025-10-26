// ===============================================
// src/services/queue.service.js
// -----------------------------------------------
// RabbitMQ message queue service
//
// Manages task queue operations including publishing tasks,
// consuming messages, and handling queue connections.
// ===============================================
import amqlib from "amqlib";
import pRetry from "p-retry";
import process from "process";
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.RABBITMQ_QUEUE;
let connection = null;
let channel = null;
// 1️⃣ initializeQueueConnection()
//     - Establish connection to RabbitMQ server
//     - Create communication channel
//     - Assert task queue exists
//     - Configure queue durability settings
//     - Handle connection errors and retries
//     - Set up connection recovery mechanisms
//     - Export queue connection singleton
export async function initializeQueueConnection() {
  try {
    // Retry connecting 5 times if fails
    connection = await pRetry(
      async () => {
        console.log("🔄 Connecting to RabbitMQ...");
        return await amqplib.connect(RABBITMQ_URL);
      },
      {
        retries: 5,
        onFailedAttempt: (err) =>
          console.warn(
            ` RabbitMQ connection failed (${err.retriesLeft} retries left)`
          ),
      }
    );
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.prefetch(5);
    connection.on("error", (err) =>
      console.error("RabbitMQ connection error ", err)
    );
    connection.on("close", () => {
      console.error("RabbitMQ connection . Attempting reconnect...");
      setTimeout(intializeQueueConneciton, 5000);
    });
    console.log("RabbitMQ connected & queue ready:", QUEUE_NAME);
    return { connection, channel };
  } catch (error) {
    console.error("fialed to initialize RabbitMQ connectiion:", error);
    throw error;
  }
}
// ===============================================
// 2️⃣ publishTask(taskData)
// -----------------------------------------------
// Publish messages safely to the queue
// ===============================================
export async function publishTask(taskData) {
  try {
    //     - Validate task data structure
    if (!taskData || typeof taskData !== "object") {
      throw new Error("Invalid task data provided to publishTask()");
    }

    //     - Serialize task for message queue
    const messageBuffer = Buffer.from(JSON.stringify(taskData));

    //     - Publish message to task queue
    const published = channel.sendToQueue(QUEUE_NAME, messageBuffer, {
      persistent: true, // ensure the message survives broker restarts
    });

    //     - Handle publish confirmations
    if (published) {
      console.log(` Task published: ${taskData.id || "(no ID)"}`);
    } else {
      console.warn("Message publish returned false (channel backpressure).");
    }
  } catch (error) {
    console.error(" Failed to publish task:", error);
    throw error;
  }
}
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
