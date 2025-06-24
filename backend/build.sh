#!/bin/bash

# Build script for Render deployment
echo "Building SWP Backend..."

# Clean and build the project
mvn clean package -DskipTests

echo "Build completed successfully!" 