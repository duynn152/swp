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

-- Insert admin user if not exists
INSERT IGNORE INTO users (username, email, full_name, password, role, is_active, created_at, updated_at) 
VALUES ('admin', 'admin@hospital.com', 'Administrator', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi', 'ADMIN', true, NOW(), NOW());

-- Create blog_posts table if not exists
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt VARCHAR(500),
    image VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    category_slug VARCHAR(100),
    status ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    author VARCHAR(100) NOT NULL,
    views INT NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    read_time VARCHAR(50),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- Insert sample blog posts
INSERT IGNORE INTO blog_posts (id, title, content, excerpt, image, category, category_slug, status, author, views, is_featured, read_time, created_at, updated_at) VALUES
(1, 'Chăm sóc sức khỏe phụ nữ sau sinh', 'Hướng dẫn chi tiết về cách chăm sóc sức khỏe phụ nữ trong giai đoạn sau sinh. Thời kỳ sau sinh là một giai đoạn quan trọng đòi hỏi sự chăm sóc đặc biệt. Phụ nữ cần có chế độ dinh dưỡng hợp lý, nghỉ ngơi đầy đủ và theo dõi sức khỏe thường xuyên để phục hồi hoàn toàn sau khi sinh.', 'Hướng dẫn chi tiết về cách chăm sóc sức khỏe phụ nữ trong giai đoạn sau sinh, bao gồm dinh dưỡng, nghỉ ngơi và các biện pháp phòng ngừa.', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'Sức khỏe phụ nữ', 'suc-khoe-phu-nu', 'PUBLISHED', 'BS. Nguyễn Thị Lan', 245, true, '5 phút đọc', NOW(), NOW()),
(2, 'Tầm soát ung thư định kỳ', 'Tầm quan trọng của việc tầm soát ung thư định kỳ và các phương pháp hiệu quả để phát hiện sớm bệnh lý. Tầm soát ung thư là một trong những biện pháp quan trọng nhất trong việc phòng chống ung thư. Việc phát hiện sớm giúp tăng cơ hội điều trị thành công và giảm chi phí điều trị.', 'Tầm quan trọng của việc tầm soát ung thư định kỳ và các phương pháp hiệu quả để phát hiện sớm bệnh lý.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'Phòng chống bệnh', 'phong-chong-benh', 'PUBLISHED', 'BS. Trần Văn Nam', 1500, true, '4 phút đọc', NOW(), NOW()),
(3, 'Chế độ dinh dưỡng cho người tiểu đường', 'Hướng dẫn chi tiết về chế độ ăn uống khoa học cho người mắc bệnh tiểu đường. Người bệnh tiểu đường cần có chế độ ăn uống khoa học để kiểm soát đường huyết và duy trì sức khỏe ổn định. Việc lựa chọn thực phẩm phù hợp và ăn uống đúng cách sẽ giúp cải thiện chất lượng cuộc sống.', 'Hướng dẫn chi tiết về chế độ ăn uống khoa học, giúp kiểm soát đường huyết và duy trì sức khỏe ổn định.', 'https://images.unsplash.com/photo-1542736667-069246bdbc6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'Dinh dưỡng', 'dinh-duong', 'PUBLISHED', 'BS. Trần Thị Bình', 980, false, '7 phút đọc', NOW(), NOW()); 