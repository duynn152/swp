# SWP Backend API Documentation

## 📋 **Overview**

SWP Backend API là một RESTful API service được xây dựng với Spring Boot, cung cấp các chức năng quản lý user cho hệ thống SWP. API tuân theo REST conventions và trả về dữ liệu dạng JSON.

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   PostgreSQL    │
│   (React)       │◄──►│  (Spring Boot)  │◄──►│   Database      │
│   Port: 5173    │    │   Port: 8080    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔗 **Base URL**

- **Development**: `http://localhost:8080/api`
- **API Documentation**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI Spec**: `http://localhost:8080/api-docs`

## 🔑 **Authentication**

Hiện tại API chưa implement authentication. Tất cả endpoints đều public access.

> **Note**: Authentication sẽ được thêm vào trong phiên bản tương lai (JWT tokens).

## 📊 **Data Models**

### **User Entity**

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john.doe@example.com",
  "fullName": "John Doe",
  "password": "securePassword123",
  "createdAt": "2025-06-23T16:24:20.536500",
  "updatedAt": "2025-06-23T16:24:20.536522"
}
```

#### **Field Descriptions**

| Field | Type | Required | Unique | Description |
|-------|------|----------|---------|-------------|
| `id` | Long | ❌ (Auto-generated) | ✅ | Primary key, auto-increment |
| `username` | String | ✅ | ✅ | Unique username for login |
| `email` | String | ✅ | ✅ | User's email address |
| `fullName` | String | ❌ | ❌ | User's display name |
| `password` | String | ✅ | ❌ | User's password (hashed) |
| `createdAt` | DateTime | ❌ (Auto-generated) | ❌ | Creation timestamp |
| `updatedAt` | DateTime | ❌ (Auto-generated) | ❌ | Last update timestamp |

## 🚀 **API Endpoints**

### **1. Create User**

Creates a new user with unique username and email.

```http
POST /api/users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "fullName": "John Doe",
  "password": "securePassword123"
}
```

**Responses:**
- `201 Created`: User created successfully
- `400 Bad Request`: Username or email already exists

---

### **2. Get All Users**

Retrieves a list of all users in the system.

```http
GET /api/users
```

**Response:**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "password": "securePassword123",
    "createdAt": "2025-06-23T16:24:20.536500",
    "updatedAt": "2025-06-23T16:24:20.536522"
  }
]
```

---

### **3. Get User by ID**

Retrieves a specific user by their unique ID.

```http
GET /api/users/{id}
```

**Parameters:**
- `id` (path): User ID (Long)

**Responses:**
- `200 OK`: User found
- `404 Not Found`: User doesn't exist

---

### **4. Get User by Username**

Retrieves a specific user by their username.

```http
GET /api/users/username/{username}
```

**Parameters:**
- `username` (path): Username (String)

**Responses:**
- `200 OK`: User found
- `404 Not Found`: User doesn't exist

---

### **5. Update User**

Updates an existing user's information.

```http
PUT /api/users/{id}
Content-Type: application/json

{
  "username": "john_doe_updated",
  "email": "john.updated@example.com",
  "fullName": "John Doe Updated"
}
```

**Notes:**
- Password field is optional - omit to keep current password
- All other fields will be updated with provided values

**Responses:**
- `200 OK`: User updated successfully
- `404 Not Found`: User doesn't exist

---

### **6. Delete User**

Deletes a user by their ID.

```http
DELETE /api/users/{id}
```

**Parameters:**
- `id` (path): User ID (Long)

**Responses:**
- `204 No Content`: User deleted successfully
- `404 Not Found`: User doesn't exist

## 📱 **Frontend Integration**

### **React Query Setup**

```typescript
// services/userService.ts
const API_BASE_URL = 'http://localhost:8080/api'

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  return response.json()
}
```

### **Hooks Usage**

```typescript
// React component
const { data: users, isLoading } = useUsers()
const createUserMutation = useCreateUser()

const handleCreateUser = async (userData) => {
  await createUserMutation.mutateAsync(userData)
}
```

## 🧪 **Testing**

### **Using cURL**

