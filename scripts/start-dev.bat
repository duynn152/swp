@echo off
setlocal enabledelayedexpansion

REM SWP Development Startup Script for Windows
REM Starts both backend and frontend simultaneously

echo 🚀 Starting SWP Development Environment...

REM Check prerequisites
echo [INFO] Checking prerequisites...

REM Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java is not installed. Please install Java 17+
    pause
    exit /b 1
)

REM Check Maven
mvn -version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Maven is not installed. Please install Maven 3.9+
    pause
    exit /b 1
)

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+
    pause
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm
    pause
    exit /b 1
)

echo [INFO] ✅ All prerequisites are met!

REM Create logs directory
if not exist logs mkdir logs

REM Install dependencies
echo [INFO] Installing dependencies...
if not exist node_modules (
    echo [DEV] Installing frontend dependencies...
    npm install
) else (
    echo [DEV] Frontend dependencies already installed
)

REM Kill existing processes
echo [INFO] Cleaning up existing processes...

REM Kill processes on port 8080 (backend)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do (
    taskkill /F /PID %%a >nul 2>&1
)

REM Kill processes on port 5173 (frontend)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do (
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 2 /nobreak >nul

REM Start backend
echo [DEV] Starting Spring Boot backend...
cd backend
start /b "" cmd /c "mvn spring-boot:run > ../logs/backend.log 2>&1"
cd ..
echo [INFO] ✅ Backend starting...

REM Start frontend
echo [DEV] Starting React frontend...
start /b "" cmd /c "npm run dev > logs/frontend.log 2>&1"
echo [INFO] ✅ Frontend starting...

REM Wait for services to be ready
echo [INFO] Waiting for services to start...

REM Wait for backend (simplified check)
echo [DEV] Waiting for backend (http://localhost:8080)...
timeout /t 30 /nobreak >nul

REM Wait for frontend (simplified check)
echo [DEV] Waiting for frontend (http://localhost:5173)...
timeout /t 10 /nobreak >nul

REM Success message
echo.
echo 🎉 =============================================
echo 🎉 SWP Development Environment is ready!
echo 🎉 =============================================
echo.
echo 📍 Frontend:      http://localhost:5173
echo 📍 Backend API:   http://localhost:8080
echo 📍 API Docs:      http://localhost:8080/swagger-ui.html
echo 📍 Actuator:      http://localhost:8080/actuator/health
echo.
echo 📋 Logs:
echo    Backend:       type logs\backend.log
echo    Frontend:      type logs\frontend.log
echo.
echo ⚡ Press Ctrl+C to stop services
echo.

REM Keep script running
pause 