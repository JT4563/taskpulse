# ===============================================
# Dockerfile
# -----------------------------------------------
# Container configuration for TaskPulse backend service
#
# Defines the Docker image for the main TaskPulse application,
# including all necessary dependencies and runtime configuration.
# ===============================================

# 1️⃣ Base image setup
#     - Use official Node.js 18 LTS image
#     - Set working directory to /usr/src/app
#     - Copy package.json and package-lock.json for dependency installation

# 2️⃣ Dependency installation
#     - Install production dependencies with npm install
#     - Optimize layer caching by copying package files first
#     - Clean up npm cache to reduce image size

# 3️⃣ Application code
#     - Copy all application source code
#     - Exclude node_modules and other unnecessary files via .dockerignore

# 4️⃣ Runtime configuration
#     - Expose port 3000 for HTTP traffic
#     - Define default startup command (npm start)
#     - Set proper user permissions