```bash
# Create user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","fullName":"Test User","password":"pass123"}'

# Get all users
curl http://localhost:8080/api/users

# Get user by ID
curl http://localhost:8080/api/users/1
```

### **Using Postman**

1. Import collection: `SWP-API.postman_collection.json`
2. Set environment variable: `baseUrl = http://localhost:8080/api`
3. Run requests from the collection

### **Using Swagger UI**

1. Open: `http://localhost:8080/swagger-ui.html`
2. Click "Try it out" on any endpoint
3. Fill parameters and click "Execute"

## 🔧 **Error Handling**

### **Standard Error Responses**

| Status Code | Description | Example Response |
|-------------|-------------|------------------|
| `200 OK` | Success | `{"id": 1, "username": "john"}` |
| `201 Created` | Resource created | `{"id": 1, "username": "john"}` |
| `204 No Content` | Success, no response body | *(empty)* |
| `400 Bad Request` | Invalid request data | `{}` |
| `404 Not Found` | Resource not found | `{}` |
| `500 Internal Server Error` | Server error | `{}` |

### **Validation Rules**

- **Username**: Required, unique, string
- **Email**: Required, unique, valid email format
- **Password**: Required for creation, optional for updates
- **FullName**: Optional, string

## 🚀 **Getting Started**

### **Prerequisites**

- Java 17+
- Maven 3.6+
- PostgreSQL 12+

### **Quick Start**

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd swp/backend
   ```

2. **Setup database**
   ```sql
   CREATE DATABASE swp_db;
   ```

3. **Configure application.properties**
   ```properties
   spring.datasource.password=your_password_here
   ```

4. **Run application**
   ```bash
   mvn spring-boot:run
   ```

5. **Verify setup**
   ```bash
   curl http://localhost:8080/api/users
   # Should return: []
   ```

6. **Access documentation**
   - Swagger UI: `http://localhost:8080/swagger-ui.html`
   - API Docs: `http://localhost:8080/api-docs`

## 📋 **Development Notes**

### **Database Schema**

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP(6),
    updated_at TIMESTAMP(6)
);
```

### **CORS Configuration**

API đã được configure để accept requests từ frontend:
- Allowed origins: `http://localhost:5173`
- Allowed methods: `GET, POST, PUT, DELETE, OPTIONS`
- Allowed headers: `*`

### **Logging**

- Application logs: `DEBUG` level cho `com.swp.backend`
- SQL queries: Enabled với format
- Request logs: Available trong console

## 🔮 **Future Enhancements**

### **Planned Features**

- [ ] JWT Authentication & Authorization
- [ ] Password hashing (BCrypt)
- [ ] Role-based access control (RBAC)
- [ ] Input validation & sanitization
- [ ] Rate limiting
- [ ] API versioning
- [ ] Pagination for list endpoints
- [ ] Search & filtering
- [ ] Audit logging
- [ ] Health check endpoints

### **API Evolution**

- **v1.1**: Authentication implementation
- **v1.2**: Role management
- **v2.0**: Advanced user features

## 📞 **Support**

- **Documentation**: This file & Swagger UI
- **Testing**: Postman collection provided
- **Issues**: GitHub issues
- **Contact**: support@swp.com

---

> **Last Updated**: June 23, 2025  
> **API Version**: 1.0.0  
> **Spring Boot Version**: 3.2.0 

## User Management APIs

### Authentication Endpoints

#### POST `/users/auth/login`
Authenticates a user with username/email and password.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
- **200 OK**: Login successful, returns user object
- **401 Unauthorized**: Invalid credentials

#### POST `/users/auth/register`
Registers a new user account.

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "fullName": "New User",
  "phone": "0123456789",
  "dateOfBirth": "1990-01-01",
  "gender": "MALE",
  "role": "PATIENT"
}
```

**Response:**
- **201 Created**: User registered successfully
- **400 Bad Request**: Username or email already exists

### User CRUD Operations

#### POST `/users`
Creates a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "secretPassword123",
  "fullName": "John Doe",
  "phone": "0123456789",
  "dateOfBirth": "1990-01-01",
  "gender": "MALE",
  "role": "PATIENT"
}
```

