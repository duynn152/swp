# 🏥 SWP - Hospital Management System

**Hệ thống quản lý bệnh viện hiện đại** được xây dựng với **React + Spring Boot**, tích hợp đầy đủ tính năng quản lý người dùng, authentication JWT, và dashboard thống kê.

## 🌟 **Tổng quan dự án**

SWP là một ứng dụng fullstack hoàn chỉnh cho quản lý bệnh viện, bao gồm:
- 🎯 **Frontend**: React 19 + TypeScript + Ant Design
- ⚡ **Backend**: Spring Boot 3.2.0 + Java 17
- 🗄️ **Database**: PostgreSQL với JPA/Hibernate
- 🔐 **Authentication**: JWT tokens với BCrypt
- 📋 **API Docs**: Swagger UI tự động
- 🎨 **UI/UX**: Modern responsive design

---

## 🚀 **Tính năng chính**

### 👤 **Quản lý người dùng**
- ✅ Đăng ký/Đăng nhập với JWT authentication
- ✅ 4 loại user roles: PATIENT, DOCTOR, ADMIN, STAFF
- ✅ CRUD operations đầy đủ cho users
- ✅ Profile management và role-based access

### 🔐 **Authentication & Security**
- ✅ JWT access tokens (24h) + refresh tokens (7 days)
- ✅ BCrypt password hashing
- ✅ CORS configuration cho frontend-backend
- ✅ Role-based authorization
- ✅ Secure endpoints với Spring Security

### 📊 **Dashboard & UI**
- ✅ Modern hospital-themed dashboard
- ✅ Real-time statistics và charts
- ✅ Responsive design (mobile-friendly)
- ✅ User activity tracking
- ✅ Quick actions và navigation

### 🔧 **Developer Experience**
- ✅ Hot reload development
- ✅ Interactive API documentation (Swagger)
- ✅ Postman collection cho testing
- ✅ Comprehensive error handling
- ✅ TypeScript support

---

## 🏗️ **Kiến trúc hệ thống**

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Frontend          │    │   Backend API       │    │   PostgreSQL        │
│   React + TS        │◄──►│  Spring Boot + JWT  │◄──►│   Database          │
│   Port: 5173        │    │   Port: 8080        │    │   Port: 5432        │
│   Ant Design        │    │   Swagger UI        │    │   JPA/Hibernate     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

### **Tech Stack chi tiết**

**Frontend:**
- React 19 với TypeScript
- Vite (build tool siêu nhanh)
- Ant Design (UI components)
- Tailwind CSS (utility-first styling)
- React Query (data fetching & caching)
- Zustand (lightweight state management)

**Backend:**
- Spring Boot 3.2.0 với Java 17
- Spring Security + JWT
- PostgreSQL + JPA/Hibernate
- SpringDoc OpenAPI (Swagger)
- Maven (dependency management)
- BCrypt (password hashing)

---

## ⚙️ **Cài đặt và chạy dự án**

### **Prerequisites**
```bash
Node.js 18+
Java 17+
Maven 3.6+
PostgreSQL 12+
```

### **1. Database Setup**

**Tạo database:**
```bash
# Kết nối PostgreSQL
psql -U postgres

# Tạo database
CREATE DATABASE swp_db;

# Tạo user (optional)
CREATE USER swp_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE swp_db TO swp_user;
```

### **2. Backend Setup**

```bash
# Di chuyển vào thư mục backend
cd backend

# Cập nhật password database trong application.properties
# spring.datasource.password=your_password

# Build và chạy
mvn clean install
mvn spring-boot:run
```

**Backend khởi động tại:** `http://localhost:8080`

**API Documentation:** `http://localhost:8080/swagger-ui.html`

### **3. Frontend Setup**

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

**Frontend khởi động tại:** `http://localhost:5173`

---

## 🔑 **Demo Accounts**

### **Admin Account**
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** ADMIN
- **Quyền:** Toàn quyền quản lý hệ thống

### **Tạo accounts khác:**
Sử dụng tính năng **Đăng ký** trên frontend hoặc:

