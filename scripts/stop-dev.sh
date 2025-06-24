#!/bin/bash

# SWP Development Stop Script
# Stops all development services

set -e

echo "🛑 Stopping SWP Development Environment..."

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

# Stop processes by PID files
stop_by_pid() {
    local service=$1
    local pid_file="logs/${service}.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        log_info "Stopping $service (PID: $pid)..."
        
        if kill -0 "$pid" 2>/dev/null; then
            kill -TERM "$pid" 2>/dev/null || true
            sleep 2
            
            # Force kill if still running
            if kill -0 "$pid" 2>/dev/null; then
                log_warn "Force killing $service (PID: $pid)..."
                kill -KILL "$pid" 2>/dev/null || true
            fi
        else
            log_warn "$service process (PID: $pid) not found"
        fi
        
        rm -f "$pid_file"
    else
        log_warn "No PID file found for $service"
    fi
}

# Kill processes by port
kill_by_port() {
    local port=$1
    local service=$2
    
    log_info "Killing processes on port $port ($service)..."
    
    if command -v lsof > /dev/null 2>&1; then
        local pids=$(lsof -ti:$port 2>/dev/null || true)
        if [ -n "$pids" ]; then
            echo "$pids" | xargs kill -TERM 2>/dev/null || true
            sleep 1
            # Force kill if still running
            local remaining=$(lsof -ti:$port 2>/dev/null || true)
            if [ -n "$remaining" ]; then
                echo "$remaining" | xargs kill -KILL 2>/dev/null || true
            fi
        fi
    else
        log_warn "lsof command not found, cannot kill by port"
    fi
}

# Main cleanup
cleanup_services() {
    log_info "Stopping development services..."
    
    # Stop by PID files first
    stop_by_pid "backend"
    stop_by_pid "frontend"
    
    # Kill by ports as backup
    kill_by_port 8080 "Backend"
    kill_by_port 5173 "Frontend"
    
    # Stop Docker containers if running
    if command -v docker > /dev/null 2>&1; then
        log_info "Stopping Docker development containers..."
        docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
        docker-compose down 2>/dev/null || true
    fi
    
    log_info "✅ All services stopped"
}

# Clean up logs (optional)
clean_logs() {
    if [ "$1" = "--clean-logs" ]; then
        log_info "Cleaning up log files..."
        rm -rf logs/*.log 2>/dev/null || true
        log_info "✅ Logs cleaned"
    fi
}

# Parse arguments
CLEAN_LOGS=false
while [[ $# -gt 0 ]]; do
    case $1 in
        --clean-logs)
            CLEAN_LOGS=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --clean-logs    Remove log files after stopping"
            echo "  -h, --help      Show this help message"
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Execute cleanup
cleanup_services

if [ "$CLEAN_LOGS" = true ]; then
    clean_logs --clean-logs
fi

echo ""
echo "🎉 SWP Development Environment stopped successfully!"
echo "" 