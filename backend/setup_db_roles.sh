#!/bin/bash

# Script để setup PostgreSQL database và roles cho SWP project
# Chạy script này với quyền sudo nếu cần

echo "🚀 Bắt đầu setup PostgreSQL database và roles..."

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kiểm tra PostgreSQL service
echo -e "${YELLOW}📋 Kiểm tra PostgreSQL service...${NC}"
if ! systemctl is-active --quiet postgresql; then
    echo -e "${YELLOW}⚠️  PostgreSQL không chạy. Đang khởi động...${NC}"
    sudo systemctl start postgresql
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ PostgreSQL đã được khởi động${NC}"
    else
        echo -e "${RED}❌ Không thể khởi động PostgreSQL${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ PostgreSQL đang chạy${NC}"
fi

# Kiểm tra kết nối
echo -e "${YELLOW}🔍 Kiểm tra kết nối PostgreSQL...${NC}"
if ! psql -U postgres -c "SELECT version();" >/dev/null 2>&1; then
    echo -e "${RED}❌ Không thể kết nối PostgreSQL với user postgres${NC}"
    echo -e "${YELLOW}💡 Hãy đảm bảo:${NC}"
    echo "   1. PostgreSQL đã được cài đặt"
    echo "   2. User postgres có quyền truy cập"
    echo "   3. pg_hba.conf được cấu hình đúng"
    exit 1
fi

echo -e "${GREEN}✅ Kết nối PostgreSQL thành công${NC}"

# Chạy SQL script
echo -e "${YELLOW}📝 Đang thực thi SQL script...${NC}"
if psql -U postgres -f "$(dirname "$0")/create_admin_user.sql"; then
    echo -e "${GREEN}✅ SQL script đã được thực thi thành công${NC}"
else
    echo -e "${RED}❌ Lỗi khi thực thi SQL script${NC}"
    exit 1
fi

# Kiểm tra kết quả
echo -e "${YELLOW}🔍 Kiểm tra users và roles đã tạo...${NC}"
psql -U postgres -d swp_db -c "\du" | grep -E "(swp_admin|swp_app_user|admin_role|doctor_role|staff_role|patient_role|nurse_role)"

echo -e "${GREEN}🎉 Hoàn thành setup database và roles!${NC}"

# Hướng dẫn tiếp theo
echo -e "${YELLOW}📋 Bước tiếp theo:${NC}"
echo "1. Cập nhật application.properties với thông tin user mới:"
echo "   spring.datasource.username=swp_app_user"
echo "   spring.datasource.password=app_password_2024"
echo ""
echo "2. Để kết nối với admin user:"
echo "   psql -U swp_admin -d swp_db"
echo ""
echo "3. Để kết nối với app user:"
echo "   psql -U swp_app_user -d swp_db"
echo ""
echo -e "${RED}⚠️  Lưu ý bảo mật:${NC}"
echo "   - Thay đổi password trước khi deploy production"
echo "   - Sử dụng environment variables cho password"
echo "   - Giới hạn quyền truy cập theo nguyên tắc least privilege" 