```bash
# Doctor account
curl -X POST http://localhost:8080/api/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"doctor1","email":"doctor@hospital.vn","fullName":"Bác sĩ Nguyễn","password":"doctor123","role":"DOCTOR"}'

# Patient account  
curl -X POST http://localhost:8080/api/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"patient1","email":"patient@gmail.com","fullName":"Bệnh nhân Lê","password":"patient123","role":"PATIENT"}'
```

---

## 📋 **API Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/auth/register` | Đăng ký user mới | ❌ |
| `POST` | `/api/users/auth/login` | Đăng nhập | ❌ |
| `GET` | `/api/users/auth/me` | Thông tin user hiện tại | ✅ |
| `POST` | `/api/users/auth/refresh` | Refresh access token | ✅ |
| `GET` | `/api/users` | Danh sách tất cả users | ✅ |
| `GET` | `/api/users/{id}` | Thông tin user theo ID | ✅ |
| `GET` | `/api/users/username/{username}` | User theo username | ✅ |
| `GET` | `/api/users/role/{role}` | Users theo role | ✅ |
| `PUT` | `/api/users/{id}` | Cập nhật user | ✅ |
| `DELETE` | `/api/users/{id}` | Xóa user | ✅ |
| `PUT` | `/api/users/{id}/activate` | Kích hoạt user | ✅ |
| `PUT` | `/api/users/{id}/deactivate` | Vô hiệu hóa user | ✅ |

### **Authentication Flow**
```
1. POST /auth/register → Đăng ký
2. POST /auth/login → Nhận access + refresh tokens  
3. Use access token trong Authorization header
4. POST /auth/refresh khi token hết hạn
```

---

## 🧪 **Testing APIs**

### **Option 1: Swagger UI (Khuyến nghị)**
1. Mở: `http://localhost:8080/swagger-ui.html`
2. Click "Try it out" trên endpoint
3. Điền parameters và thực thi

### **Option 2: Postman**
1. Import: `SWP-API.postman_collection.json`
2. Set environment: `baseUrl = http://localhost:8080`
3. Chạy requests

### **Option 3: Frontend Testing**
1. Sử dụng trang đăng ký/đăng nhập
2. Test dashboard features
3. Kiểm tra user management

---

## 🗂️ **Cấu trúc dự án**

```
swp/
├── 📁 backend/                 # Spring Boot backend
│   ├── 📁 src/main/java/com/swp/backend/
│   │   ├── 📁 controller/      # REST API controllers
│   │   ├── 📁 entity/          # JPA entities (User, UserRole)
│   │   ├── 📁 service/         # Business logic layer
│   │   ├── 📁 repository/      # Data access layer
│   │   ├── 📁 config/          # Security, CORS, OpenAPI config
│   │   └── 📁 dto/             # Data transfer objects
│   ├── 📁 src/main/resources/
│   │   ├── 📄 application.properties  # App configuration
│   │   └── 📄 data.sql         # Sample data (auto-loaded)
│   ├── 📄 create_admin_user.sql # Admin setup script
│   └── 📄 pom.xml              # Maven dependencies
│
├── 📁 src/                     # React frontend
│   ├── 📁 components/          # Reusable React components
│   │   ├── 📁 HospitalLayout/  # Header, Footer layouts
│   │   └── 📄 UserManagement.tsx
│   ├── 📁 pages/               # Page components
│   │   ├── 📄 LoginPage.tsx    # Authentication page
│   │   ├── 📄 DashboardPage.tsx # Main dashboard
│   │   ├── 📄 HomePage.tsx     # Landing page
│   │   └── 📄 ...              # Other pages
│   ├── 📁 services/            # API service layer
│   │   ├── 📄 authService.ts   # Authentication APIs
│   │   └── 📄 userService.ts   # User management APIs
│   ├── 📁 hooks/               # Custom React hooks
│   │   ├── 📄 useUser.ts       # User state management
│   │   └── 📄 useUsers.ts      # Users data fetching
│   └── 📁 stores/              # Zustand state stores
│
├── 📄 API-DOCUMENTATION.md     # Detailed API docs
├── 📄 SWP-API.postman_collection.json # Postman tests
├── 📄 package.json             # Frontend dependencies
├── 📄 tailwind.config.js       # Tailwind CSS config
├── 📄 vite.config.ts           # Vite build config
└── 📄 README.md               # This file
```

