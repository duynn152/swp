# SWP Backend - Spring Boot with PostgreSQL

## Requirements

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+

## Database Setup

1. Install PostgreSQL if you haven't already
2. Create a database for the project:
   ```sql
   CREATE DATABASE swp_db;
   ```
3. Update the database credentials in `src/main/resources/application.properties`:
   - `spring.datasource.username` (default: postgres)
   - `spring.datasource.password` (change from `your_password_here`)

## Running the Application

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on http://localhost:8080

## API Endpoints

### User Endpoints

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/username/{username}` - Get user by username
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/swp/backend/
│   │   │   ├── config/         # Configuration classes
│   │   │   ├── controller/     # REST controllers
│   │   │   ├── entity/         # JPA entities
│   │   │   ├── repository/     # Spring Data repositories
│   │   │   ├── service/        # Business logic
│   │   │   └── BackendApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Technologies Used

- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL Driver
- Lombok
- Spring Boot DevTools 