# 🚀 Development Scripts Guide

## 📋 Tổng quan

Dự án SWP có nhiều cách để chạy development environment, từ scripts tự động đến Docker containers. Chọn phương pháp phù hợp với setup của bạn.

## 🛠️ Các phương pháp chạy development

### 1. **Script tự động (Khuyến nghị)**

#### **Unix/macOS/Linux:**
```bash
# Khởi động development environment
./scripts/start-dev.sh

# Khởi động với options
./scripts/start-dev.sh --skip-deps        # Bỏ qua cài đặt dependencies
./scripts/start-dev.sh --skip-cleanup     # Bỏ qua cleanup processes

# Dừng development environment
./scripts/stop-dev.sh
./scripts/stop-dev.sh --clean-logs        # Dừng và xóa logs
```

#### **Windows:**
```cmd
# Khởi động development environment
scripts\start-dev.bat

# Dừng bằng Ctrl+C hoặc đóng command prompt
```

#### **Cross-platform (Node.js):**
```bash
# Khởi động với Node.js script
node scripts/start-dev.js

# Hoặc thông qua npm
npm run start
```

### 2. **NPM Scripts**

```bash
# Chạy cả frontend và backend cùng lúc
npm run dev:full
npm start

# Chạy riêng từng service
npm run dev:frontend      # Chỉ frontend
npm run dev:backend       # Chỉ backend

# Docker
npm run dev:docker        # Chạy full stack với Docker
npm run dev:docker-down   # Dừng Docker containers

# Utilities
npm run backend:test      # Chạy backend tests
npm run backend:build     # Build backend
npm run check:health      # Kiểm tra health của services
npm run logs:backend      # Xem backend logs
npm run logs:frontend     # Xem frontend logs
```

### 3. **Docker Compose**

```bash
# Development với hot reload
docker-compose -f docker-compose.dev.yml up --build

# Production simulation
docker-compose up --build

# Dừng containers
docker-compose down
docker-compose -f docker-compose.dev.yml down

# Clean up
docker-compose down -v --rmi all
```

### 4. **Manual (Truyền thống)**

```bash
# Terminal 1: Backend
cd backend
mvn spring-boot:run

# Terminal 2: Frontend  
npm run dev
```

## 📊 So sánh các phương pháp

| Phương pháp | Ưu điểm | Nhược điểm | Phù hợp cho |
|-------------|---------|------------|-------------|
| **Auto Script** | ✅ Tự động<br>✅ Health checks<br>✅ Log management | ❌ Phụ thuộc OS | Hầu hết developers |
| **NPM Scripts** | ✅ Cross-platform<br>✅ Dễ nhớ | ❌ Ít tính năng | Quick development |
| **Docker** | ✅ Isolated environment<br>✅ Production-like | ❌ Chậm hơn<br>❌ Resource intensive | Testing, CI/CD |
| **Manual** | ✅ Full control<br>✅ Debug dễ | ❌ Phức tạp<br>❌ Dễ quên | Advanced debugging |

## 🔧 Prerequisites

### **Cho Scripts:**
- Java 17+
- Maven 3.9+
- Node.js 18+
- npm

### **Cho Docker:**
- Docker & Docker Compose
- 4GB+ RAM khuyến nghị

## 📋 Logs và Monitoring

### **Log Files:**
```bash
logs/
├── backend.log     # Spring Boot logs
├── frontend.log    # Vite dev server logs
├── backend.pid     # Backend process ID
└── frontend.pid    # Frontend process ID
```

### **Xem logs real-time:**
```bash
# Script commands
tail -f logs/backend.log
tail -f logs/frontend.log

# NPM shortcuts
npm run logs:backend
npm run logs:frontend

# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🏥 Health Checks

### **Automatic Health Checks:**
Scripts tự động kiểm tra health của services:

- **Backend**: `http://localhost:8080/actuator/health`
- **Frontend**: `http://localhost:5173`

### **Manual Health Check:**
```bash
# Check all services
npm run check:health

# Individual checks
curl http://localhost:8080/actuator/health
curl http://localhost:5173
```

## 🚨 Troubleshooting

### **Port conflicts:**
```bash
# Kiểm tra port đang sử dụng
lsof -i :8080    # Backend port
lsof -i :5173    # Frontend port

# Kill processes
./scripts/stop-dev.sh
```

### **Dependencies issues:**
```bash
# Reinstall frontend dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Maven cache
cd backend
mvn clean
```

### **Database connection:**
```bash
# Với Docker
docker-compose down -v
docker-compose up postgres

# Local PostgreSQL
# Kiểm tra service running và connection string
```

### **Memory issues:**
```bash
# Increase Node.js memory
export NODE_OPTIONS="--max-old-space-size=4096"

# Docker memory limits
docker system prune
```

## ⚡ Quick Commands

```bash
# All-in-one start
./scripts/start-dev.sh

# Quick restart
./scripts/stop-dev.sh && ./scripts/start-dev.sh

# With npm
npm start

# Docker quick start
docker-compose -f docker-compose.dev.yml up

# Emergency stop all
./scripts/stop-dev.sh --clean-logs
```

## 🎯 Recommended Workflow

1. **First time setup:**
   ```bash
   git clone <repo>
   cd swp
   npm install
   ./scripts/start-dev.sh
   ```

2. **Daily development:**
   ```bash
   ./scripts/start-dev.sh    # Morning
   # ... code all day ...
   ./scripts/stop-dev.sh     # Evening
   ```

3. **Quick testing:**
   ```bash
   npm run dev:docker        # Test với Docker
   npm run backend:test      # Run tests
   ```

## 🔗 Service URLs

Sau khi start thành công:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Actuator Health**: http://localhost:8080/actuator/health
- **Database**: localhost:5432 (PostgreSQL)
- **Mailhog** (Docker dev): http://localhost:8025

## 💡 Tips

1. **Luôn dùng scripts** thay vì manual commands
2. **Kiểm tra logs** khi có lỗi: `tail -f logs/*.log`
3. **Docker cho testing** môi trường production-like
4. **Stop properly** để tránh zombie processes
5. **Health check** trước khi test features mới

---

> **Lưu ý**: Nếu gặp vấn đề, hãy dùng `./scripts/stop-dev.sh --clean-logs` và thử lại từ đầu. 