---

## 🔧 **Development**

### **Backend Development**
```bash
cd backend

# Development với hot reload
mvn spring-boot:run

# Chạy tests
mvn test

# Build production
mvn clean package

# Profile-specific runs
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### **Frontend Development**
```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Build production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### **Database Operations**
```bash
# Kết nối database
psql -U postgres -d swp_db

# Xem tất cả tables
\dt

# Xem users
SELECT * FROM users;

# Xem structure của table
\d users

# Reset data
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
```

---

## 🌟 **Features trong Dashboard**

### **Admin Dashboard**
- 📊 **Statistics Overview**: Tổng số users, lịch hẹn, v.v.
- 👥 **User Management**: CRUD operations cho tất cả users
- 🔐 **Role Management**: Phân quyền và cập nhật roles
- 📈 **Activity Monitoring**: Theo dõi hoạt động hệ thống
- ⚙️ **System Settings**: Cấu hình hệ thống

### **Doctor Dashboard**
- 📅 **Appointment Management**: Quản lý lịch khám
- 👨‍⚕️ **Patient Records**: Hồ sơ bệnh án
- 📋 **Prescription Management**: Kê đơn thuốc
- 📊 **Medical Reports**: Báo cáo y tế

### **Patient Dashboard**
- 🏥 **Book Appointments**: Đặt lịch khám
- 📄 **Medical History**: Lịch sử khám bệnh
- 💊 **Prescriptions**: Đơn thuốc đã kê
- 📞 **Contact Doctors**: Liên hệ bác sĩ

---

## 🚨 **Troubleshooting**

### **Lỗi thường gặp:**

**1. Backend không khởi động được:**
```bash
# Kiểm tra Java version
java -version

# Kiểm tra Maven
mvn -version

# Clean và rebuild
mvn clean install -DskipTests
```

**2. Database connection lỗi:**
```bash
# Kiểm tra PostgreSQL đang chạy
brew services list | grep postgresql

# Khởi động PostgreSQL
brew services start postgresql

# Test connection
psql -U postgres -h localhost -p 5432
```

**3. Frontend không connect được backend:**
```bash
# Kiểm tra backend đang chạy
curl http://localhost:8080/api-docs

# Kiểm tra CORS settings trong backend
# Xem application.properties: spring.web.cors.allowed-origins
```

**4. Authentication lỗi 401:**
```bash
# Tạo admin user mới
curl -X POST http://localhost:8080/api/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@test.com","password":"admin123","role":"ADMIN"}'
```

### **Debug tips:**
- Check browser console cho frontend errors
- Check terminal logs cho backend errors  
- Sử dụng Swagger UI để test APIs trực tiếp
- Kiểm tra database với psql commands

---

## 📚 **Tài liệu tham khảo**

- 📖 **[Complete API Documentation](./API-DOCUMENTATION.md)**
- 📬 **[Postman Collection](./SWP-API.postman_collection.json)**
- 🔧 **[Backend Setup Guide](./backend/README.md)**
- 🗄️ **[Database Setup Guide](./backend/DATABASE_SETUP.md)**

### **Useful Links:**
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/api-docs
- **Frontend**: http://localhost:5173
- **Database**: localhost:5432/swp_db

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📞 **Liên hệ & Support**

- 💬 **Email**: support@medcare.vn
- 📞 **Hotline**: (028) 3999 8888
- 🕒 **Thời gian hỗ trợ**: 24/7 - Cả tuần
- 📍 **Địa chỉ**: 123 Đường ABC, Quận 1, TP.HCM

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⭐ **Features Roadmap**

### **✅ Completed**
- User authentication với JWT
- Role-based access control
- Modern dashboard UI
- CRUD operations cho users
- API documentation
- Database integration

### **🔄 In Progress**
- Appointment management system
- Medical records management
- Real-time notifications
- File upload/download
- Advanced reporting

### **📋 Planned**
- Mobile app (React Native)
- Video consultation feature
- Payment integration
- Multi-language support
- Advanced analytics dashboard

---

**🎉 Happy Coding! Chúc bạn phát triển dự án thành công!**
