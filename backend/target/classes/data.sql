-- Sample data for Users with different roles
-- Note: Passwords are BCrypt hashed (password is same as username for demo)

-- Admin user (password: admin123)
INSERT INTO users (username, email, password, full_name, phone, date_of_birth, gender, role, is_active, created_at, updated_at) 
VALUES 
('admin', 'admin@medcare.vn', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Quản trị viên', '0901234567', '1990-01-01', 'MALE', 'ADMIN', true, NOW(), NOW())
ON CONFLICT (username) DO NOTHING;

-- Staff users (password: staff123)
INSERT INTO users (username, email, password, full_name, phone, date_of_birth, gender, role, is_active, created_at, updated_at) 
VALUES 
('staff', 'staff@medcare.vn', '$2a$10$Xl0yhvzLIxobzgESDdQgOOyqJ4JgVdEMs6PLZrAb.xDh2L0KXkZcq', 'Nhân viên', '0901234567', '1991-01-01', 'MALE', 'STAFF', true, NOW(), NOW()),
('staff1', 'staff1@medcare.vn', '$2a$10$Xl0yhvzLIxobzgESDdQgOOyqJ4JgVdEMs6PLZrAb.xDh2L0KXkZcq', 'Nguyễn Văn A', '0901234568', '1992-05-15', 'MALE', 'STAFF', true, NOW(), NOW()),
('staff2', 'staff2@medcare.vn', '$2a$10$Xl0yhvzLIxobzgESDdQgOOyqJ4JgVdEMs6PLZrAb.xDh2L0KXkZcq', 'Trần Thị B', '0901234569', '1993-08-20', 'FEMALE', 'STAFF', true, NOW(), NOW())
ON CONFLICT (username) DO NOTHING;

-- Doctor users (password: doctor123)
INSERT INTO users (username, email, password, full_name, phone, date_of_birth, gender, role, is_active, created_at, updated_at) 
VALUES 
('doctor1', 'doctor1@medcare.vn', '$2a$10$E6.1Z6HiMsJb8u5ksZZ0FOxYpI.m5BN/5lD5zvOcuOddm6M8bKrgu', 'Bác sĩ Nguyễn Văn C', '0901234570', '1985-03-10', 'MALE', 'DOCTOR', true, NOW(), NOW()),
('doctor2', 'doctor2@medcare.vn', '$2a$10$E6.1Z6HiMsJb8u5ksZZ0FOxYpI.m5BN/5lD5zvOcuOddm6M8bKrgu', 'Bác sĩ Lê Thị D', '0901234571', '1987-07-25', 'FEMALE', 'DOCTOR', true, NOW(), NOW()),
('doctor3', 'doctor3@medcare.vn', '$2a$10$E6.1Z6HiMsJb8u5ksZZ0FOxYpI.m5BN/5lD5zvOcuOddm6M8bKrgu', 'Bác sĩ Phạm Văn E', '0901234572', '1988-11-30', 'MALE', 'DOCTOR', true, NOW(), NOW())
ON CONFLICT (username) DO NOTHING;

-- Patient users (password: patient123)
INSERT INTO users (username, email, password, full_name, phone, date_of_birth, gender, role, is_active, created_at, updated_at) 
VALUES 
('patient1', 'patient1@gmail.com', '$2a$10$Y8JhFLUv8Gqz3VwxSZBVaO2Zu1UOGUZtlzNhEZmFXQKT3m6M8bKrgu', 'Hoàng Văn F', '0901234573', '1995-02-14', 'MALE', 'PATIENT', true, NOW(), NOW()),
('patient2', 'patient2@gmail.com', '$2a$10$Y8JhFLUv8Gqz3VwxSZBVaO2Zu1UOGUZtlzNhEZmFXQKT3m6M8bKrgu', 'Võ Thị G', '0901234574', '1990-06-18', 'FEMALE', 'PATIENT', true, NOW(), NOW()),
('patient3', 'patient3@gmail.com', '$2a$10$Y8JhFLUv8Gqz3VwxSZBVaO2Zu1UOGUZtlzNhEZmFXQKT3m6M8bKrgu', 'Đặng Văn H', '0901234575', '1985-09-22', 'MALE', 'PATIENT', true, NOW(), NOW()),
('patient4', 'patient4@gmail.com', '$2a$10$Y8JhFLUv8Gqz3VwxSZBVaO2Zu1UOGUZtlzNhEZmFXQKT3m6M8bKrgu', 'Ngô Thị I', '0901234576', '1992-12-05', 'FEMALE', 'PATIENT', true, NOW(), NOW())
ON CONFLICT (username) DO NOTHING; 