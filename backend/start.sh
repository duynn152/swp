#!/bin/bash

# Start script for Render deployment
echo "Starting SWP Backend on Render..."

# Set production profile
export SPRING_PROFILES_ACTIVE=prod

# Run the Spring Boot application
java -Dserver.port=$PORT -jar target/backend-0.0.1-SNAPSHOT.jar 