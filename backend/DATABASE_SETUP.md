# 🗄️ Database Setup & Role Management Guide

## 📋 Tổng quan PostgreSQL Roles hiện tại

### 🎭 Application Roles (Trong Java Code)
Dự án định nghĩa 5 role chính trong `UserRole.java`:

| Role | Tên tiếng Việt | Mô tả |
|------|----------------|--------|
| `PATIENT` | Bệnh nhân | Role mặc định cho người dùng |
| `DOCTOR` | Bác sĩ | Bác sĩ điều trị |
| `NURSE` | Điều dưỡng | Y tá, điều dưỡng |
| `ADMIN` | Quản trị viên | Quản trị hệ thống |
| `STAFF` | Nhân viên | Nhân viên y tế khác |

### 🔐 Database Roles (PostgreSQL)
Hiện tại dự án sử dụng:

| User | Password | Quyền |
|------|----------|--------|
| `postgres` | `postgres` | Superuser mặc định |

## 🚀 Setup Database Roles mới

### Cách 1: Sử dụng Shell Script (Khuyến nghị)

```bash
# Di chuyển vào thư mục backend
cd backend

# Chạy script setup
./setup_db_roles.sh
```

### Cách 2: Chạy SQL Script thủ công

```bash
# Chạy SQL script
psql -U postgres -f backend/create_admin_user.sql
```

### Cách 3: Từng bước thủ công

```sql
-- 1. Kết nối PostgreSQL
psql -U postgres

-- 2. Tạo database
CREATE DATABASE swp_db;
\c swp_db;

-- 3. Tạo admin user
CREATE USER swp_admin WITH
    LOGIN SUPERUSER CREATEDB CREATEROLE
    PASSWORD 'admin_password_2024';

-- 4. Tạo app user
CREATE USER swp_app_user WITH
    LOGIN PASSWORD 'app_password_2024';

-- 5. Cấp quyền
GRANT ALL PRIVILEGES ON DATABASE swp_db TO swp_app_user;
```

## ⚙️ Cập nhật Application Configuration

Sau khi tạo users mới, cập nhật `application.properties`:

```properties
# Sử dụng app user thay vì postgres
spring.datasource.username=swp_app_user
spring.datasource.password=app_password_2024

# Hoặc sử dụng admin user (không khuyến nghị cho production)
spring.datasource.username=swp_admin
spring.datasource.password=admin_password_2024
```

## 🛡️ Security Best Practices

### 1. Environment Variables
```bash
# Thay vì hardcode password trong application.properties
export DB_USERNAME=swp_app_user
export DB_PASSWORD=your_secure_password

# Trong application.properties
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

### 2. Principle of Least Privilege
- `swp_app_user`: Chỉ quyền cần thiết cho ứng dụng
- `swp_admin`: Quyền admin cho maintenance
- Tránh sử dụng `postgres` superuser trong ứng dụng

### 3. Production Setup
```sql
-- Tạo production users với quyền hạn chế hơn
CREATE USER prod_app_user WITH LOGIN PASSWORD 'complex_password';
GRANT CONNECT ON DATABASE swp_db TO prod_app_user;
GRANT USAGE ON SCHEMA public TO prod_app_user;
-- Chỉ cấp quyền trên tables cần thiết
```

## 🔍 Kiểm tra & Troubleshooting

### Kiểm tra users hiện tại
```sql
-- Liệt kê tất cả users
\du+

-- Kiểm tra quyền trên database
\l swp_db
```

### Test kết nối
```bash
# Test với app user
psql -U swp_app_user -d swp_db -c "SELECT current_user, current_database();"

# Test với admin user  
psql -U swp_admin -d swp_db -c "SELECT current_user, current_database();"
```

### Lỗi thường gặp

1. **"role does not exist"**
   ```sql
   -- Tạo lại user
   CREATE USER swp_app_user WITH LOGIN PASSWORD 'password';
   ```

2. **"permission denied"**
   ```sql
   -- Cấp quyền bổ sung
   GRANT ALL PRIVILEGES ON DATABASE swp_db TO swp_app_user;
   ```

3. **"connection refused"**
   ```bash
   # Kiểm tra PostgreSQL service
   sudo systemctl status postgresql
   sudo systemctl start postgresql
   ```

## 📊 Sample Data

Dự án có sẵn sample users trong `data.sql`:

| Username | Password | Role | Email |
|----------|----------|------|-------|
| `admin` | `admin123` | ADMIN | admin@medcare.vn |
| `doctor1` | `doctor123` | DOCTOR | doctor1@medcare.vn |
| `staff1` | `staff123` | STAFF | staff1@medcare.vn |
| `patient1` | `patient123` | PATIENT | patient1@gmail.com |

## 🔄 Migration & Backup

### Backup current database
```bash
pg_dump -U postgres swp_db > backup_$(date +%Y%m%d).sql
```

### Restore database
```bash
psql -U postgres -d swp_db < backup_20241201.sql
```

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra PostgreSQL service: `systemctl status postgresql`
2. Kiểm tra logs: `tail -f /var/log/postgresql/postgresql-*.log`
3. Verify pg_hba.conf configuration
4. Test network connectivity: `telnet localhost 5432` 