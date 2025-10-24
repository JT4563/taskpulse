// ===============================================
// src/services/cache.service.js
// -----------------------------------------------
// Redis caching service
//
// Provides caching and pub/sub functionality using Redis,
// including connection management and data operations.
// ===============================================

// 1️⃣ initializeRedisConnection()
//     - Establish connection to Redis server
//     - Configure connection pooling
//     - Set up retry strategies
//     - Handle connection errors
//     - Configure key expiration policies
//     - Export Redis client singleton
//     - Log connection status

// 2️⃣ cacheTask(taskData, ttl)
//     - Store task data in Redis cache
//     - Set expiration time (TTL)
//     - Generate cache key
//     - Handle serialization
//     - Log cache operations
//     - Handle memory limits

// 3️⃣ getCachedTask(taskId)
//     - Retrieve task from Redis cache
//     - Handle cache misses
//     - Deserialize cached data
//     - Update access statistics
//     - Handle expired entries
//     - Return cached data or null

// 4️⃣ invalidateTaskCache(taskId)
//     - Remove task from cache
//     - Handle partial invalidation
//     - Update cache metrics
//     - Log invalidation events
//     - Handle bulk invalidation

// 5️⃣ cacheTaskList(tasks, ttl)
//     - Store task list in cache
//     - Set appropriate TTL
//     - Serialize array data
//     - Generate list cache key
//     - Handle large datasets
//     - Update cache statistics

// 6️⃣ publishTaskUpdate(channel, message)
//     - Publish message to Redis channel
//     - Serialize update message
//     - Handle publish errors
//     - Log publication events
//     - Manage channel lifecycle

// 7️⃣ subscribeToTaskUpdates(channel, handler)
//     - Subscribe to Redis channel
//     - Register message handler
//     - Handle subscription errors
//     - Process incoming messages
//     - Manage unsubscribe logic

// 8️⃣ getCacheMetrics()
//     - Query Redis for cache statistics
//     - Get hit/miss ratios
//     - Collect memory usage
//     - Return cache performance data
//     - Handle metric collection errors
