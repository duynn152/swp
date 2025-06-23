-- Script để tạo admin user và quản lý database roles
-- Chạy script này với user postgres hoặc user có quyền CREATEDB, CREATEROLE

-- 1. Tạo database nếu chưa có
CREATE DATABASE swp_db;

-- 2. Kết nối vào database swp_db
\c swp_db;

-- 3. Tạo các database roles cho từng loại user
-- Role này sẽ được sử dụng để phân quyền truy cập

-- Role cho Admin (toàn quyền)
DROP ROLE IF EXISTS admin_role;
CREATE ROLE admin_role;
GRANT ALL PRIVILEGES ON DATABASE swp_db TO admin_role;

-- Role cho Doctor 
DROP ROLE IF EXISTS doctor_role;
CREATE ROLE doctor_role;
GRANT CONNECT ON DATABASE swp_db TO doctor_role;

-- Role cho Staff
DROP ROLE IF EXISTS staff_role;
CREATE ROLE staff_role;
GRANT CONNECT ON DATABASE swp_db TO staff_role;

-- Role cho Patient (chỉ đọc dữ liệu của mình)
DROP ROLE IF EXISTS patient_role;
CREATE ROLE patient_role;
GRANT CONNECT ON DATABASE swp_db TO patient_role;

-- Role cho Nurse
DROP ROLE IF EXISTS nurse_role;
CREATE ROLE nurse_role;
GRANT CONNECT ON DATABASE swp_db TO nurse_role;

-- 4. Tạo user admin với toàn quyền
DROP USER IF EXISTS swp_admin;
CREATE USER swp_admin WITH
    LOGIN
    SUPERUSER
    CREATEDB
    CREATEROLE
    PASSWORD 'admin_password_2024';

-- Gán role admin cho user
GRANT admin_role TO swp_admin;

-- 5. Tạo user cho ứng dụng (được Spring Boot sử dụng)
DROP USER IF EXISTS swp_app_user;
CREATE USER swp_app_user WITH
    LOGIN
    PASSWORD 'app_password_2024';

-- Cấp quyền cần thiết cho app user
GRANT CONNECT ON DATABASE swp_db TO swp_app_user;
GRANT USAGE ON SCHEMA public TO swp_app_user;
GRANT CREATE ON SCHEMA public TO swp_app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO swp_app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO swp_app_user;

-- Đảm bảo app user có quyền trên các bảng mới được tạo
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO swp_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO swp_app_user;

-- 6. Hiển thị thông tin các user và role đã tạo
\du+

-- 7. Kiểm tra kết nối
SELECT current_user, current_database(), version();

-- Hướng dẫn sử dụng:
-- 1. Chạy script này với quyền postgres: psql -U postgres -f create_admin_user.sql
-- 2. Hoặc copy từng phần và chạy trong psql client
-- 3. Cập nhật application.properties để sử dụng user mới nếu cần

-- Lưu ý bảo mật:
-- - Thay đổi password mặc định trước khi deploy production
-- - Sử dụng biến môi trường để lưu password
-- - Giới hạn quyền truy cập database theo principle of least privilege 