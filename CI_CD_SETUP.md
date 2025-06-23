# CI/CD Setup Documentation

## 📋 Tổng quan

Dự án SWP đã được thiết lập với hệ thống CI/CD hoàn chỉnh sử dụng GitHub Actions, Docker, và các công cụ tự động hóa khác.

## 🏗️ Kiến trúc CI/CD

### CI Pipeline (`.github/workflows/ci.yml`)
- **Frontend CI**: ESLint, Type checking, Build
- **Backend CI**: Maven tests, Build với PostgreSQL test database  
- **Security Scan**: Trivy vulnerability scanner
- **Code Quality**: SonarQube integration

### CD Pipeline (`.github/workflows/cd.yml`)
- **Docker Build**: Multi-platform images (amd64, arm64)
- **Container Registry**: GitHub Container Registry
- **Deployment**: Staging và Production environments
- **Health Checks**: Automated post-deployment verification

## 🚀 Quick Start

### 1. Chạy Local Development
```bash
# Clone repository
git clone <your-repo-url>
cd swp

# Chạy với Docker Compose
./scripts/deploy.sh local up

# Hoặc build từ đầu
./scripts/deploy.sh local build
```

### 2. Run Tests
```bash
# Chạy tất cả tests
./scripts/test.sh

# Chỉ frontend tests
./scripts/test.sh true false

# Chỉ backend tests  
./scripts/test.sh false true
```

## 🛠️ Setup Requirements

### GitHub Repository Settings

1. **Secrets cần thiết:**
   ```
   SONAR_TOKEN=<sonarqube-token>
   ```

2. **Environments:**
   - `staging`: Cho deployment tự động từ main branch
   - `production`: Cho deployment từ tags

3. **Branch Protection:**
   - Main branch cần require PR review
   - Require status checks: CI Pipeline

### Local Development Setup

1. **Prerequisites:**
   - Docker & Docker Compose
   - Node.js 18+
   - Java 17+
   - Maven 3.9+

2. **Environment Variables:**
   ```bash
   # Tạo .env file cho local development
   SPRING_PROFILES_ACTIVE=local
   POSTGRES_DB=swpdb
   POSTGRES_USER=swpuser
   POSTGRES_PASSWORD=swppassword
   JWT_SECRET=mySecretKey123456789
   JWT_EXPIRATION=86400000
   ```

## 📁 File Structure

```
.github/
  workflows/
    ci.yml              # CI pipeline
    cd.yml              # CD pipeline
  dependabot.yml        # Dependency updates

scripts/
  deploy.sh             # Deployment script
  test.sh               # Test runner script

Dockerfile.frontend     # Frontend container
backend/Dockerfile      # Backend container
docker-compose.yml      # Local development stack
nginx.conf             # Frontend web server config
```

## 🔄 Workflow Triggers

### CI Pipeline chạy khi:
- Push lên `main` hoặc `develop` branch
- Tạo Pull Request về `main`

### CD Pipeline chạy khi:
- Push lên `main` branch (deploy staging)
- Push tags `v*` (deploy production)
- CI Pipeline hoàn thành thành công

## 🐳 Docker Images

### Frontend Image
- **Base**: nginx:alpine
- **Build**: Multi-stage với Node.js 18
- **Features**: Gzip compression, Security headers, SPA routing

### Backend Image
- **Base**: openjdk:17-jre-slim
- **Build**: Multi-stage với Maven
- **Features**: Non-root user, Health checks, JVM optimization

## 🔍 Monitoring & Health Checks

### Health Endpoints
- **Frontend**: `http://localhost/health`
- **Backend**: `http://localhost:8080/actuator/health`
- **API Docs**: `http://localhost:8080/swagger-ui.html`

### Automatic Checks
- Container health status
- Database connectivity
- Service dependencies
- Security vulnerabilities

## 📊 Quality Gates

### Frontend
- ESLint compliance
- TypeScript type checking
- Successful build
- No high/critical vulnerabilities

### Backend
- Unit tests pass
- Integration tests pass
- Maven build success
- No high/critical vulnerabilities

## 🚨 Troubleshooting

### Common Issues

1. **Docker build fails:**
   ```bash
   # Clear Docker cache
   docker system prune -a
   
   # Rebuild with no cache
   ./scripts/deploy.sh local build
   ```

2. **Database connection issues:**
   ```bash
   # Check PostgreSQL container
   docker-compose logs postgres
   
   # Reset database
   docker-compose down -v
   docker-compose up -d
   ```

3. **CI/CD Pipeline failures:**
   - Check GitHub Actions logs
   - Verify repository secrets
   - Ensure branch protection rules are correct

### Deployment Commands

```bash
# Local development
./scripts/deploy.sh local up          # Start services
./scripts/deploy.sh local down        # Stop services  
./scripts/deploy.sh local restart     # Restart services
./scripts/deploy.sh local build       # Build and start
./scripts/deploy.sh local logs        # View logs
./scripts/deploy.sh local clean       # Clean up everything

# Staging/Production (via CI/CD)
git push origin main                  # Deploy to staging
git tag v1.0.0 && git push --tags    # Deploy to production
```

## 🔐 Security Features

- Container vulnerability scanning
- Dependency updates via Dependabot
- Security headers in nginx
- Non-root container users
- Secrets management via GitHub

## 📈 Next Steps

1. **Production Setup:**
   - Configure cloud provider (AWS/GCP/Azure)
   - Setup monitoring (Prometheus/Grafana)
   - Configure logging (ELK Stack)

2. **Enhanced CI/CD:**
   - Add E2E tests
   - Performance testing
   - Blue-green deployments

3. **Monitoring:**
   - Application metrics
   - Log aggregation
   - Alert management 