#!/bin/bash

# SWP Development Startup Script
# Starts both backend and frontend simultaneously

set -e

echo "🚀 Starting SWP Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

log_blue() {
    echo -e "${BLUE}[DEV]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Java
    if ! command -v java &> /dev/null; then
        log_error "Java is not installed. Please install Java 17+"
        exit 1
    fi
    
    # Check Maven
    if ! command -v mvn &> /dev/null; then
        log_error "Maven is not installed. Please install Maven 3.9+"
        exit 1
    fi
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm"
        exit 1
    fi
    
    log_info "✅ All prerequisites are met!"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    
    # Install frontend dependencies
    if [ ! -d "node_modules" ]; then
        log_blue "Installing frontend dependencies..."
        npm install
    else
        log_blue "Frontend dependencies already installed"
    fi
    
    # Check backend dependencies (Maven will handle this)
    log_blue "Backend dependencies will be handled by Maven"
}

# Kill existing processes
cleanup_processes() {
    log_info "Cleaning up existing processes..."
    
    # Kill processes on port 8080 (backend)
    if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
        log_warn "Killing process on port 8080..."
        lsof -ti:8080 | xargs kill -9 2>/dev/null || true
    fi
    
    # Kill processes on port 5173 (frontend)
    if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
        log_warn "Killing process on port 5173..."
        lsof -ti:5173 | xargs kill -9 2>/dev/null || true
    fi
    
    sleep 2
}

# Start backend
start_backend() {
    log_blue "Starting Spring Boot backend..."
    cd backend
    
    # Start backend in background
    nohup mvn spring-boot:run > ../logs/backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../logs/backend.pid
    
    cd ..
    log_info "✅ Backend started with PID: $BACKEND_PID"
}

# Start frontend
start_frontend() {
    log_blue "Starting React frontend..."
    
    # Start frontend in background
    nohup npm run dev > logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > logs/frontend.pid
    
    log_info "✅ Frontend started with PID: $FRONTEND_PID"
}

# Wait for services to be ready
wait_for_services() {
    log_info "Waiting for services to start..."
    
    # Wait for backend
    log_blue "Waiting for backend (http://localhost:8080)..."
    for i in {1..60}; do
        if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
            log_info "✅ Backend is ready!"
            break
        else
            echo -n "."
            sleep 2
        fi
        
        if [ $i -eq 60 ]; then
            log_error "Backend failed to start after 2 minutes"
            exit 1
        fi
    done
    
    # Wait for frontend
    log_blue "Waiting for frontend (http://localhost:5173)..."
    for i in {1..30}; do
        if curl -s http://localhost:5173 > /dev/null 2>&1; then
            log_info "✅ Frontend is ready!"
            break
        else
            echo -n "."
            sleep 2
        fi
        
        if [ $i -eq 30 ]; then
            log_error "Frontend failed to start after 1 minute"
            exit 1
        fi
    done
}

# Create logs directory
mkdir -p logs

# Trap to cleanup on exit
cleanup() {
    log_warn "Shutting down services..."
    
    if [ -f logs/backend.pid ]; then
        BACKEND_PID=$(cat logs/backend.pid)
        kill -TERM $BACKEND_PID 2>/dev/null || true
        rm -f logs/backend.pid
    fi
    
    if [ -f logs/frontend.pid ]; then
        FRONTEND_PID=$(cat logs/frontend.pid)
        kill -TERM $FRONTEND_PID 2>/dev/null || true
        rm -f logs/frontend.pid
    fi
    
    log_info "Services stopped"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Main execution
main() {
    # Parse command line arguments
    SKIP_DEPS=false
    SKIP_CLEANUP=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --skip-deps)
                SKIP_DEPS=true
                shift
                ;;
            --skip-cleanup)
                SKIP_CLEANUP=true
                shift
                ;;
            -h|--help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  --skip-deps     Skip dependency installation"
                echo "  --skip-cleanup  Skip cleanup of existing processes"
                echo "  -h, --help      Show this help message"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Execute steps
    check_prerequisites
    
    if [ "$SKIP_CLEANUP" = false ]; then
        cleanup_processes
    fi
    
    if [ "$SKIP_DEPS" = false ]; then
        install_dependencies
    fi
    
    # Start services
    start_backend
    start_frontend
    
    # Wait for services
    wait_for_services
    
    # Success message
    echo ""
    echo "🎉 ============================================="
    echo "🎉 SWP Development Environment is ready!"
    echo "🎉 ============================================="
    echo ""
    echo "📍 Frontend:      http://localhost:5173"
    echo "📍 Backend API:   http://localhost:8080"
    echo "📍 API Docs:      http://localhost:8080/swagger-ui.html"
    echo "📍 Actuator:      http://localhost:8080/actuator/health"
    echo ""
    echo "📋 Logs:"
    echo "   Backend:       tail -f logs/backend.log"
    echo "   Frontend:      tail -f logs/frontend.log"
    echo ""
    echo "⚡ Press Ctrl+C to stop all services"
    echo ""
    
    # Keep script running
    while true; do
        sleep 1
    done
}

# Run main function
main "$@" 