#!/bin/bash

# SWP Project Test Script
set -e

echo "🧪 Running SWP Project Tests..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Test flags
FRONTEND_TESTS=${1:-true}
BACKEND_TESTS=${2:-true}

# Frontend Tests
if [ "$FRONTEND_TESTS" = "true" ]; then
    log_info "Running Frontend Tests..."
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        log_info "Installing frontend dependencies..."
        npm ci
    fi
    
    # Run linting
    log_info "Running ESLint..."
    npm run lint
    
    # Run type checking
    log_info "Running TypeScript type checking..."
    npx tsc --noEmit
    
    # Build project
    log_info "Building frontend..."
    npm run build
    
    log_info "✅ Frontend tests completed successfully!"
else
    log_warn "Skipping frontend tests..."
fi

# Backend Tests
if [ "$BACKEND_TESTS" = "true" ]; then
    log_info "Running Backend Tests..."
    
    cd backend
    
    # Run tests
    log_info "Running Maven tests..."
    mvn clean test
    
    # Run integration tests (if any)
    log_info "Running integration tests..."
    mvn verify
    
    # Build project
    log_info "Building backend..."
    mvn clean package -DskipTests
    
    cd ..
    
    log_info "✅ Backend tests completed successfully!"
else
    log_warn "Skipping backend tests..."
fi

log_info "🎉 All tests completed successfully!" 