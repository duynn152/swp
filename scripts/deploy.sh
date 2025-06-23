#!/bin/bash

# SWP Project Deployment Script
set -e

echo "🚀 Starting SWP Project Deployment..."

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

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    log_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose > /dev/null 2>&1; then
    log_error "Docker Compose is not installed. Please install it and try again."
    exit 1
fi

# Parse command line arguments
ENVIRONMENT=${1:-local}
ACTION=${2:-up}

log_info "Environment: $ENVIRONMENT"
log_info "Action: $ACTION"

# Set environment-specific variables
case $ENVIRONMENT in
    "local")
        COMPOSE_FILE="docker-compose.yml"
        ;;
    "staging")
        COMPOSE_FILE="docker-compose.staging.yml"
        ;;
    "production")
        COMPOSE_FILE="docker-compose.prod.yml"
        ;;
    *)
        log_error "Unknown environment: $ENVIRONMENT"
        log_info "Available environments: local, staging, production"
        exit 1
        ;;
esac

# Execute action
case $ACTION in
    "up")
        log_info "Starting services..."
        docker-compose -f $COMPOSE_FILE up -d
        log_info "Services started successfully!"
        ;;
    "down")
        log_info "Stopping services..."
        docker-compose -f $COMPOSE_FILE down
        log_info "Services stopped successfully!"
        ;;
    "restart")
        log_info "Restarting services..."
        docker-compose -f $COMPOSE_FILE restart
        log_info "Services restarted successfully!"
        ;;
    "build")
        log_info "Building and starting services..."
        docker-compose -f $COMPOSE_FILE up -d --build
        log_info "Services built and started successfully!"
        ;;
    "logs")
        log_info "Showing logs..."
        docker-compose -f $COMPOSE_FILE logs -f
        ;;
    "clean")
        log_info "Cleaning up..."
        docker-compose -f $COMPOSE_FILE down -v --rmi all
        log_info "Cleanup completed!"
        ;;
    *)
        log_error "Unknown action: $ACTION"
        log_info "Available actions: up, down, restart, build, logs, clean"
        exit 1
        ;;
esac

# Health check
if [ "$ACTION" = "up" ] || [ "$ACTION" = "build" ]; then
    log_info "Waiting for services to be healthy..."
    sleep 10
    
    # Check backend health
    for i in {1..30}; do
        if curl -s http://localhost:8080/actuator/health > /dev/null; then
            log_info "✅ Backend is healthy!"
            break
        else
            log_warn "Backend not ready yet... (attempt $i/30)"
            sleep 5
        fi
    done
    
    # Check frontend health
    for i in {1..30}; do
        if curl -s http://localhost/health > /dev/null; then
            log_info "✅ Frontend is healthy!"
            break
        else
            log_warn "Frontend not ready yet... (attempt $i/30)"
            sleep 5
        fi
    done
    
    log_info "🎉 Deployment completed successfully!"
    log_info "Frontend: http://localhost"
    log_info "Backend API: http://localhost:8080"
    log_info "API Documentation: http://localhost:8080/swagger-ui.html"
fi 