**Response:**
- **201 Created**: User created successfully
- **400 Bad Request**: Username or email already exists

#### GET `/users`
Retrieves all users.

**Response:**
- **200 OK**: Returns array of user objects

#### GET `/users/active`
Retrieves all active users.

**Response:**
- **200 OK**: Returns array of active user objects

#### GET `/users/{id}`
Retrieves a user by ID.

**Parameters:**
- `id` (path): User ID

**Response:**
- **200 OK**: User found
- **404 Not Found**: User not found

#### GET `/users/username/{username}`
Retrieves a user by username.

**Parameters:**
- `username` (path): Username

**Response:**
- **200 OK**: User found
- **404 Not Found**: User not found

#### GET `/users/email/{email}`
Retrieves a user by email.

**Parameters:**
- `email` (path): Email address

**Response:**
- **200 OK**: User found
- **404 Not Found**: User not found

#### PUT `/users/{id}`
Updates an existing user.

**Parameters:**
- `id` (path): User ID

**Request Body:**
```json
{
  "username": "updated_username",
  "email": "updated@example.com",
  "fullName": "Updated Name",
  "phone": "0987654321",
  "dateOfBirth": "1991-01-01",
  "gender": "FEMALE"
}
```

**Response:**
- **200 OK**: User updated successfully
- **404 Not Found**: User not found

#### DELETE `/users/{id}`
Deletes a user by ID.

**Parameters:**
- `id` (path): User ID

**Response:**
- **204 No Content**: User deleted successfully
- **404 Not Found**: User not found

### Role Management

#### GET `/users/role/{role}`
Retrieves users by role.

**Parameters:**
- `role` (path): User role (ADMIN, STAFF, DOCTOR, PATIENT)

**Response:**
- **200 OK**: Returns array of users with specified role

#### PUT `/users/{id}/role`
Updates a user's role.

**Parameters:**
- `id` (path): User ID

**Request Body:**
```json
{
  "role": "DOCTOR"
}
```

**Response:**
- **200 OK**: Role updated successfully
- **404 Not Found**: User not found

### User Status Management

#### PUT `/users/{id}/activate`
Activates a user account.

**Parameters:**
- `id` (path): User ID

**Response:**
- **200 OK**: User activated successfully
- **404 Not Found**: User not found

#### PUT `/users/{id}/deactivate`
Deactivates a user account.

**Parameters:**
- `id` (path): User ID

**Response:**
- **200 OK**: User deactivated successfully
- **404 Not Found**: User not found

## Data Models

### User
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "secretPassword123",
  "fullName": "John Doe",
  "phone": "0123456789",
  "dateOfBirth": "1990-01-01",
  "gender": "MALE",
  "role": "PATIENT",
  "isActive": true,
  "createdAt": "2024-01-01T10:00:00",
  "updatedAt": "2024-01-01T10:00:00"
}
```

### UserRole Enum
- **ADMIN**: Administrator with full system access
- **STAFF**: Hospital staff member  
- **DOCTOR**: Medical doctor
- **PATIENT**: Patient using the system

### Gender Enum
- **MALE**: Nam
- **FEMALE**: Nữ
- **OTHER**: Khác

## Sample Users

### Admin
```
Username: admin
Password: admin123
Email: admin@medcare.vn
Role: ADMIN
```

### Staff
```
Username: staff1
Password: staff123
Email: staff1@medcare.vn
Role: STAFF
```

### Doctor
```
Username: doctor1
Password: doctor123
Email: doctor1@medcare.vn
Role: DOCTOR
```

### Patient
```
Username: patient1
Password: patient123
Email: patient1@gmail.com
Role: PATIENT
```

## Database Schema

### users table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'STAFF', 'DOCTOR', 'PATIENT')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- **200 OK**: Successful request
- **201 Created**: Resource created successfully
- **204 No Content**: Successful request with no content
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication failed
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## OpenAPI/Swagger Documentation

Access the interactive API documentation at:
```
http://localhost:8080/swagger-ui.html
```

API docs JSON:
```
http://localhost:8080/api-docs
``` 